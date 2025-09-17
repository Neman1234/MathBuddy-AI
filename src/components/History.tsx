import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Calendar, Award } from 'lucide-react';

export const History: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const problemHistory = [
    {
      id: 1,
      problem: 'Solve: 2x + 5 = 15',
      solution: 'x = 5',
      difficulty: 'Easy',
      topic: 'Linear Equations',
      date: '2025-01-15',
      accuracy: 100,
      attempts: 1,
      timeSpent: '3 min'
    },
    {
      id: 2,
      problem: 'Find the area of a circle with radius 7cm',
      solution: 'A = 153.94 cm²',
      difficulty: 'Medium',
      topic: 'Geometry',
      date: '2025-01-14',
      accuracy: 85,
      attempts: 2,
      timeSpent: '8 min'
    },
    {
      id: 3,
      problem: 'Simplify: (3x² + 2x - 5) + (x² - 4x + 3)',
      solution: '4x² - 2x - 2',
      difficulty: 'Hard',
      topic: 'Polynomials',
      date: '2025-01-13',
      accuracy: 90,
      attempts: 1,
      timeSpent: '12 min'
    },
    {
      id: 4,
      problem: 'What is 15% of 240?',
      solution: '36',
      difficulty: 'Easy',
      topic: 'Percentages',
      date: '2025-01-12',
      accuracy: 100,
      attempts: 1,
      timeSpent: '2 min'
    },
    {
      id: 5,
      problem: 'Solve the quadratic: x² - 5x + 6 = 0',
      solution: 'x = 2, x = 3',
      difficulty: 'Hard',
      topic: 'Quadratic Equations',
      date: '2025-01-11',
      accuracy: 75,
      attempts: 3,
      timeSpent: '20 min'
    }
  ];

  const filteredHistory = problemHistory.filter(item => {
    const matchesSearch = item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || 
                             item.difficulty.toLowerCase() === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const stats = {
    totalProblems: problemHistory.length,
    averageAccuracy: Math.round(problemHistory.reduce((sum, p) => sum + p.accuracy, 0) / problemHistory.length),
    totalTime: problemHistory.reduce((sum, p) => sum + parseInt(p.timeSpent), 0),
    streak: 5
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Progress 📈</h2>
        <p className="text-gray-600">Track your math learning journey and see how you're improving!</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">{stats.totalProblems}</span>
          </div>
          <p className="text-gray-600 text-sm">Problems Solved</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">{stats.averageAccuracy}%</span>
          </div>
          <p className="text-gray-600 text-sm">Average Accuracy</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">{stats.totalTime}</span>
          </div>
          <p className="text-gray-600 text-sm">Minutes Practiced</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🔥</span>
            <span className="text-2xl font-bold text-gray-900">{stats.streak}</span>
          </div>
          <p className="text-gray-600 text-sm">Day Streak</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Problems</label>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by problem or topic..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Difficulty</label>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Problem History */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Problem History</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredHistory.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-2">{item.problem}</p>
                  <p className="text-sm text-gray-600 mb-3">Solution: <span className="font-mono">{item.solution}</span></p>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">{item.topic}</span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                </div>
                
                <div className="text-right text-sm text-gray-600 ml-4">
                  <div className="mb-1">Accuracy: <span className="font-medium">{item.accuracy}%</span></div>
                  <div className="mb-1">Attempts: <span className="font-medium">{item.attempts}</span></div>
                  <div>Time: <span className="font-medium">{item.timeSpent}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredHistory.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No problems found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};