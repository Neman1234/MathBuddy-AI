import React, { useState } from 'react';
import { Camera, Type, Send, Sparkles, Eye, EyeOff, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import { AIResponse } from './AIResponse';
import { SimilarProblems } from './SimilarProblems';
import { AIService, AIResponse as AIResponseType } from '../services/aiService';

export const ProblemSolver: React.FC = () => {
  const [inputMethod, setInputMethod] = useState<'text' | 'image'>('text');
  const [problem, setProblem] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'error'>('unknown');

  // Check if API is configured
  const isConfigured = AIService.isConfigured();

  // Test connection on component mount
  React.useEffect(() => {
    if (isConfigured) {
      AIService.testConnection().then(result => {
        setConnectionStatus(result.success ? 'connected' : 'error');
      });
    }
  }, [isConfigured]);

  const handleSolve = async () => {
    if (!problem.trim()) return;
    
    setIsLoading(true);
    setShowSolution(true);
    setShowAnswer(false);
    
    // Initialize loading state
    const loadingResponse: AIResponseType = {
      model: 'Gemini AI',
      response: '',
      isLoading: true
    };
    setAiResponse(loadingResponse);

    try {
      // Get response from Gemini
      const response = await AIService.getSolution(problem);
      setConnectionStatus(response.error ? 'error' : 'connected');
      setAiResponse(response);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiResponse({
        model: 'Gemini AI',
        response: '',
        error: 'Failed to get response. Please try again.',
        isLoading: false
      });
      setConnectionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (problem.trim()) {
      handleSolve();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would process the image here
      setProblem('Uploaded image: ' + file.name + ' (Image processing not implemented yet)');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Problem Solver 🧮</h2>
        <p className="text-gray-600">Enter your math problem and get step-by-step solutions powered by AI!</p>
      </div>

      {/* API Configuration Warning */}
      {!isConfigured && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-800">API Not Configured</span>
          </div>
          <p className="text-red-700 text-sm">
            The Google Gemini API key is not configured. Please contact your administrator to set up the API key.
          </p>
        </div>
      )}

      {/* Connection Status */}
      {isConfigured && connectionStatus !== 'unknown' && (
        <div className={`border rounded-xl p-4 ${connectionStatus === 'connected' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className="flex items-center space-x-2 mb-2">
            {connectionStatus === 'connected' ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-yellow-600" />
            )}
            <span className={`font-medium ${connectionStatus === 'connected' ? 'text-green-800' : 'text-yellow-800'}`}>
              {connectionStatus === 'connected' ? 'AI Connected' : 'Connection Issues'}
            </span>
          </div>
          <p className={`text-sm ${connectionStatus === 'connected' ? 'text-green-700' : 'text-yellow-700'}`}>
            {connectionStatus === 'connected' 
              ? 'MathBuddy AI is ready to help with your math problems!' 
              : 'There may be connection issues. Solutions might be delayed.'}
          </p>
        </div>
      )}

      {/* Input Method Selector */}
      {isConfigured && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How would you like to input your problem?</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setInputMethod('text')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all ${
                inputMethod === 'text'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Type className="w-5 h-5" />
              <span className="font-medium">Type Problem</span>
            </button>
            <button
              onClick={() => setInputMethod('image')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all ${
                inputMethod === 'image'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Camera className="w-5 h-5" />
              <span className="font-medium">Upload Image</span>
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      {isConfigured && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          {inputMethod === 'text' ? (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter your math problem:
              </label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Example: Solve for x: 2x + 5 = 15"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload an image of your math problem:
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Click to upload or drag and drop</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="bg-purple-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-purple-600 transition-colors"
                >
                  Choose Image
                </label>
              </div>
            </div>
          )}

          <button
            onClick={handleSolve}
            disabled={!problem.trim() || isLoading}
            className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Solve Problem</span>
                <Sparkles className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      )}

      {/* AI Solution */}
      {showSolution && aiResponse && (
        <div className="space-y-6">
          <AIResponse problem={problem} response={aiResponse} onRetry={handleRetry} />
          
          {!isLoading && aiResponse.response && !aiResponse.error && (
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Answer</h3>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{showAnswer ? 'Hide' : 'Show'} Summary</span>
                </button>
              </div>
              
              {showAnswer && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-lg font-bold text-green-800 mb-2">✅ Solution Complete!</p>
                  <p className="text-green-600">Review the detailed step-by-step solution above to understand how to solve similar problems!</p>
                </div>
              )}
            </div>
          )}

          {!isLoading && aiResponse.response && !aiResponse.error && (
            <SimilarProblems currentProblem={problem} />
          )}
        </div>
      )}
    </div>
  );
};