import { ListItemButton, ListItemIcon, Stack, Typography } from "@mui/material";
import React from "react";

export default function MenuButton({
  text,
  color,
  icon,
  link,
}: {
  text: string;
  color: string;
  icon: string;
  link: string;
}) {
  return (
    <ListItemButton
      sx={{
        display: "flex",
        position: "relative",
        transition: "0.3s ease-in-out",
        width: "95%",
        borderRadius: 2,
        ":hover": { transform: "translateY(-2px) scale(1.1)", border: `1px solid ${color}` },
      }}
      href={link}
    >
      <Stack sx={{ display: "flex", position: "relative", width: "30%" }}>
        <ListItemIcon>
          <span className="material-symbols-outlined">{icon}</span>
        </ListItemIcon>
      </Stack>
      <Stack sx={{ display: "flex", position: "relative", width: "70%" }}>
        <Typography variant="h6">{text}</Typography>
      </Stack>
    </ListItemButton>
  );
}
