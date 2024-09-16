import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { Box, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { redirect } from "next/navigation";

// This will run server-side before rendering the page
export async function generateMetadata({ params }: { params: { id: string } }) {
    const goal = await prisma.goal.findUnique({
      where: {
        id: params.id,
      },
    });
  
    if (!goal) {
      return {
        title: "Goal Not Found",
      };
    }
  
    return {
      title: `Goal ${goal.coursesPlanned} Courses`,
    };
  }
  
  export default async function GoalPage({ params }: { params: { id: string } }) {
    const session = await getServerSession();
  
    if (!session || !session.user?.id) {
      return redirect("/auth/login");
    }
  
    const goal = await prisma.goal.findUnique({
      where: {
        id: session.user.id,
      },
    });
  
    if (!goal || goal.userId !== session.user.id) {
      return redirect("/");
    }
  
    return (
      <Box>
        <Typography variant="h4">Your Goal</Typography>
        <Typography variant="body1">
          You planned to complete {goal.coursesPlanned} courses this week.
        </Typography>
        <Typography variant="body1">
          So far, you have completed {goal.coursesCompleted} courses.
        </Typography>
      </Box>
    );
  }