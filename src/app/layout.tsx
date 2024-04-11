import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AudiotrackIcon from "@mui/icons-material/Audiotrack"; // import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from "@mui/icons-material/Settings";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

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
      <body style={{ backgroundColor: "#C6DCBA" }}>
        <ThemeRegistry>
          <AppBar position="fixed" sx={{ zIndex: 2000 }}>
            <Toolbar sx={{ backgroundColor: "background.paper" }}>
              <DashboardIcon
                sx={{
                  color: "#444",
                  mr: 2,
                  transform: "translateY(-2px)",
                }}
              />
              <Typography variant="h6" color="text.primary">
                TB Neighbors
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              mt: ["48px", "56px", "64px"],
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
