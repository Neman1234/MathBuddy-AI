import React, { useState } from 'react';
import { Calendar, Trophy, Star, Clock, CheckCircle } from 'lucide-react';

export const DailyChallenge: React.FC = () => {
  const [completed, setCompleted] = useState(false);
  const [answer, setAnswer] = useState('');

  const todaysProblem = {
    date: new Date().toDateString(),
    problem: "A rectangular garden is 3 times as long as it is wide. If the perimeter is 48 meters, what are the dimensions?",
    difficulty: "Medium",
    points: 50,
    hint: "Remember: Perimeter = 2(length + width)"
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      setCompleted(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Daily Challenge 🏆</h2>
        <p className="text-gray-600">Solve today's special problem and earn bonus points!</p>
      </div>

      {/* Challenge Status */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">Today's Challenge</h3>
              <p className="opacity-90">{todaysProblem.date}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold">{todaysProblem.points} points</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              todaysProblem.difficulty === 'Easy' ? 'bg-green-500' :
              todaysProblem.difficulty === 'Medium' ? 'bg-yellow-500' :
              'bg-red-500'
            }`}>
              {todaysProblem.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Problem */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-start space-x-4">
          <div className="bg-orange-100 p-3 rounded-lg flex-shrink-0">
            <Trophy className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Problem</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {todaysProblem.problem}
            </p>
            
            {/* Hint */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Hint</span>
              </div>
              <p className="text-blue-700 text-sm">{todaysProblem.hint}</p>
            </div>

            {/* Answer Input */}
            {!completed ? (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Your Answer:
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Show your work and explain your solution..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={4}
                />
                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <h4 className="text-lg font-semibold text-green-800">Congratulations! 🎉</h4>
                    <p className="text-green-600">You've completed today's challenge!</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h5 className="font-semibold text-gray-900 mb-2">Solution:</h5>
                  <p className="text-gray-700 text-sm">
                    Let width = w, then length = 3w<br/>
                    Perimeter: 2(w + 3w) = 48<br/>
                    2(4w) = 48<br/>
                    8w = 48<br/>
                    w = 6 meters<br/>
                    Length = 3 × 6 = 18 meters
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium">+{todaysProblem.points} points earned!</span>
                  <button className="text-orange-600 hover:text-orange-700 font-medium">
                    Share Achievement
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Streak */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenge Streak</h3>
        <div className="flex items-center space-x-2">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                i < 5 ? 'bg-orange-500 text-white' : 
                i === 5 ? 'bg-orange-200 text-orange-700' : 'bg-gray-200 text-gray-400'
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-sm mt-3">
          5 day streak! Complete today's challenge to extend your streak to 6 days.
        </p>
      </div>
    </div>
  );
};