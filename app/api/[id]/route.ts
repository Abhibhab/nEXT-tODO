import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { nextTick } from "process";
import prisma from "@/app/utils/connect";
export async function DELETE(
  res: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    const { id } = params;
    if (!userId) {
      return NextResponse.json({ error: "unauthorised", status: 401 });
    }
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    console.log("Task Deleted", task);
    return NextResponse.json({ task });
  } catch (error) {
    console.log("Error deleteing task:", error);
    return NextResponse.json({ error: "Error deleting tsk", status: 500 });
  }
}
