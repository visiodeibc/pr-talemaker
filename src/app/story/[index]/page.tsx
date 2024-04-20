/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

import Box from "@mui/material/Box";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AppBar,
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";

import {
  generateImage,
  generateStory,
  textToSpeech,
  transcribeSpeech,
} from "@/service/serviceGoogle";
import { audioBlobToBase64 } from "@/util";
import { stories, defaultPlot } from "@/data/data";
import { Story } from "@/data/type";
import theme from "@/components/ThemeRegistry/theme";
import { Router } from "next/router";

export default function StoryPage({ params }: { params: any }) {
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );

  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const [plot, setPlot] = useState<any>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [currentLine, setCurrentLine] = useState<string>("");
  const [currentImg, setCurrentImg] = useState<string>("");
  const [uerResponse, setUserResponse] = useState<string>("...");

  const [imgLoading, setImgLoading] = useState<boolean>(false);
  const [storyLoading, setStoryLoading] = useState<boolean>(false);

  const makeNextStory = async (
    responseText = "assume an approporiate response and please proceed"
  ) => {
    const currentPlot = plot;
    currentPlot.push({
      role: "user",
      parts: [
        {
          text: responseText,
        },
      ],
    });
    try {
      const response = await generateStory(currentPlot);
      const updatedstory = response.candidates[0].content.parts[0].text;
      setCurrentLine(updatedstory);
      currentPlot.push({
        role: "model",
        parts: [
          {
            text: updatedstory,
          },
        ],
      });
      playAudio(updatedstory);
      setPlot(currentPlot);
      updateImage(currentPlot);
    } finally {
      setStoryLoading(false);
    }
  };

  const updateImage = async (plot: any[]) => {
    let aggregatedText = "";
    plot.forEach((item: { role: string; parts: any[] }) => {
      if (item.parts && item.parts.length > 0) {
        item.parts.forEach((part: { text: string }) => {
          if (part.text) {
            aggregatedText += part.text + "\n\n";
          }
        });
      }
    });

    try {
      const response = await generateImage(aggregatedText);
      setCurrentImg(response.data[0].url);
    } catch (e) {
      console.log(e);
    }
  };

  const transcribe = async (audioFile: Blob | null) => {
    if (audioFile) {
      const base64Audio = await audioBlobToBase64(audioFile);
      try {
        const result = await transcribeSpeech(base64Audio);
        if (result) {
          setUserResponse(result);
          makeNextStory(result);
          return result;
        } else {
          console.log("No transcription results in the API response:");
          makeNextStory();
          setUserResponse("No response...");
        }
      } catch (e) {
        console.log(e);
      } finally {
      }
    }
  };

  const handleRecord = async () => {
    if (!recording) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia not supported on your browser!");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const newMediaRecorder = new MediaRecorder(stream);
      let chunks: BlobPart[] = [];

      newMediaRecorder.ondataavailable = function (e: BlobEvent) {
        chunks.push(e.data);
      };

      newMediaRecorder.onstop = function () {
        const blob = new Blob(chunks, {
          type: "audio/ogg; codecs=opus",
        });
        chunks = [];
        setStoryLoading(true);
        setImgLoading(true);
        transcribe(blob);
      };
      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
    } else {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    }
    setRecording(!recording);
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
  };

  const playAudio = async (newLine = currentLine) => {
    stopAudio();
    const res = await textToSpeech(newLine || currentLine);
    const audio = new Audio(`data:audio/mp3;base64,${res.audioContent}`);
    setCurrentAudio(audio);
    audio.addEventListener("ended", function () {
      stopAudio();
    });
    audio.play();
  };

  useEffect(() => {
    const initialStory = stories[params.index];
    setStory(initialStory);
    setCurrentImg(initialStory.storyImage);
    setCurrentLine(initialStory.firstLine);
    const currentPlot = defaultPlot;
    currentPlot[1].parts[0].text =
      `currently bao is travelling in ${initialStory.title};` +
      initialStory.firstLine;
    setPlot(currentPlot);
  }, []);

  return (
    <Box>
      <AppBar
        position="relative"
        sx={{
          display: "flex",
          backgroundColor: "background.default",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            px: 2,
            py: 1,
          }}
        >
          <IconButton
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBackIcon fontSize="large" color="info" />
          </IconButton>
          <Typography
            fontStyle={"Montserrat"}
            fontWeight={600}
            fontSize={23}
            lineHeight={2}
          >
            {story?.subtitle}
          </Typography>
          <Box></Box>
        </Box>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          my: 5,
          mx: matchDownMd ? 10 : 15,
        }}
      >
        <Box
          sx={{
            bgcolor: "background.default",
            borderRadius: 12,
            boxShadow: 2,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Box style={{ position: "relative" }}>
              <Button
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1000,
                  m: 2,
                }}
                onClick={() => playAudio()}
              >
                <Avatar
                  src={
                    currentAudio && !currentAudio?.paused
                      ? "/buttons/sound_btn_off.png"
                      : "/buttons/sound_btn_on.png"
                  }
                  sx={{ height: "66px", width: "66px" }}
                />
              </Button>
              <Box
                sx={{
                  backgroundColor: "#FFBAC1",
                  borderTopLeftRadius: 35,
                  borderTopRightRadius: 35,
                  height: "40vh",
                }}
              >
                <img
                  src={currentImg}
                  alt={"current image"}
                  loading="lazy"
                  onLoad={() => {
                    setImgLoading(false);
                  }}
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    maxWidth: "100%",
                  }}
                />
                {imgLoading && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "40vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderTopLeftRadius: 35,
                      borderTopRightRadius: 35,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      zIndex: 9999,
                    }}
                  >
                    <Box
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 12,
                        height: "95px",
                        width: "95px",
                        backgroundColor: "#A1A1A1",
                      }}
                    >
                      <CircularProgress
                        sx={{
                          color: "#FFFFFF",
                          height: 0,
                          mt: "27px",
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
              <Box
                sx={{
                  flexDirection: "column",
                  py: 3,
                  px: matchDownMd ? 10 : 15,
                }}
              >
                <Typography
                  fontWeight={600}
                  fontSize={26}
                  sx={{ overflowWrap: "break-word", textAlign: "left" }}
                >
                  {currentLine}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      pt: 0,
                      mt: 1,
                      borderRadius: 12,
                      backgroundColor: "#55BA93",
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      fontSize={21}
                      lineHeight={0.5}
                      sx={{ overflowWrap: "break-word", pt: 2, color: "white" }}
                    >
                      {`You said`}
                    </Typography>
                  </Box>
                  <Typography
                    fontWeight={600}
                    fontSize={21}
                    lineHeight={0.5}
                    sx={{
                      overflowWrap: "break-word",
                      pt: 2,
                      pl: 1,
                      mt: 1,
                      color: "#55BA93",
                    }}
                  >
                    {`${uerResponse}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button
          color="secondary"
          sx={{ my: 2 }}
          onClick={handleRecord}
          disabled={storyLoading || imgLoading}
        >
          <Avatar
            src={
              storyLoading || imgLoading
                ? "/buttons/recording_btn_disabled.png"
                : recording
                  ? "/buttons/recording_btn_ing.png"
                  : "/buttons/recording_btn_start.png"
            }
            sx={{ height: "80px", width: "80px" }}
          />
        </Button>
      </Box>
    </Box>
  );
}
