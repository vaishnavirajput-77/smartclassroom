import React from 'react';
import { Wind, Thermometer, Droplets, Activity } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';

const SensorGrid = ({ title, icon: Icon, color, children }) => (
    <div className="glass p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
            <div className={`p-3 rounded-lg bg-blue-500/10 text-blue-400`}>
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children}
        </div>
    </div>
);

const SensorItem = ({ label, value, unit, icon: Icon, color }) => (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-blue-500/20 transition-all">
        <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center text-${color}-400`}>
                <Icon size={18} />
            </div>
            <div>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{label}</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                    <p className="text-xl font-bold text-white">{value}</p>
                    <p className="text-xs font-medium text-gray-400">{unit}</p>
                </div>
            </div>
        </div>
        <div className="text-right">
            <div className={`px-2 py-0.5 rounded-full text-[9px] font-bold bg-${color}-500/10 text-${color}-400`}>STABLE</div>
        </div>
    </div>
);

const Sensors = () => {
    const { sensorData } = useSocket();

    return (
        <div className="p-6 space-y-8 animate-in">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Environmental Health</h2>
                <p className="text-gray-400">Real-time air quality and climate monitoring</p>
            </div>

            <SensorGrid title="Air Quality Index" icon={Wind}>
                <SensorItem label="AQI" value={sensorData?.aqi || 42} unit="" icon={Activity} color="cyan" />
                <SensorItem label="CO2 Level" value={sensorData?.co2 || 412} unit="ppm" icon={Wind} color="green" />
                <SensorItem label="Temperature" value={sensorData?.temperature || "24"} unit="°C" icon={Thermometer} color="orange" />
                <SensorItem label="Relative Humidity" value={sensorData?.humidity || "55"} unit="%" icon={Droplets} color="blue" />
            </SensorGrid>

            <div className="glass p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Activity size={18} className="text-cyan-400" />
                    AI Health Correlation
                </h3>
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <p className="text-sm text-gray-300 leading-relaxed">
                        The current environment is categorized as <span className="text-blue-400 font-bold">HEALTHY</span> for cognitive learning.
                        Air quality and CO2 levels are within the safe threshold.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sensors;
