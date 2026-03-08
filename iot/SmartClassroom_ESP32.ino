/*
  Smart Classroom Monitoring System - IoT Node (ESP32)
  Sensors: DHT11 (Temp/Hum), MQ-135 (Air Quality), Sound Sensor, Current Sensor
*/

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "DHT.h"

// WiFi Credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Backend API URL
const char* serverName = "http://YOUR_BACKEND_IP:5000/api/iot-data";

// Pin Definitions
#define DHTPIN 4
#define DHTTYPE DHT11
#define SOUND_PIN 34
#define MQ135_PIN 35
#define RELAY_PIN 5

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  pinMode(SOUND_PIN, INPUT);
  pinMode(MQ135_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
  
  dht.begin();
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    int noise = analogRead(SOUND_PIN);
    int aq = analogRead(MQ135_PIN);
    
    // Create JSON payload
    StaticJsonDocument<200> doc;
    doc["temperature"] = t;
    doc["humidity"] = h;
    doc["noise"] = map(noise, 0, 4095, 30, 100); // Simple mapping to dB
    doc["aqi"] = map(aq, 0, 4095, 0, 500);
    
    String jsonString;
    serializeJson(doc, jsonString);
    
    // HTTP POST
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    
    int httpResponseCode = http.POST(jsonString);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
      
      // Control Relay based on response (e.g., if backend says turn off)
      StaticJsonDocument<200> responseDoc;
      deserializeJson(responseDoc, response);
      if (responseDoc["relay"] == "OFF") {
        digitalWrite(RELAY_PIN, LOW);
      } else {
        digitalWrite(RELAY_PIN, HIGH);
      }
    }
    http.end();
  }
  
  delay(5000); // Send data every 5 seconds
}
