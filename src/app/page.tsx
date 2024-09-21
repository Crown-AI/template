import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import "./globalicons.css";


export default function Home() {
  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            width: "100%",
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              position: "relative",
              width: "100%",
              height: "30%",
              paddingTop: "9%",
              paddingLeft: "9%",
              backgroundImage:
                "linear-gradient(to right, rgba(59, 61, 61, 0.4), rgba(59, 61, 61, 0.4)),url('back.png')",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Archivo Black', sans-serif",
                fontWeight: 350,
                fontStyle: "normal",
                color: "#fff",
              }}
            >
              Welcome to Tewax
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 24,
                fontWeight: 350,
                fontStyle: "normal",
                color: "#F3F4F6FF",
              }}
            >
              Best education system offered online
            </Typography>
            <Button
              variant="contained"
              sx={{
                height: 42,
                width: "13%",
                padding: "0 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: 18,
                color: "#fff",
                background: "#636AE8FF",
                borderRadius: 3,
                ":hover": { color: "#4850E4FF" },
              }}
            >
              Get started
            </Button>
          </Stack>
          <br />
          <Stack>
            <Typography
              variant="h4"
              sx={{
                display: "flex",
                position: "relative",
                fontFamily: "'Archivo Black', sans-serif",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Featured Projects
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
