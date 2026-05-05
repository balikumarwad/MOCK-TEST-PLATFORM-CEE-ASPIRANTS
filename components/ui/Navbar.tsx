import Link from "next/link";
import { User, LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-500 hidden md:block">
          CEE Platform
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1.5 text-sm h-10">
          <User className="h-4 w-4" />
          <span className="font-medium hidden sm:inline">Student</span>
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400">
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Log out</span>
        </button>
      </div>
    </header>
  );
}
