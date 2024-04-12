import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { books } from "@/data/data";
import { ImageList, ImageListItem } from "@mui/material";

export default function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ImageList cols={3} gap={12} sx={{ borderRadius: 8 }}>
        {books.map((item) => (
          <ImageListItem key={item.image} style={{ borderRadius: 8 }}>
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
  );
}
