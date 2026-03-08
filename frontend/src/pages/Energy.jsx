import React, { useState } from 'react';
import { Zap, Lightbulb, Fan, ThermometerSnowflake, Power, TrendingDown } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';
import axios from 'axios';

const DeviceCard = ({ name, id, status, consumption, icon: Icon, onToggle }) => (
    <div className="glass p-4 flex items-center justify-between glow-card">
        <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${status === 'ON' ? `bg-blue-500 text-white shadow-lg shadow-blue-500/20` : 'bg-gray-800 text-gray-500'
                }`}>
                <Icon size={24} />
            </div>
            <div>
                <h4 className="font-bold text-white text-base tracking-tight">{name}</h4>
                <p className={`text-xs font-medium ${status === 'ON' ? 'text-blue-400' : 'text-gray-500'}`}>
                    {status === 'ON' ? 'Active' : 'Standby'}
                </p>
            </div>
        </div>
        <div className="text-right">
            <div className="mb-2">
                <p className="text-lg font-bold text-white tracking-tight">{consumption}</p>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">kWh</p>
            </div>
            <button
                onClick={() => onToggle(id)}
                className={`px-3 py-1 rounded-lg text-[9px] font-bold tracking-widest transition-all uppercase ${status === 'ON' ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                    }`}
            >
                TURN {status === 'ON' ? 'OFF' : 'ON'}
            </button>
        </div>
    </div>
);

const Energy = () => {
    const { sensorData } = useSocket();
    const [deviceStates, setDeviceStates] = useState({
        lights: 'ON',
        fans: 'ON',
        ac: 'OFF',
        projector: 'ON'
    });

    const handleToggle = async (deviceId) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/device/toggle', { device: deviceId });
            if (response.data.status === 'success') {
                setDeviceStates(response.data.devices);
            }
        } catch (error) {
            console.error("Failed to toggle device", error);
        }
    };

    return (
        <div className="p-6 space-y-6 animate-in">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Energy & Smart Control</h2>
                    <p className="text-gray-400">Manage classroom utilities and track consumption</p>
                </div>
                <div className="glass px-6 py-4 flex gap-8 items-center border-blue-500/10">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Total Usage</p>
                        <p className="text-xl font-bold text-blue-400 tracking-tight">{sensorData?.energy?.toFixed(3) || "0.000"} kWh</p>
                    </div>
                    <div className="h-8 w-[1px] bg-gray-800" />
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Current Cost</p>
                        <p className="text-xl font-bold text-white tracking-tight">₹ {(sensorData?.energy * 8.5 || 0).toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DeviceCard id="lights" name="Main Lighting" status={deviceStates.lights} consumption="0.45" icon={Lightbulb} onToggle={handleToggle} />
                <DeviceCard id="fans" name="Ceiling Fans" status={deviceStates.fans} consumption="0.30" icon={Fan} onToggle={handleToggle} />
                <DeviceCard id="ac" name="Air Conditioning" status={deviceStates.ac} consumption="1.80" icon={ThermometerSnowflake} onToggle={handleToggle} />
                <DeviceCard id="projector" name="Smart Projector" status={deviceStates.projector} consumption="0.12" icon={Power} onToggle={handleToggle} />
            </div>

            <div className="glass p-8 relative overflow-hidden bg-gradient-to-r from-blue-500/5 to-transparent">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                        <TrendingDown size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">Power Saving Insights</h3>
                        <p className="text-sm text-gray-400">AI-driven efficiency recommendations</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gray-950/50 border border-gray-800 flex justify-between items-center group transition-all">
                        <span className="text-gray-300 text-sm">Automated dimming of peripheral lights based on occupancy.</span>
                        <span className="text-blue-400 font-bold text-xs uppercase tracking-widest">+ 0.12 kWh Saved</span>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-950/50 border border-gray-800 flex justify-between items-center group transition-all">
                        <span className="text-gray-300 text-sm">Optimal AC temperature set at 24°C for energy conservation.</span>
                        <span className="text-blue-400 font-bold text-xs uppercase tracking-widest">ACTIVE OPTIMIZATION</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Energy;
