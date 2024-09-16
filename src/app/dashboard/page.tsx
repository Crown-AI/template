import { MenuBar } from "@/components/menubar/menubar";
import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default async function Dashboard() {
  const session = await getServerSession();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          position: "absolute",
          flexDirection: "row",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
        }}
      >
        <Stack sx={{ display: "flex", position: "relative", width: "15%" }}>
          <MenuBar name="Tewax" />
        </Stack>
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            height: "100%",
            width: "60%",
            backgroundColor: "rgba(232, 232, 232, 0.3)",
            flexDirection: "column",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              height: "10%",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <Stack sx={{ display: "flex", position: "relative", width: "80%" }}>
              <Typography variant="h6">Dashboard</Typography>
            </Stack>
            <Stack sx={{ display: "flex", position: "relative", width: "20%" }}>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  color: "grey.600",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 300,
                  fontOpticalSizing: "auto",
                  fontStyle: "normal",
                }}
              >
                {new Date().getDate()} {months[new Date().getMonth()]}, {new Date().getFullYear()}
              </Typography>
            </Stack>
          </Stack>
          <br />
          <Stack sx={{ display: "flex", position: "relative", height: "90%" }}>
            <Stack
              sx={{
                display: "flex",
                position: "relative",
                backgroundColor: "#f7d7f3",
                flexDirection: "row",
                width: "100%",
                height: "40%",
                borderRadius: 10,
              }}
            >
              <Stack
                sx={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "60%",
                  height: "70%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" sx={{ color: "red" }}>
                  Welcome back {session.user.name || session.user.email?.substring(0, 4)}
                </Typography>
                
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
