import Link from "next/link";
import { LayoutDashboard, List, Upload, ArrowLeft } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <div className="w-64 flex-shrink-0 border-r bg-white dark:bg-gray-900 dark:border-gray-800 overflow-y-auto">
        <div className="flex h-16 shrink-0 items-center px-6 border-b dark:border-gray-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-red-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-xl font-bold text-red-600 dark:text-red-500">Admin</span>
          </Link>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors text-gray-700 dark:text-gray-300">
            <LayoutDashboard className="h-5 w-5 text-gray-500" /> Dashboard
          </Link>
          <Link href="/admin/questions" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors text-gray-700 dark:text-gray-300">
            <List className="h-5 w-5 text-gray-500" /> Manage Questions
          </Link>
          <Link href="/admin/import" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors text-gray-700 dark:text-gray-300">
            <Upload className="h-5 w-5 text-gray-500" /> Bulk Import
          </Link>
          
          <div className="border-t my-4 dark:border-gray-800" />
          
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors text-gray-500 dark:text-gray-400">
            <ArrowLeft className="h-5 w-5" /> Back to App
          </Link>
        </nav>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-16 items-center border-b bg-white px-6 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <h1 className="text-lg font-semibold">CEE Platform Administration</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
