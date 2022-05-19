/**
 * @brief MQ2_sensorTest, a test to verify the gas sensor. 
 * The gases that will be discovered are Liquified Petroleum Gas (LPG), Carbon monoxide (CO) and Smok. 
 * A successful test will print on serial monitor the values of the gases.
 * @param void
 * @return void
 */

#include <MQ2.h>
  
  int pin = A0; //Provides analog output voltage
  MQ2 mq2(pin);
  
  void setup(){
    mq2.begin();
    while (1)
  {
    
    float* values = mq2.read(true); //true to print the values in the Serial
  
    float lpg = mq2.readLPG();
    
    float co = mq2.readCO();
    
    float smoke = mq2.readSmoke();
  
    Serial.println (lpg);
    Serial.println (co);
    Serial.println (smoke);
  
    delay(10000);
  }
 }
