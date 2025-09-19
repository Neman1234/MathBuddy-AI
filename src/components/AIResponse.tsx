import React from 'react';
import { Bot, CheckCircle, Clock, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { AIResponse as AIResponseType } from '../services/aiService';

interface AIResponseProps {
  problem: string;
  response: AIResponseType;
  onRetry: () => void;
}

export const AIResponse: React.FC<AIResponseProps> = ({ problem, response, onRetry }) => {
  const hasValidResponse = response.response && !response.error;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <span>AI Solution</span>
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </h3>
        <button
          onClick={onRetry}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry</span>
        </button>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="font-semibold text-gray-900">{response.model}</span>
          {response.isLoading ? (
            <Clock className="w-4 h-4 text-gray-400 animate-spin ml-auto" />
          ) : response.error ? (
            <AlertCircle className="w-4 h-4 text-red-500 ml-auto" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
          )}
        </div>
        
        {response.isLoading ? (
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        ) : response.error ? (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200">
            <p className="font-medium mb-1">Error:</p>
            <p>{response.error}</p>
          </div>
        ) : response.response ? (
          <div className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 p-4 rounded max-h-96 overflow-y-auto">
            {response.response}
          </div>
        ) : (
          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
            No response available
          </div>
        )}
      </div>
      
      {hasValidResponse && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 text-sm">
            <strong>💡 Learning Tip:</strong> Try to work through each step yourself before looking at the solution. This helps build your problem-solving skills!
          </p>
        </div>
      )}
      
      {!hasValidResponse && !response.isLoading && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> Unable to get a response from the AI. Please check your problem and try again, or make sure it's a math-related question.
          </p>
        </div>
      )}
    </div>
  );
};