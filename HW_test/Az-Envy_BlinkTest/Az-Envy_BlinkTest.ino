/**
 * @brief AZ-Envy_BlinkTest, a test to check a comunctation between AZ-Envy and the 
 * Arduino software program via FDTI Serial Adapter.
 * A successful test will let an LED should turn on and off with a delay on 1s.
 * @param void
 * @return void
 */

// the setup function runs once when you press reset or power the board
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on 
  delay(1000);                       // wait for a second
  digitalWrite(LED_BUILTIN, LOW);    // turn the LED off
  delay(1000);                       // wait for a second
}
