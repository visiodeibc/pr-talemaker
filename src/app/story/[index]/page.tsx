"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";

import { textToSpeech, transcribeSpeech } from "@/service/serviceGoogle";
import { audioBlobToBase64 } from "@/util";
import { books } from "@/data/data";
import { Book } from "@/data/type";

export default function StoryPage({ params }: { params: any }) {
  const [audioFile, setAudioFile] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>(
    "Record Something...."
  );
  const [transcribing, setTranscribing] = useState<boolean>(false);

  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const [book, setBook] = useState<Book | null>(null);
  const [currentImg, setCurrentImg] = useState<string>("");
  const router = useRouter();

  const transcribe = async () => {
    if (audioFile) {
      setTranscribing(true);
      const base64Audio = await audioBlobToBase64(audioFile);
      try {
        const result = await transcribeSpeech(base64Audio);
        if (result) {
          setTranscription(result);
        } else {
          console.log("No transcription results in the API response:");
          setTranscription("No transcription available");
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
    const res = await textToSpeech(transcription);
    const audio = new Audio(`data:audio/mp3;base64,${res.audioContent}`);
    audio.play();
  };

  useEffect(() => {
    console.log(books[params.index]);
    setBook(books[params.index]);
    setCurrentImg(books[params.index].image);
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
            // display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {book?.title}
          </Typography>
          <img
            className="image-item"
            src={currentImg || book?.image}
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
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ overflowWrap: "break-word" }}
          >
            Transcription
          </Typography>
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
            onClick={playAudio}
          >
            {"Play Transcribed"}
          </Button>
        </Box>
        <TextField
          sx={{ marginTop: "20px" }}
          id="outlined-multiline-static"
          label="transcribed text"
          multiline
          rows={4}
          value={transcription}
          variant="filled"
          aria-readonly
        />
      </Box>
    </>
  );
}
