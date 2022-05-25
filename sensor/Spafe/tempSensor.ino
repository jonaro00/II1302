#include <SHT3x.h>

SHT3x Sensor;

float r[2];

static float *tempSensor() {
  Sensor.Begin();

  Sensor.UpdateData();
  r[0] = Sensor.GetTemperature();
  Serial.print(r[0]); //Celsius
  Serial.write("\xC2\xB0"); //The Degree symbol
  Serial.print("C");
  Serial.print(" | ");

  r[1] = Sensor.GetRelHumidity();
  Serial.print(r[1]);
  Serial.print("%");
  Serial.print(" | ");

  Serial.print(Sensor.GetAbsHumidity()); //Torr by default
  Serial.print(" Torr");
  Serial.print(" | ");

  Serial.print(Sensor.GetAbsHumidity(SHT3x::psi)); //Torr by default
  Serial.print(" psi");
  Serial.print(" | ");

  Serial.print(Sensor.GetAbsHumidity(SHT3x::Pa)); //Torr by default
  Serial.print(" Pa");

  //And other...

  Serial.print(" Tolerance: ±");
  Serial.print(Sensor.GetAbsHumTolerance(SHT3x::mH2O));
  Serial.print(" mH2O");
  

  Serial.println();

  return r;
}
