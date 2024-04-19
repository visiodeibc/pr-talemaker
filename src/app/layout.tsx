import * as React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
<link
  href="https://fonts.googleapis.com/css?family=Montserrat&display=optional"
  rel="stylesheet"
/>;

export const metadata = {
  title: "talemaker, where imagination becomes reality",
  description:
    "Interactive story maker where children fulfill and thrive in their imagination",
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
