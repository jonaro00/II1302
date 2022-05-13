#include "Azure.h"
#include "MQ2.h"
#include "TempSensor.h"

// Arduino setup and loop main functions.

void setup()
{
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
  establishConnection();
  while(1){
  mq2Sensor();
  tempSensor();
  delay(5000);
  }
 
}

void loop()
{
  if (millis() > next_telemetry_send_time_ms)
  {
    // Check if connected, reconnect if needed.
    if(!mqtt_client.connected())
    {
      establishConnection();
    }

    sendTelemetry();
    next_telemetry_send_time_ms = millis() + TELEMETRY_FREQUENCY_MILLISECS;
  }

  // MQTT loop must be called to process Device-to-Cloud and Cloud-to-Device.
  mqtt_client.loop();
  delay(500);
}