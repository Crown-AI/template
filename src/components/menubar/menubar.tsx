import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import MenuButton from "./menu-bar-button/menu-bar-button";
import Image from "next/image";

export function MenuBar({ name }: { name: string }) {
  return (
    <List>
      <ListItem sx={{ display: "flex", position: "relative", flexDirection: "row", gap: 3 }}>
        <ListItemIcon><Image src={"/ai-icon.png"} alt="Icon" height={50} width={50}></Image></ListItemIcon>
        <ListItemText>{name}</ListItemText>
      </ListItem>
      <br />
      <MenuButton icon="dashboard" text="Dashboard" color="blue" link="/dashboard" />
      <MenuButton icon="flag" text="Goals" color="red" link="/goals" />
      <MenuButton icon="school" text="Courses" color="green" link="/courses" />
    </List>
  );
}
