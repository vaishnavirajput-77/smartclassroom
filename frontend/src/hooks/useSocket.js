import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://127.0.0.1:5000';

export const useSocket = () => {
    const [socket, setSocket] = useState(null);
    const [sensorData, setSensorData] = useState(null);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        newSocket.on('initial_state', (data) => {
            setSensorData(data.sensors);
        });

        newSocket.on('sensor_update', (data) => {
            setSensorData(data);
        });

        newSocket.on('alert', (alert) => {
            setAlerts((prev) => [alert, ...prev].slice(0, 5));
        });

        return () => newSocket.close();
    }, []);

    return { sensorData, alerts };
};
