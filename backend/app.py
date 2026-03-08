import time
import random
import threading
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import os

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# State Management
classroom_state = {
    "attendance": {
        "present": 32,
        "total": 35,
        "last_update": time.strftime("%H:%M:%S")
    },
    "sensors": {
        "noise": 45,
        "temperature": 24.5,
        "humidity": 55,
        "co2": 412,
        "aqi": 38,
        "energy": 1.25
    },
    "devices": {
        "lights": "ON",
        "fans": "ON",
        "ac": "OFF",
        "projector": "ON"
    },
    "alerts": []
}

def monitor_logic():
    """Background thread to simulate sensor data and logic."""
    while True:
        # Simulate real-time fluctuations
        classroom_state["sensors"]["noise"] = random.randint(30, 90)
        classroom_state["sensors"]["co2"] = random.randint(380, 850)
        classroom_state["sensors"]["aqi"] = random.randint(25, 160)
        classroom_state["sensors"]["energy"] += round(random.uniform(0.005, 0.02), 3)
        
        # Logic: Auto-turn off AC if too cold or empty
        if classroom_state["sensors"]["temperature"] < 20:
             classroom_state["devices"]["ac"] = "OFF"
             
        # Alerts Logic
        new_alerts = []
        if classroom_state["sensors"]["noise"] > 80:
            new_alerts.append({"type": "noise", "message": "High noise levels detected!", "value": classroom_state["sensors"]["noise"]})
        if classroom_state["sensors"]["aqi"] > 100:
            new_alerts.append({"type": "air", "message": "Poor air quality. Ventilation recommended.", "value": classroom_state["sensors"]["aqi"]})
        
        classroom_state["alerts"] = new_alerts
        
        # Broadcast to all clients
        socketio.emit('sensor_update', classroom_state["sensors"])
        if new_alerts:
            for a in new_alerts:
                socketio.emit('alert', a)
                
        time.sleep(3)

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify(classroom_state)

@app.route('/api/device/toggle', methods=['POST'])
def toggle_device():
    data = request.json
    device = data.get('device')
    if device in classroom_state["devices"]:
        current = classroom_state["devices"][device]
        classroom_state["devices"][device] = "OFF" if current == "ON" else "ON"
        socketio.emit('device_update', classroom_state["devices"])
        return jsonify({"status": "success", "devices": classroom_state["devices"]})
    return jsonify({"status": "error", "message": "Invalid device"}), 400

@app.route('/api/iot-ingest', methods=['POST'])
def iot_ingest():
    """Endpoint for physical ESP32 to send data."""
    data = request.json
    # Update state with real IoT data
    for key in data:
        if key in classroom_state["sensors"]:
            classroom_state["sensors"][key] = data[key]
    
    socketio.emit('sensor_update', classroom_state["sensors"])
    return jsonify({"status": "received", "relay_control": classroom_state["devices"]})

@socketio.on('connect')
def on_connect():
    emit('initial_state', classroom_state)

if __name__ == '__main__':
    threading.Thread(target=monitor_logic, daemon=True).start()
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, debug=True, port=port, allow_unsafe_werkzeug=True, host='0.0.0.0')