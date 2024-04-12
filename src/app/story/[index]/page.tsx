"use client";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Button, CircularProgress, TextField } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import WaveSurfer from "wavesurfer.js";
import { textToSpeech, transcribeSpeech } from "@/service/serviceGoogle";
import { audioBlobToBase64 } from "@/util";

export default function HomePage() {
  const waveformRef = useRef(null);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  const [audioFile, setAudioFile] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>(
    "Record Something...."
  );
  const [transcribing, setTranscribing] = useState<boolean>(false);

  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

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

  const play = () => {
    !!waveSurfer && waveSurfer.play();
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
    if (waveSurfer) {
      waveSurfer.destroy();
    }
    if (audioFile) {
      const wave = WaveSurfer.create({
        container: waveformRef.current || "",
        waveColor: "violet",
        progressColor: "purple",
      });
      const audioUrl = URL.createObjectURL(audioFile);
      if (wave) {
        wave.load(audioUrl);
        wave.on("ready", function () {
          URL.revokeObjectURL(audioUrl);
        });
      }
      setWaveSurfer(wave);
    }

    return () => {
      if (waveSurfer) {
        waveSurfer.destroy();
      }
    };
  }, [audioFile]);

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
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ fontSize: "h6.fontSize", fontWeight: "bold" }}>
            Recording
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "20px",
            }}
          >
            {audioFile && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "20px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  ref={waveformRef}
                  style={{
                    width: "200px",
                    marginRight: "20px",
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "14px",
                    height: "40px",
                  }}
                  color={"secondary"}
                  onClick={play}
                  disabled={!audioFile}
                >
                  <PlayArrowIcon />
                </Button>
              </Box>
            )}
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
        <Box sx={{ fontSize: "h6.fontSize", fontWeight: "bold" }}>
          Transcription
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
