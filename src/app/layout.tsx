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
          backgroundColor: "#C6DCBA",
        }}
      >
        <ThemeRegistry>
          <AppBar
            position="fixed"
            sx={{
              zIndex: 2000,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "background.paper",
            }}
          >
            <Toolbar
              sx={{
                backgroundColor: "background.paper",
              }}
            >
              <Image src={"/logo.png"} height={50} width={50} alt="logo" />
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                paddingLeft={3}
              >
                <Typography
                  variant="h3"
                  color="text.primary"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  Bao the explorer
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  ft. TB Neighbors
                </Typography>
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              mt: 10,
              p: 5,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
