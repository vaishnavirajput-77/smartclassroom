import React, { useState } from 'react';
import { Search, UserCheck, Calendar } from 'lucide-react';

const Attendance = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([
        { id: 101, name: "Alice Johnson", status: "Present", time: "09:02 AM", confidence: "98.5%" },
        { id: 102, name: "Bob Smith", status: "Present", time: "09:05 AM", confidence: "96.2%" },
        { id: 103, name: "Charlie Brown", status: "Absent", time: "-", confidence: "0%" },
        { id: 104, name: "David Miller", status: "Present", time: "08:58 AM", confidence: "99.1%" },
        { id: 105, name: "Eve Williams", status: "Late", time: "09:15 AM", confidence: "97.8%" },
    ]);

    return (
        <div className="p-6 space-y-6 animate-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Attendance Management</h2>
                    <p className="text-gray-400 text-sm">AI-Powered Presence Detection - Room 402</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative w-72 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900 w-[18px] h-[18px] z-10" strokeWidth={2.5} />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-[#d1d5db] rounded-full py-2 pl-12 pr-4 text-[15px] font-normal text-gray-900 focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-[#4285f4] shadow-sm"
                        />
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-950 border border-gray-800 rounded-xl text-xs font-semibold text-gray-300">
                        <Calendar size={14} className="text-blue-400" />
                        <span>Feb 23, 2026</span>
                    </div>
                    <button className="btn-primary text-xs flex items-center gap-2 px-5 py-2 rounded-xl">
                        <UserCheck size={16} />
                        Mark Manual
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 text-center">
                    <p className="text-gray-400 text-sm mb-1">Total Students</p>
                    <h3 className="text-3xl font-bold">35</h3>
                </div>
                <div className="glass p-6 text-center">
                    <p className="text-gray-400 text-sm mb-1 text-green-400">Present</p>
                    <h3 className="text-3xl font-bold text-green-400">32</h3>
                </div>
                <div className="glass p-6 text-center">
                    <p className="text-gray-400 text-sm mb-1 text-red-400">Absent</p>
                    <h3 className="text-3xl font-bold text-red-400">3</h3>
                </div>
            </div>

            <div className="glass overflow-hidden">
                <div className="p-4 px-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/40">
                    <h3 className="font-semibold text-sm">Student Logs</h3>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Live Activity</span>
                    </div>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="text-xs text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Student Name</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">In-Time</th>
                            <th className="px-6 py-4 font-semibold">AI Confidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-800/10 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-xs font-bold">
                                            {student.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm font-medium">{student.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${student.status === 'Present' ? 'bg-green-500/10 text-green-400' :
                                        student.status === 'Late' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                                        }`}>
                                        {student.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-400">{student.time}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 w-20 bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500" style={{ width: student.confidence }}></div>
                                        </div>
                                        <span className="text-xs text-gray-400">{student.confidence}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;
