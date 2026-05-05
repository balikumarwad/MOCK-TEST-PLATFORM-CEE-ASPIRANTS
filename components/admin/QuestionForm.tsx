"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { Subject, Chapter } from "@prisma/client";

type SubjectWithChapters = Subject & { chapters: Chapter[] };

interface QuestionFormProps {
  subjects: SubjectWithChapters[];
}

export default function QuestionForm({ subjects }: QuestionFormProps) {
  const [formData, setFormData] = useState({
    questionText: "",
    options: { A: "", B: "", C: "", D: "" },
    correctAnswer: "A",
    explanation: "",
    difficulty: "MEDIUM",
    subjectId: "",
    chapterId: "",
    imageUrl: "",
  });

  const selectedSubject = subjects.find(s => s.id === formData.subjectId);
  const availableChapters = selectedSubject?.chapters || [];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Implement submission logic
      console.log(formData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold tracking-tight mb-6">Question Details</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Question Text *</label>
            <textarea 
              required
              value={formData.questionText}
              onChange={(e) => setFormData({...formData, questionText: e.target.value})}
              className="w-full min-h-[120px] rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the question text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image (Optional)</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(["A", "B", "C", "D"] as const).map((opt) => (
              <div key={opt}>
                <label className="block text-sm font-medium mb-2 flex items-center justify-between">
                  <span>Option {opt} *</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      name="correctAnswer" 
                      value={opt}
                      checked={formData.correctAnswer === opt}
                      onChange={(e) => setFormData({...formData, correctAnswer: e.target.value})}
                    />
                    <span className="text-xs text-gray-500">Correct</span>
                  </div>
                </label>
                <input 
                  type="text"
                  required
                  value={formData.options[opt]}
                  onChange={(e) => setFormData({
                    ...formData, 
                    options: { ...formData.options, [opt]: e.target.value }
                  })}
                  className={`w-full rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formData.correctAnswer === opt 
                      ? "border-green-500 bg-green-50/10" 
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                  placeholder={`Enter option ${opt}...`}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Explanation (Optional)</label>
            <textarea 
              value={formData.explanation}
              onChange={(e) => setFormData({...formData, explanation: e.target.value})}
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Explain the solution..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <select 
                title="Difficulty"
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <select 
                title="Subject"
                value={formData.subjectId}
                onChange={(e) => setFormData({...formData, subjectId: e.target.value, chapterId: ""})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select subject...</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Chapter</label>
              <select 
                title="Chapter"
                value={formData.chapterId}
                onChange={(e) => setFormData({...formData, chapterId: e.target.value})}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!formData.subjectId}
              >
                <option value="">Select chapter...</option>
                {availableChapters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 transition-all"
          >
            {isSubmitting ? "Saving..." : "Save Question"}
          </button>
        </div>
      </div>
    </form>
  );
}
