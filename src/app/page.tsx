"use client";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Button, CircularProgress, TextField } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import axios from "axios";
import WaveSurfer from "wavesurfer.js";

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

  const audioBlobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result || new ArrayBuffer(0);
        const base64Audio = btoa(
          new Uint8Array(arrayBuffer as ArrayBufferLike).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        resolve(base64Audio);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    });
  };

  const transcribe = async () => {
    if (audioFile) {
      setTranscribing(true);
      const base64Audio = await audioBlobToBase64(audioFile);
      const response = await axios.post(
        `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.GCP_KEY}`,
        {
          config: {
            encoding: "WEBM_OPUS",
            languageCode: "en-US",
            enableWordTimeOffsets: false,
          },
          audio: {
            content: base64Audio,
          },
        }
      );

      if (response.data.results && response.data.results.length > 0) {
        setTranscription(response.data.results[0].alternatives[0].transcript);
      } else {
        console.log(
          "No transcription results in the API response:",
          response.data
        );
        setTranscription("No transcription available");
      }
      setTranscribing(false);
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
          {audioFile && (
            <Button
              variant="contained"
              sx={{
                borderRadius: "14px",
                height: "40px",
                marginLeft: "10px",
              }}
              color={"primary"}
              disabled={transcribing}
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
          )}
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
