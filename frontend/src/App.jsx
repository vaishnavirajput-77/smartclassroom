import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Sensors from './pages/Sensors';
import Energy from './pages/Energy';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Dashboard />;
      case 'attendance':
        return <Attendance />;
      case 'noise':
      case 'air':
        return <Sensors />;
      case 'energy':
        return <Energy />;
      case 'analytics':
        return <div className="p-8"><h2 className="text-2xl font-bold">AI Analytics & Insights</h2><p className="text-gray-400 mt-2">Generating weekly performance report...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex bg-[#0a0e14] min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 ml-64">
        <Header />
        <main>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
