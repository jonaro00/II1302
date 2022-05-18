#include <MQ2.h>

//change this with the pin that you use
int pin = A0;
float lpg;
float co;
float smoke;

MQ2 mq2(pin);

static float *mq2Sensor() {
mq2.begin();

  
  /*
   * read the values from the sensor, it returns
   * an array which contains 3 values.
   * 0 : LPG in ppm
   * 1 : CO in ppm
   * 2 : SMOKE in ppm
   */
  float* values= mq2.read(true); //set it false if you don't want to print the values to the Serial
  
  
  lpg = mq2.readLPG();
  //values[0] = lpg;
  
  co = mq2.readCO();
  //values[1] = co;
 
  smoke = mq2.readSmoke();
  //values[2] = smoke;


  return values;
}
