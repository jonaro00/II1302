/**
 * @brief ESP8266Test, a test to connect the wifi to the mobile hotspot.
 * A successful test will print "Successfully connected to BashariPhone" and an IP address. 
 * @param void
 * @return void
 */

#include <ESP8266WiFi.h>

const char* ssid = "BashariPhone";
const char* password = "wifiwifiwifi1997";
uint8_t attempts = 0;

void setup()
{
  Serial.begin(115200);
  Serial.println();
  
//Begin the connection to SSID and Password
  WiFi.begin(ssid, password); 
  Serial.print("Connecting to"); 
  Serial.print(ssid);
  Serial.println("...");


/* ESP8266WiFi status:
 *  1  No SSID Available
 *  2  Scan Completed
 *  3  Connected
 *  4  Connection Failed
 *  5  Connection Lost 
 *  6  Disconnected  
 *  255  No Shield
*/
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
}

void loop() {
  
  }
