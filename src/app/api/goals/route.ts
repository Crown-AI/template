import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { endOfWeek } from "date-fns";

export const POST = async (req: NextRequest) => {
  const { coursesPlanned, userId } = await req.json();
  const expiryDate = endOfWeek(new Date(), { weekStartsOn: 1 });
  const session = await getServerSession();
  if (!session || !session.user.id) {
    return NextResponse.json({ error: "You must login first to do this" }, { status: 401 });
  }
  const existingGoal = await prisma.goal.findFirst({
    where: {
      userId: userId,
      status: "active",
    },
  });
  if (existingGoal) {
    return NextResponse.json(
      { error: "You already have a goal set! Cancel it before setting a new one." },
      { status: 400 },
    );
  }
  if (parseInt(coursesPlanned) <= 0) {
    return NextResponse.json({ error: "You cannot set your goal as zero or a negative number" });
  }
  await prisma.goal.create({
    data: {
      userId,
      coursesPlanned: parseInt(coursesPlanned),
      coursesCompleted: 0,
      status: "active",
      progress: 0,
      expiryDate,
    },
  });
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      goalSet: true,
    },
  });
  return NextResponse.json({ message: "Goal created successfully" }, { status: 200 });
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession();
  const userId = session.user.id;
  const data = await prisma.goal.findMany({
    where: {
      userId: userId,
    },
  });
  const confirmation = await prisma.user.findFirst({
    where: { id: userId },
  });
  if (confirmation?.goalSet === false) {
    return NextResponse.json({ error: "No goal found" }, { status: 500 });
  }
  return NextResponse.json(data);
};
