import React from 'react';
import { Users, Volume2, Wind, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useSocket } from '../hooks/useSocket';

const data = [
    { time: '09:00', attendance: 30, noise: 45, energy: 120 },
    { time: '10:00', attendance: 32, noise: 65, energy: 150 },
    { time: '11:00', attendance: 31, noise: 50, energy: 140 },
    { time: '12:00', attendance: 15, noise: 80, energy: 90 },
    { time: '13:00', attendance: 28, noise: 40, energy: 110 },
    { time: '14:00', attendance: 30, noise: 55, energy: 130 },
];

const StatCard = ({ title, value, unit, icon: Icon, color, trend }) => (
    <div className="glass p-4 glow-card transition-all">
        <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-xl bg-blue-500/10 text-blue-400`}>
                <Icon size={20} />
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 flex items-center gap-1`}>
                {trend >= 0 ? '+' : ''}{trend}%
                <TrendingUp size={10} className={trend < 0 ? 'rotate-180' : ''} />
            </span>
        </div>
        <p className="text-gray-400 text-xs font-medium">{title}</p>
        <div className="flex items-baseline gap-1 mt-0.5">
            <h3 className="text-xl font-bold text-white tracking-tight">{value}</h3>
            <span className="text-gray-500 text-[10px]">{unit}</span>
        </div>
    </div>
);

const Dashboard = () => {
    const { sensorData, alerts } = useSocket();

    const stats = {
        attendance: "32/35",
        noise: sensorData?.noise || 45,
        aqi: sensorData?.aqi || 42,
        energy: sensorData?.energy?.toFixed(2) || "1.25"
    };


    return (
        <div className="p-6 space-y-6 animate-in">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Classroom Overview</h2>
                    <p className="text-gray-400">Monitoring Room 402 - Computer Science Block</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 rounded-lg border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700 transition-all text-sm font-medium">Export Report</button>
                    <button className="btn-primary text-sm">Live Stream</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Attendance" value={stats.attendance} unit="Students" icon={Users} trend={12} />
                <StatCard title="Noise Level" value={stats.noise} unit="dB" icon={Volume2} trend={-5} />
                <StatCard title="Air Quality" value={stats.aqi} unit="AQI" icon={Wind} trend={2} />
                <StatCard title="Energy Usage" value={stats.energy} unit="kWh" icon={Zap} trend={-8} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass p-6">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <TrendingUp size={18} className="text-blue-400" />
                        Attendance & Noise Trends
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00d2ff" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00d2ff" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorNoise" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#9d50bb" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#9d50bb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
                                <XAxis dataKey="time" stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#8b949e" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px' }}
                                    itemStyle={{ color: '#e6edf3' }}
                                />
                                <Area type="monotone" dataKey="attendance" stroke="#00d2ff" fillOpacity={1} fill="url(#colorAtt)" />
                                <Area type="monotone" dataKey="noise" stroke="#9d50bb" strokeWidth={2} fillOpacity={1} fill="url(#colorNoise)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass p-6 flex flex-col">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <AlertCircle size={18} className="text-yellow-400" />
                        Live Alerts ({alerts.length})
                    </h3>
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                        {alerts.length > 0 ? alerts.map((alert, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border flex gap-4 ${alert.type === 'noise' ? 'bg-purple-500/10 border-purple-500/20' : 'bg-red-500/10 border-red-500/20'
                                }`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${alert.type === 'noise' ? 'bg-purple-500/10 text-purple-400' : 'bg-red-500/10 text-red-400'
                                    }`}>
                                    <AlertCircle size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm capitalize">{alert.type} Alert</p>
                                    <p className="text-xs text-gray-400 mt-1">{alert.message} Value: {alert.value}</p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500 text-sm">No active alerts. System stable.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
