/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Box from "@mui/material/Box";
import { AppBar, ImageList, ImageListItem, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";

import { stories } from "@/data/data";

export default function HomePage() {
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 2000,
          display: "flex",
          backgroundColor: "background.paper",
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          <Image
            src={"/talemaker_logo.png"}
            height={42}
            width={206}
            alt="logo"
          />
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 10,
          p: 3,
        }}
      >
        <Typography
          fontStyle={"Montserrat"}
          fontWeight={700}
          fontSize={35}
          sx={{ textAlign: "center" }}
        >
          BAO the Explorer
        </Typography>
        <ImageList cols={3} gap={12} sx={{ borderRadius: 8 }}>
          {stories.map((item) => (
            <ImageListItem
              key={item.image}
              style={{ borderRadius: 8 }}
              onClick={() => {
                router.push(`/story/${item.index}`);
              }}
            >
              <img
                className="image-item"
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{ borderRadius: 8, height: "40%" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                }}
              >
                <Typography
                  variant="h2"
                  component="div"
                  color="white"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {item.title}
                </Typography>
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
