/**
 * @brief Humidity_temperatureTest, a test to check humidity and temperature work and they write the values on serial monitor.
 * A successful test will print humidity and temperature values. 
 * @param void
 * @return void
 */


#include <SHT3x.h>
SHT3x Sensor;
void setup() {
  
  Serial.begin(19200);
  Sensor.Begin();
}

void loop() {
  Sensor.UpdateData();
  
  Serial.print(Sensor.GetTemperature()); //Celsius
  Serial.write("\xC2\xB0"); //The Degree symbol
  Serial.print("C");
  Serial.print(" | ");
  
  Serial.print(Sensor.GetRelHumidity());
  Serial.print("%");
  Serial.print(" | ");
  

  Serial.println();
  delay(333);
}
