import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Image from "next/image";

export const metadata = {
  title: "Talebot, where imagination becomes reality",
  description:
    "Interactive story maker where kids can create their own legends and tales by TB Neighbors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#FAF5F9",
        }}
      >
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
