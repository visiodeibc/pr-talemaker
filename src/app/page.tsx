"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  // Define your tiles here
  const tiles = [
    { title: "The Adventures of React Man", color: "#ffb3b3" },
    { title: "The Mysterious Case of Redux Island", color: "#b3ffb3" },
    { title: "The Journey to TypeScript Land", color: "#b3b3ff" },
    { title: "The Magical World of CSS Wizards", color: "#ffffb3" },
    { title: "The Enigma of API Integration", color: "#b3ffff" },
    { title: "The Quest for Bug-Free Code", color: "#ffb3ff" },
    { title: "+", color: "#qab3df" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {tiles.map((tile, index) => (
          <Grid item xs={4} key={index}>
            <Paper
              sx={{
                height: 140,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: tile.color,
                cursor: "pointer",
              }}
              onClick={() => {
                router.push("/story");
              }}
            >
              <Typography variant="h6">{tile.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
