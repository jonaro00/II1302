/**
 * @brief ESP8266_send_dataTest, a test to sends the Wi-Fi Signal Strength (RSSI) of an ESP8266 to a ThingSpeak.
 * A successful test will print "Channel write successful." and an IP address. 
 * @param void
 * @return void
 */

#define SECRET_SSID "BashariPhone"    // WiFi network name
#define SECRET_PASS "wifiwifiwifi1997"  // WiFi password

#define SECRET_CH_ID  1723777    // Channel number
#define SECRET_WRITE_APIKEY "DCGWJ3LM7DFFIUY8"   // Channel write API Key
#include "ThingSpeak.h"

unsigned long ChannelNumber = SECRET_CH_ID;
const char * WriteAPIKey = SECRET_WRITE_APIKEY;

#include <ESP8266WiFi.h>

char ssid[] = "BashariPhone";   //Network SSID (name)
char password[] = "wifiwifiwifi1997";   // Network password
uint8_t attempts = 0;
WiFiClient  client;

void setup() {
  Serial.begin(115200);
  delay(100);

  //Begin the connection to SSID and Password
  WiFi.begin(ssid, password); 
  Serial.print("Connecting to"); 
  Serial.print(ssid);
  Serial.println("...");

  
  // Check the status of the wifi
  while (WiFi.status() != WL_CONNECTED && attempts < 50)
    {
      Serial.print(".");
      attempts++; 
      delay(500); 
    }

  Serial.println();

  // Check if the number of attemps is equel to 50
  if (attempts==50)
    {
     Serial.print("Unable to Connect to");
     Serial.println(ssid);
      }
  // Check if the status if is not equel to WL_CONNECTED
  if (WiFi.status() != WL_CONNECTED)
    {
    Serial.print("Successfully connected to ");
    Serial.println(ssid);
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    }
  
  WiFi.mode(WIFI_STA);

  ThingSpeak.begin(client);
}

void loop() {

  // Signal Strength (RSSI) of Wi-Fi connection
  long rssi = WiFi.RSSI();

  // Write value to Field 1 of a ThingSpeak Channel
  int httpCode = ThingSpeak.writeField(ChannelNumber, 1, rssi, WriteAPIKey);

  if (httpCode == 200) {
    Serial.println("Channel write successful.");
  }
  else {
    Serial.println("Problem writing to channel. HTTP error code " + String(httpCode));
  }

  // Wait 20 seconds to update the channel again
  delay(20000);
}
