import React from 'react';
import { LayoutDashboard, Users, Volume2, Wind, Zap, BarChart3, Settings } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'overview', name: 'Overview', icon: LayoutDashboard },
        { id: 'attendance', name: 'Attendance', icon: Users },
        { id: 'noise', name: 'Noise Monitor', icon: Volume2 },
        { id: 'air', name: 'Air Quality', icon: Wind },
        { id: 'energy', name: 'Energy Control', icon: Zap },
        { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    ];

    return (
        <div className="w-60 h-screen bg-[#0d1117] border-r border-gray-800/60 flex flex-col fixed left-0 top-0 z-20">
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 h-16 border-b border-gray-800/60">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Zap className="text-white w-4 h-4" />
                </div>
                <h1 className="text-base font-bold tracking-tight text-white">SmartClass<span className="text-blue-400">AI</span></h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-[13px] ${activeTab === item.id
                                ? 'bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/15'
                                : 'text-gray-500 hover:bg-gray-800/40 hover:text-gray-300 border border-transparent'
                            }`}
                    >
                        <item.icon size={18} className={
                            activeTab === item.id
                                ? 'text-blue-400'
                                : 'text-gray-600 group-hover:text-gray-400 transition-colors'
                        } />
                        <span>{item.name}</span>
                    </button>
                ))}
            </nav>

            {/* Settings */}
            <div className="px-3 py-4 border-t border-gray-800/60">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-800/40 hover:text-gray-400 transition-all group text-[13px] border border-transparent">
                    <Settings size={18} className="group-hover:rotate-45 transition-transform" />
                    <span>Settings</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
