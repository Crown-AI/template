import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextResponse } from "next/server";

export const DELETE = async () => {
    const session = await getServerSession();
    const userId = session.user.id;
    if (!userId) {
        return NextResponse.json({error: "User not authenticated"}, {status: 401});
    }
    const activeGoal = await prisma.goal.findFirst({
        where: {
            userId: userId,
            status: "active",
        },
    });
    if (!activeGoal) {
        return NextResponse.json({error: "No active goal found"}, {status: 400});
    }
    await prisma.goal.deleteMany({
        where: {
            userId: userId,
            status: "active",
        },
    });
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            goalSet: false,
        },
    });
    return NextResponse.json({message: "Goal deleted successfully!! You can now add another one"});
};