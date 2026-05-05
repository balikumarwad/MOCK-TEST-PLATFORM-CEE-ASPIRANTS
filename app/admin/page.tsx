import { prisma } from "@/lib/prisma";
import { Users, FileText, Activity } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const usersCount = await prisma.user.count();
  const questionsCount = await prisma.question.count();
  const testsCount = await prisma.mockTest.count();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">Platform statistics and management overivew.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</h3>
            <Users className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-3xl font-bold">{usersCount}</div>
        </div>
        
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500 dark:text-gray-400">Total Questions</h3>
            <FileText className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-3xl font-bold">{questionsCount}</div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-sm font-medium text-gray-500 dark:text-gray-400">Mock Tests Taken</h3>
            <Activity className="h-4 w-4 text-gray-500" />
          </div>
          <div className="text-3xl font-bold">{testsCount}</div>
        </div>
      </div>
    </div>
  );
}
