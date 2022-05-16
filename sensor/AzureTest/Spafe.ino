#include "AzureTest.h"
#include "MQ2.h"
#include "tempSensor.h"

// Arduino setup and loop main functions.
float *mq2array;

void setup()
{
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
  establishConnection();

 
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
   

   mq2array = mq2Sensor();
   float mq2array2[3];
   
    for(int i=0;i<3;i++)  
    {  
        mq2array[i] = mq2array[i];
        Serial.println(mq2array2[i]);  
    }  
  tempSensor();
  
    sendTelemetry();
    next_telemetry_send_time_ms = millis() + TELEMETRY_FREQUENCY_MILLISECS;
  }

  // MQTT loop must be called to process Device-to-Cloud and Cloud-to-Device.
  mqtt_client.loop();
  delay(5000);
}
