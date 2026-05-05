import QuestionForm from "@/components/admin/QuestionForm";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function NewQuestionPage() {
  const subjects = await prisma.subject.findMany({
    include: { chapters: true }
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Question</h1>
        <p className="text-gray-500 mt-2">Create a new question for the mock test platform.</p>
      </div>

      <QuestionForm subjects={subjects} />
    </div>
  );
}
