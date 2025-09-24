import React, { useState } from 'react';
import { User, Settings, Globe, Shield, Bell, Save } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const Profile: React.FC = () => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState(user);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    updateUser(formData);
    // Show success message
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'safety', label: 'Safety', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings 👤</h2>
        <p className="text-gray-600">Manage your account and learning preferences</p>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="opacity-90">Level {user.level} • {user.grade} Grade</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {user.problemsSolved} problems solved
              </div>
              <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                {user.streak} day streak
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Math Level</label>
                  <select
                    value={formData.mathLevel}
                    onChange={(e) => handleInputChange('mathLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="elementary">Elementary</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Favorite Math Topics</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Algebra', 'Geometry', 'Fractions', 'Percentages', 'Word Problems', 'Calculus'].map(topic => (
                    <label key={topic} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.favoriteTopics.includes(topic)}
                        onChange={(e) => {
                          const topics = e.target.checked
                            ? [...formData.favoriteTopics, topic]
                            : formData.favoriteTopics.filter(t => t !== topic);
                          handleInputChange('favoriteTopics', topics);
                        }}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{topic}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Preference</label>
                <select
                  value={formData.difficultyPreference}
                  onChange={(e) => handleInputChange('difficultyPreference', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="mixed">Mixed Difficulty</option>
                  <option value="easy">Focus on Easy Problems</option>
                  <option value="medium">Focus on Medium Problems</option>
                  <option value="hard">Focus on Hard Problems</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Daily Challenge Time</label>
                <select
                  value={formData.dailyChallengeTime}
                  onChange={(e) => handleInputChange('dailyChallengeTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="morning">Morning (8:00 AM)</option>
                  <option value="afternoon">Afternoon (2:00 PM)</option>
                  <option value="evening">Evening (6:00 PM)</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.notifications.dailyReminder}
                    onChange={(e) => handleInputChange('notifications', {
                      ...formData.notifications,
                      dailyReminder: e.target.checked
                    })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <Bell className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Daily practice reminders</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.notifications.achievements}
                    onChange={(e) => handleInputChange('notifications', {
                      ...formData.notifications,
                      achievements: e.target.checked
                    })}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <Bell className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Achievement notifications</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Child Safety Features</span>
                </div>
                <p className="text-green-700 text-sm">
                  All content is automatically filtered for age-appropriate material. No external links or unsafe content allowed.
                </p>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Safe Search Only</span>
                    <p className="text-xs text-gray-500">Only show educational math content</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.safetySettings.safeSearchOnly}
                    onChange={(e) => handleInputChange('safetySettings', {
                      ...formData.safetySettings,
                      safeSearchOnly: e.target.checked
                    })}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    disabled
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Block External Links</span>
                    <p className="text-xs text-gray-500">Prevent navigation to external websites</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.safetySettings.blockExternalLinks}
                    onChange={(e) => handleInputChange('safetySettings', {
                      ...formData.safetySettings,
                      blockExternalLinks: e.target.checked
                    })}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    disabled
                  />
                </label>

                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Content Moderation</span>
                    <p className="text-xs text-gray-500">AI monitors all interactions for safety</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.safetySettings.contentModeration}
                    onChange={(e) => handleInputChange('safetySettings', {
                      ...formData.safetySettings,
                      contentModeration: e.target.checked
                    })}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    disabled
                  />
                </label>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};