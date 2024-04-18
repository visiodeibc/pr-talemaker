import * as React from "react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
<link
  href="https://fonts.googleapis.com/css?family=Montserrat&display=optional"
  rel="stylesheet"
/>;

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
