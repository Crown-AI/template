"use client";
import { MenuBar } from "@/components/menubar/menubar";
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Stack, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type Goals = {
  id: string;
  coursesPlanned: number;
  coursesCompleted: number;
  status: string;
  createdAt: string;
  progress: number;
};
export default function Goals() {
  const [coursesPlanned, setCoursesPlanned] = useState(0);
  const [message, setMessage] = useState(false);
  const session = useSession();
  const [status, setStatus] = useState(false);
  const [goals, setGoals] = useState<Goals[]>([]);
  const fetchGoals = async () => {
    const response = await fetch("/api/goals");
    const data: Goals[] = await response.json();
    console.log(response.status);
    if (response.status === 500) {
      setStatus(false);
    } else {
      setStatus(true);
      setGoals(data);
    }
  };
  useEffect(() => {
    fetchGoals();
  }, []);
  const deleteGoal = async () => {
    const request = await fetch("/api/goals/cancel", {
      method: "DELETE",
    });
    if (request.ok) {
      alert("Goal deleted successfully");
      window.location.reload();
    }
  };
  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          flexDirection: "row",
          width: "100%",
          height: "100vh",
        }}
      >
        <Stack sx={{ display: "flex", position: "relative", width: "15%" }}>
          <MenuBar name="AICulture" />
        </Stack>
        <Stack sx={{ display: "flex", position: "relative", width: "75%" }}>
          {status ? (
            <Stack>
              {goals.map((goal) => (
                <div key={goal.id}>
                  <Typography variant="h5">Your goal</Typography>
                  <Card sx={{maxWidth: 345}}>
                    <CardHeader avatar={
                      <Avatar sx={{bgcolor: blue[600]}}>{session.data?.user.name?.toUpperCase().substring(0, 1) || session.data?.user.email?.toUpperCase().substring(0, 1)}</Avatar>
                    } title="Weekly goal" subheader={new Date(goal.createdAt).toLocaleString()} />
                      <CardMedia sx={{height: 190}} image="tewax-hub.png" title="Courses" />
                      <CardContent>
                        <Typography variant="body2" sx={{color: "text.secondary"}}>Goal: Finish {goal.coursesPlanned} courses</Typography>
                        <Typography variant="body2" sx={{color: "text.secondary"}}>Progress: {goal.progress}%</Typography>
                        <CardActions>
                          <Button size="small" onClick={deleteGoal}>Delete goal</Button>
                          <Button size="small" href="/courses">View courses</Button>
                        </CardActions>
                      </CardContent>
                  </Card>
                </div>
              ))}
            </Stack>
          ) : (
            <Stack>
              <Typography variant="h6">Set your weekly goal</Typography>
              <br />
              <form
                action={"#"}
                onSubmit={async (e) => {
                  e.preventDefault();
                  const request = await fetch("/api/goals", {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                      userId: session.data?.user.id,
                      coursesPlanned,
                    }),
                  });
                  if (request.ok) {
                    const updatedGoal = await fetch("/api/goals");
                    const updatedGoalData = await updatedGoal.json();
                    setGoals(updatedGoalData);
                    setStatus(true);
                  } else {
                    setMessage(false);
                    setStatus(false);
                    alert("Failed to set your goal");
                    console.error("Failed to set goal");
                  }
                }}
                style={{
                  display: "flex",
                  position: "relative",
                  flexDirection: "column",
                  width: "40%",
                  gap: 10,
                }}
              >
                <label htmlFor="coursesPlanned">
                  How many courses do you plan to complete this week?
                </label>
                <TextField
                  type="number"
                  id="coursesPlanned"
                  label="Plan"
                  value={coursesPlanned}
                  onChange={(e) => {
                    setCoursesPlanned(e.target.value as any);
                  }}
                  required
                />
                <Button variant="outlined" type="submit">
                  Set Goal
                </Button>
              </form>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
