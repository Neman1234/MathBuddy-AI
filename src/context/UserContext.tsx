import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  age: number;
  grade: string;
  mathLevel: string;
  language: string;
  level: number;
  problemsSolved: number;
  streak: number;
  favoriteTopics: string[];
  difficultyPreference: string;
  dailyChallengeTime: string;
  notifications: {
    dailyReminder: boolean;
    achievements: boolean;
  };
  safetySettings: {
    safeSearchOnly: boolean;
    blockExternalLinks: boolean;
    contentModeration: boolean;
  };
}

interface UserContextType {
  user: User;
  updateUser: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: 'Neel',
    age: 10,
    grade: '3',
    mathLevel: 'intermediate',
    language: 'en',
    level: 3,
    problemsSolved: 24,
    streak: 7,
    favoriteTopics: ['Algebra', 'Geometry'],
    difficultyPreference: 'mixed',
    dailyChallengeTime: 'afternoon',
    notifications: {
      dailyReminder: true,
      achievements: true
    },
    safetySettings: {
      safeSearchOnly: true,
      blockExternalLinks: true,
      contentModeration: true
    }
  });

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};