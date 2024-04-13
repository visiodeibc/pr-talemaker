"use client";
import React from "react";
import { Button, Container } from "@mui/material";

const Page = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          console.log("Hello world");
        }}
      >
        Click Me
      </Button>
    </Container>
  );
};

export default Page;
