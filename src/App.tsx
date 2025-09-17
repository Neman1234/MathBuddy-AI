import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ProblemSolver } from './components/ProblemSolver';
import { DailyChallenge } from './components/DailyChallenge';
import { History } from './components/History';
import { Profile } from './components/Profile';
import { UserProvider } from './context/UserContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'solver':
        return <ProblemSolver />;
      case 'daily':
        return <DailyChallenge />;
      case 'history':
        return <History />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Header />
        <div className="flex">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}

export default App;