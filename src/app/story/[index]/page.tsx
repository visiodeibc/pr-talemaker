/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";

import {
  generateImage,
  generateStory,
  textToSpeech,
  transcribeSpeech,
} from "@/service/serviceGoogle";
import { audioBlobToBase64 } from "@/util";
import { stories, defaultPlot } from "@/data/data";
import { Story } from "@/data/type";

export default function StoryPage({ params }: { params: any }) {
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
    setStoryLoading(true);
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
    setImgLoading(true);
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
    } finally {
      setImgLoading(false);
    }
  };

  const transcribe = async (audioFile: Blob | null) => {
    if (audioFile) {
      const base64Audio = await audioBlobToBase64(audioFile);
      try {
        const result = await transcribeSpeech(base64Audio);
        if (result) {
          setUserResponse(result);
          if (result) {
            makeNextStory(result);
          }
          return result;
        } else {
          console.log("No transcription results in the API response:");
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
    }
  };

  const playAudio = async (newLine = currentLine) => {
    stopAudio();
    const res = await textToSpeech(newLine || currentLine);
    const audio = new Audio(`data:audio/mp3;base64,${res.audioContent}`);
    setCurrentAudio(audio);
    audio.play();
  };

  useEffect(() => {
    const initialStory = stories[params.index];
    setStory(initialStory);
    setCurrentImg(initialStory.image);
    setCurrentLine(initialStory.firstLine);
    const currentPlot = defaultPlot;
    currentPlot[1].parts[0].text =
      `currently bao is travelling in ${initialStory.title};` +
      initialStory.firstLine;
    setPlot(currentPlot);
  }, []);

  return (
    <div>
      <Box
        sx={{
          padding: "20px",
          bgcolor: "background.paper",
          borderRadius: "12px",
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {story?.title}
          </Typography>
          <Box style={{ position: "relative" }}>
            <img
              className="image-item"
              src={currentImg}
              alt={"current image"}
              loading="lazy"
              style={{ borderRadius: 8, height: "35vh" }}
            />
            {imgLoading && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "35vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                }}
              >
                <CircularProgress color="secondary" />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "12px",
          bgcolor: "background.paper",
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ overflowWrap: "break-word" }}
          >
            {currentLine}
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: "14px",
              height: "40px",
              m: 1,
            }}
            color={"primary"}
            onClick={() => {
              playAudio();
            }}
          >
            <PlayCircleIcon />
            {"Play"}
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: "14px",
              height: "40px",
              m: 1,
            }}
            color={"primary"}
            onClick={stopAudio}
          >
            <StopCircleIcon />
            {"Stop"}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "12px",
          bgcolor: "background.paper",
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Box>
            <Button
              variant="contained"
              sx={{ borderRadius: "14px", height: "40px" }}
              color={recording ? "error" : "primary"}
              onClick={handleRecord}
              disabled={storyLoading || imgLoading}
            >
              {recording && (
                <CircularProgress
                  color={"inherit"}
                  size={20}
                  sx={{ marginRight: "5px" }}
                />
              )}
              {recording ? "Stop" : "Record"}
            </Button>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ overflowWrap: "break-word", mt: 2 }}
            >
              {`You said: ${uerResponse}`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
