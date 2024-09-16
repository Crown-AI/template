"use client";

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from "../../theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

export function MuiProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
