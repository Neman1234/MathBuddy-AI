import React from 'react';
import { Bot, CheckCircle, Clock } from 'lucide-react';

interface AIResponseProps {
  problem: string;
  isLoading: boolean;
}

export const AIResponse: React.FC<AIResponseProps> = ({ problem, isLoading }) => {
  const aiModels = [
    { 
      name: 'ChatGPT', 
      color: 'bg-green-500', 
      response: 'Step 1: Subtract 5 from both sides\n2x + 5 - 5 = 15 - 5\n2x = 10\n\nStep 2: Divide both sides by 2\n2x ÷ 2 = 10 ÷ 2\nx = 5'
    },
    { 
      name: 'Gemini', 
      color: 'bg-blue-500', 
      response: 'Let\'s solve this equation step by step:\n\n1) Start with: 2x + 5 = 15\n2) Subtract 5: 2x = 15 - 5 = 10\n3) Divide by 2: x = 10 ÷ 2 = 5\n\nAnswer: x = 5'
    },
    { 
      name: 'Grok', 
      color: 'bg-purple-500', 
      response: 'Here\'s how to solve 2x + 5 = 15:\n\n• First, isolate the term with x by subtracting 5 from both sides\n• 2x = 15 - 5 = 10\n• Then divide both sides by 2 to get x alone\n• x = 10 ÷ 2 = 5\n\nSolution: x = 5' 
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <Bot className="w-5 h-5" />
        <span>AI Solutions</span>
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {aiModels.map((model, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className={`w-3 h-3 rounded-full ${model.color}`}></div>
              <span className="font-semibold text-gray-900">{model.name}</span>
              {isLoading ? (
                <Clock className="w-4 h-4 text-gray-400 animate-spin ml-auto" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
              )}
            </div>
            
            {isLoading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            ) : (
              <div className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded">
                {model.response}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!isLoading && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-sm">
            <strong>Summary:</strong> All AI models agree that the solution is x = 5. The approach involves isolating the variable by performing the same operations on both sides of the equation.
          </p>
        </div>
      )}
    </div>
  );
};