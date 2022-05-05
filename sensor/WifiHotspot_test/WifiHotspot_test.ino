#include <ESP8266WiFi.h>
#include "config.h"

const char* ssid = SSID;
const char* password = PASSWORD;
uint8_t retries = 0;

void setup()
{
  Serial.begin(115200);
  Serial.println();

  WiFi.begin(ssid, password);
  Serial.print("Connecting to");
  Serial.print(ssid);
  Serial.println("...");
  
  while (WiFi.status() != WL_CONNECTED && retries < 20)
    {
      Serial.print(".");
      retries++; 
     // Serial.print(WiFi.status());
      delay(500); 
    }
  
  Serial.println();
  if (retries==20)
    {
     Serial.print("Unable to Connect to");
     Serial.println(ssid);
      }

  if (WiFi.status() != WL_CONNECTED)
    {
    Serial.print("Successfully connected to ");
    Serial.println(ssid);
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    }
}

void loop() {
  // Maintain your WiFi connection by checking its status before performing any internet related task
  if (WiFi.status()==WL_CONNECTED)
  {
    //EP8266 is connected to WiFi Access Point. You can access Internet or any Web Server
    Serial.println("Connected...");
    delay(1000);
  }
  else
  {
    //ESP8266 is not connected to any WiFi network. You need to wait for the internet connection before you start interacting with any web server
    Serial.print("Trying to connect with ");
    Serial.print(ssid);
    while(WiFi.status()!=WL_CONNECTED)
    {
      Serial.print(".");
      delay(500);
    }
    Serial.println();
    Serial.print("Sucessfully Connected to ");
    Serial.println(ssid);
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
  }
  }
