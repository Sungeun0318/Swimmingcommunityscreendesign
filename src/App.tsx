import React, { useState } from 'react';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { CommunityFeed } from './components/CommunityFeed';
import { Scheduler } from './components/Scheduler';
import { Training } from './components/Training';
import { Profile } from './components/Profile';
import { BottomNavigation } from './components/BottomNavigation';
import { CreatePost } from './components/CreatePost';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleCreatePost = () => {
    setShowCreatePost(true);
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        
        <main className="max-w-md mx-auto pt-16">
          {activeTab === 'home' && <Home onNavigate={handleNavigate} onCreatePost={handleCreatePost} />}
          {activeTab === 'community' && <CommunityFeed onCreatePost={handleCreatePost} />}
          {activeTab === 'scheduler' && <Scheduler />}
          {activeTab === 'training' && <Training onCreateCustom={handleCreatePost} />}
          {activeTab === 'profile' && <Profile isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />}
        </main>

        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        
        {showCreatePost && <CreatePost onClose={() => setShowCreatePost(false)} />}
      </div>
    </div>
  );
}

export default App;