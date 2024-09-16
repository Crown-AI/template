import SessionWrapper from "@/components/session-provider/session-provider";
import { type Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    template: "%s - My App",
    default: "My App",
  },
  description: "My app description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
