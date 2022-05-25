#include <ESP8266WiFi.h>

static void connectToWiFi(const char* ssid, const char* password)
{
  uint8_t retries = 0;
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
