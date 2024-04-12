import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AudiotrackIcon from "@mui/icons-material/Audiotrack"; // import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from "@mui/icons-material/Settings";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import Image from "next/image";

export const metadata = {
  title: "Next.js App Router + Material UI v5",
  description: "Next.js App Router + Material UI v5",
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: "Once upon a time...", href: "/", icon: AudiotrackIcon },
  // { text: 'Starred', href: '/starred', icon: StarIcon },
  // { text: 'Tasks', href: '/tasks', icon: ChecklistIcon },
];

const PLACEHOLDER_LINKS = [
  { text: "Settings", icon: SettingsIcon },
  // { text: 'Support', icon: SupportIcon },
  // { text: 'Logout', icon: LogoutIcon },
];

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
                <Typography variant="h3" color="text.primary">
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
