"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";

import {
  generateStory,
  textToSpeech,
  transcribeSpeech,
} from "@/service/serviceGoogle";
import { audioBlobToBase64 } from "@/util";
import { stories, prePrompts, defaultPlot } from "@/data/data";
import { Story } from "@/data/type";

export default function StoryPage({ params }: { params: any }) {
  const [audioFile, setAudioFile] = useState<Blob | null>(null);

  const [transcribing, setTranscribing] = useState<boolean>(false);

  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const [plot, setPlot] = useState<any>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [currentLine, setCurrentLine] = useState<string>("");
  const [currentImg, setCurrentImg] = useState<string>("");
  const [uerResponse, setUserResponse] = useState<string>("...");

  const transcribe = async () => {
    if (audioFile) {
      setTranscribing(true);
      const base64Audio = await audioBlobToBase64(audioFile);
      try {
        const result = await transcribeSpeech(base64Audio);
        if (result) {
          setUserResponse(result);
        } else {
          console.log("No transcription results in the API response:");
          setUserResponse("No response...");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTranscribing(false);
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
        setAudioFile(blob);
        chunks = [];
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

  const playAudio = async () => {
    const res = await textToSpeech(currentLine);
    const audio = new Audio(`data:audio/mp3;base64,${res.audioContent}`);
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
    <>
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
          <img
            className="image-item"
            src={currentImg || story?.image}
            alt={"current image"}
            loading="lazy"
            style={{ borderRadius: 8, height: "35vh" }}
          />
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
              mt: 2,
            }}
            color={"primary"}
            onClick={playAudio}
          >
            {"|> Play"}
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
            // display: "flex",
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
            <Button
              variant="contained"
              sx={{
                borderRadius: "14px",
                height: "40px",
                marginLeft: "10px",
              }}
              color={"primary"}
              disabled={transcribing || !audioFile}
              onClick={transcribe}
            >
              {transcribing && (
                <CircularProgress
                  color={"inherit"}
                  size={20}
                  sx={{ marginRight: "5px" }}
                />
              )}

              {"Transcribe"}
            </Button>

            <Button
              variant="contained"
              sx={{
                borderRadius: "14px",
                height: "40px",
                marginLeft: "10px",
              }}
              color={"primary"}
              onClick={() => {
                generateStory(plot);
              }}
            >
              {"Make Story"}
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
    </>
  );
}
