import React from 'react';
import { Calculator, Calendar, TrendingUp, Star, Target, Award } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useUser();

  const stats = [
    { label: 'Problems Solved', value: '24', icon: Calculator, color: 'bg-blue-500', increase: '+3 today' },
    { label: 'Daily Streak', value: '7', icon: Calendar, color: 'bg-orange-500', increase: 'Keep going!' },
    { label: 'Accuracy Rate', value: '89%', icon: Target, color: 'bg-green-500', increase: '+5% this week' },
    { label: 'Level Progress', value: 'Level 3', icon: Star, color: 'bg-purple-500', increase: '80% to next' },
  ];

  const quickActions = [
    {
      title: 'Solve New Problem',
      description: 'Get help with any math problem',
      icon: Calculator,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      action: () => onNavigate('solver')
    },
    {
      title: 'Daily Challenge',
      description: 'Complete today\'s special problem',
      icon: Award,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      action: () => onNavigate('daily')
    },
    {
      title: 'View Progress',
      description: 'See your learning journey',
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      action: () => onNavigate('history')
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}! 🌟
        </h2>
        <p className="text-gray-600">Ready to learn some math today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-green-600 text-xs mt-1 font-medium">{stat.increase}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-left group"
              >
                <div className={`${action.color} p-4 rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h4>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { problem: 'Solved: 2x + 5 = 15', time: '2 hours ago', difficulty: 'Medium' },
            { problem: 'Completed daily challenge', time: '1 day ago', difficulty: 'Hard' },
            { problem: 'Solved: Area of triangle', time: '2 days ago', difficulty: 'Easy' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{activity.problem}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                activity.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                activity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {activity.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};