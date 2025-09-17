import React from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';

interface SimilarProblemsProps {
  currentProblem: string;
}

export const SimilarProblems: React.FC<SimilarProblemsProps> = ({ currentProblem }) => {
  const similarProblems = [
    { problem: '3x + 7 = 22', difficulty: 'Easy', topic: 'Linear Equations' },
    { problem: '5x - 3 = 17', difficulty: 'Easy', topic: 'Linear Equations' },
    { problem: '4x + 8 = 32', difficulty: 'Easy', topic: 'Linear Equations' },
    { problem: '2(x + 3) = 16', difficulty: 'Medium', topic: 'Equations with Parentheses' },
    { problem: '6x - 9 = 3x + 6', difficulty: 'Medium', topic: 'Variables on Both Sides' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <RefreshCw className="w-5 h-5" />
          <span>Similar Problems to Practice</span>
        </h3>
        <span className="text-sm text-gray-500">Based on your current problem</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {similarProblems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer group">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-lg text-gray-900">{item.problem}</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {item.difficulty}
              </span>
              <span className="text-xs text-gray-600">{item.topic}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1 mx-auto">
          <span>Show more similar problems</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};