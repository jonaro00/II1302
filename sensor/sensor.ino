#include "Azure.cpp"

// Arduino setup and loop main functions.

void setup()
{
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
  establishConnection();
}

void loop()
{
  if (millis() > next_telemetry_send_time_ms)
  {
    // Check if connected, reconnect if needed.
    if(!mqtt_connected())
    {
      establishConnection();
    }

    sendTelemetry();
    next_telemetry_send_time_ms = millis() + 10000;
  }

  // MQTT loop must be called to process Device-to-Cloud and Cloud-to-Device.
  mqtt_loop();
  delay(500);
}
