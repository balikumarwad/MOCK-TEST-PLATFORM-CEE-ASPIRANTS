"use client";

import { Upload, FilePlus, Loader2 } from "lucide-react";
import { useState } from "react";

export default function BulkImportPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: "success" | "error" } | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage(null);

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const res = await fetch("/api/questions/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      
      const responseBody = await res.json();
      setMessage({ text: `Successfully imported ${responseBody.count} questions!`, type: "success" });
    } catch (err: any) {
      console.error(err);
      setMessage({ text: `Failed to import: ${err.message}`, type: "error" });
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bulk Import</h1>
        <p className="text-gray-500 mt-2">Upload JSON or CSV files to quickly add multiple questions.</p>
      </div>

      <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
          <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">Upload Question Bank</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Drag and drop your JSON or CSV file here, or click to select files
        </p>
        <div className="mt-6 flex justify-center">
          <label className="inline-flex cursor-pointer items-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
            <input 
              type="file" 
              accept=".json"
              className="hidden" 
              onChange={handleFileUpload} 
              disabled={isUploading}
            />
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <FilePlus className="mr-2 h-4 w-4" />
                Select File
              </>
            )}
          </label>
        </div>
        
        {message && (
          <div className={`mt-4 p-4 rounded-md mx-auto max-w-md ${
             message.type === "success" 
               ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
               : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}>
             {message.text}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg p-6">
        <h4 className="font-semibold mb-4">Required JSON Format:</h4>
        <pre className="bg-gray-50 dark:bg-gray-950 p-4 rounded-md text-xs sm:text-sm text-gray-600 dark:text-gray-400 overflow-x-auto border dark:border-gray-800">
{`[
  {
    "questionText": "Which organelle...",
    "options": { "A": "Nucleus", "B": "Mitochondria", "C": "Ribosome", "D": "Golgi" },
    "correctAnswer": "B",
    "explanation": "...",
    "difficulty": "EASY",
    "year": 2022,
    "source": "CEE",
    "subject": "Zoology",
    "chapter": "Cell Biology"
  }
]`}
        </pre>
      </div>
    </div>
  );
}
