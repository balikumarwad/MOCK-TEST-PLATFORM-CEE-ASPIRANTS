import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: Request) {
  try {
    const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token || token.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    if (!Array.isArray(data)) {
      return NextResponse.json({ error: "Expected an array of questions" }, { status: 400 });
    }

    let importedCount = 0;

    for (const q of data) {
      // Find or create subject
      let subject = await prisma.subject.findUnique({
        where: { name: q.subject }
      });

      if (!subject) {
        subject = await prisma.subject.create({
          data: { name: q.subject }
        });
      }

      // Find or create chapter
      let chapter = await prisma.chapter.findFirst({
        where: { name: q.chapter, subjectId: subject.id }
      });

      if (!chapter) {
        chapter = await prisma.chapter.create({
          data: { name: q.chapter, subjectId: subject.id }
        });
      }

      // Create question
      await prisma.question.create({
        data: {
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || null,
          difficulty: q.difficulty || "MEDIUM",
          year: q.year || null,
          source: q.source || "CEE",
          subjectId: subject.id,
          chapterId: chapter.id,
        }
      });
      
      importedCount++;
    }

    return NextResponse.json({ count: importedCount });
  } catch (error: any) {
    console.error("[QUESTIONS_IMPORT]", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}
