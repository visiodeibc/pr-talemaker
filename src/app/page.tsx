/* eslint-disable @next/next/no-img-element */

"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Box from "@mui/material/Box";
import { AppBar, ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";

import { stories } from "@/data/data";
import theme from "@/components/ThemeRegistry/theme";

export default function HomePage() {
  const router = useRouter();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        sx={{
          display: "flex",
          backgroundColor: "background.default",
          px: 2,
          py: 1,
        }}
        elevation={0}
      >
        <Image src={"/talemaker_logo.png"} height={42} width={206} alt="logo" />
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundImage: "background.paper",
          minHeight: "60vh",
          alignItems: "center",
          justifyContent: "center",
          pt: 8,
          pb: 3,
        }}
      >
        <Box
          sx={{
            width: "65vw",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            fontStyle={"Montserrat"}
            fontWeight={600}
            fontSize={matchDownMd ? 40 : 80}
            lineHeight={1}
          >
            Where your imagination becomes a story
          </Typography>
          <Typography
            fontStyle={"Montserrat"}
            fontWeight={600}
            fontSize={25}
            color={"#797979"}
            marginTop={4}
          >
            Attention explorers! Let’s go on an Asia quest together. <br />
            Discover and create your own adventure story with Bao. Where should
            we go first?
          </Typography>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "background.default",
        }}
      >
        <Typography
          fontStyle={"Montserrat"}
          fontWeight={700}
          fontSize={35}
          sx={{ textAlign: "center", pt: 4, pb: 2 }}
        >
          BAO the Explorer
        </Typography>
        <ImageList
          cols={matchDownMd ? 1 : 3}
          gap={15}
          sx={{ mx: matchDownMd ? 10 : 25, pb: 10 }}
        >
          {stories.map((item) => (
            <ImageListItem
              key={item.coverImage}
              onClick={() => {
                router.push(`/story/${item.index}`);
              }}
            >
              <img src={item.coverImage} alt={item.title} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Box
        sx={{
          display: "flex", // Add this line
          my: 5,
          mt: 7,
          px: 3,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Image src={"/talemaker_logo.png"} height={42} width={206} alt="logo" />
        <Typography>{"© talemaker. 2024. "}</Typography>
      </Box>
    </Box>
  );
}
