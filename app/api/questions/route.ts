import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
  try {
    const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token || token.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      questionText, options, correctAnswer, explanation, 
      difficulty, subjectId, chapterId, imageUrl 
    } = body;

    const question = await prisma.question.create({
      data: {
        questionText,
        options,
        correctAnswer,
        explanation,
        difficulty,
        subjectId,
        chapterId,
        imageUrl,
      }
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error("[QUESTIONS_POST]", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
