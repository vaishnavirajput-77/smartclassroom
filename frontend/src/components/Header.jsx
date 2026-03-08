import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';

const Header = () => {
    const { sensorData } = useSocket();
    const isConnected = !!sensorData;

    return (
        <header className="h-16 flex items-center justify-between px-6 bg-[#0d1117]/80 backdrop-blur-md border-b border-gray-800/60 sticky top-0 z-10">
            {/* Connection Status */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit"
                    style={{
                        background: isConnected ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
                        color: isConnected ? '#22c55e' : '#ef4444',
                        border: `1px solid ${isConnected ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}`
                    }}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                    {isConnected ? 'Live' : 'Offline'}
                </div>
            </div>

            {/* Search Bar - Centered */}
            <div className="flex-1 flex justify-center px-8">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-[#161b22] border border-gray-700/60 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-gray-500"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-5">
                <button className="relative text-gray-500 hover:text-gray-200 transition-colors">
                    <Bell size={18} />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                </button>

                <div className="h-8 w-px bg-gray-800"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden md:block">
                        <p className="text-xs font-semibold text-gray-300 leading-tight">Prof. Vaishnavi</p>
                        <p className="text-[10px] text-gray-500">Class Administrator</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                        V
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
