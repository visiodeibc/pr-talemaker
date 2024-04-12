"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { books } from "@/data/data";

export default function HomePage() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {books.map((tile, index) => (
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
