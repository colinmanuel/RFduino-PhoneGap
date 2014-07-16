/*
This RFduino sketch demonstrates a full bi-directional Bluetooth Low
Energy 4 connection between an iPhone application and an RFduino.

This sketch works with the rfduinoLedButton iPhone application.

The button on the iPhone can be used to turn the green led on or off.
The button state of button 1 is transmitted to the iPhone and shown in
the application.
*/

#include <RFduinoBLE.h>

// pin 3 on the RGB shield is the red led
// (can be turned on/off from the iPhone app)
int motorOne = 3;
int motorTwo = 4;

// pin 5 on the RGB shield is button 1
// (button press will be shown on the iPhone app)
int button = 5;

// debounce time (in ms)
int debounce_time = 10;

// maximum debounce timeout (in ms)
int debounce_timeout = 100;

// set default button state from phone to RFduino
int buttonState = 0;

void setup() {
  // led turned on/off from the iPhone app
  pinMode(motorOne, OUTPUT);
  pinMode(motorTwo, OUTPUT);

  // button press will be shown on the iPhone app)
  pinMode(button, INPUT);

  // this is the data we want to appear in the advertisement
  // (the deviceName length plus the advertisement length must be <= 18 bytes
  RFduinoBLE.advertisementData = "ledbtn";
  
  // start the BLE stack
  RFduinoBLE.begin();
}

int debounce(int state)
{
  int start = millis();
  int debounce_start = start;
  
  while (millis() - start < debounce_timeout)
    if (digitalRead(button) == state)
    {
      if (millis() - debounce_start >= debounce_time)
        return 1;
    // Serial.print(state);
      
    }
    else
      debounce_start = millis();

  return 0;
}

int delay_until_button(int state)
{
    // Serial.print(state);
  // set button edge to wake up on
  if (state)
    RFduino_pinWake(button, HIGH);
  else
    RFduino_pinWake(button, LOW);
    
  do
    // switch to lower power mode until a button edge wakes us up
    RFduino_ULPDelay(INFINITE);
  while (! debounce(state));
  
  // if multiple buttons were configured, this is how you would determine what woke you up
  if (RFduino_pinWoke(button))
  {
    // Serial.write(button);
    // execute code here
    RFduino_resetPinWake(button);
  }
}

void loop() {
  delay_until_button(HIGH);
  RFduinoBLE.send(1);
  
  delay_until_button(LOW);
  RFduinoBLE.send(0);
}

void RFduinoBLE_onDisconnect()
{
  // don't leave the led on if they disconnect
  digitalWrite(motorOne, LOW);
  digitalWrite(motorTwo, LOW);
}

void RFduinoBLE_onReceive(char *data, int len)
{
    buttonState = buttonState + 1;
    if(buttonState > 1) {
        buttonState = 0;
    }
  
  /*
  convert RFduino PhoneGap string into an integer
  this will allow the RFduino to read the iPhone app's slider to 
  determine which pin to activate
  */
  /*  
  int rfduinoPin;
  rfduinoPin = atoi(&data[0]);
  motorOne = rfduinoPin;
  */



  // drive motor 1 or same motor clockwise
  if (data[0] == '1' && buttonState == 1)
    digitalWrite(motorOne, HIGH);
   else 
    digitalWrite(motorOne, LOW);
  
  // drive motor 2 or counter clockwise same motor
  if (data[0] == '2' && buttonState == 1){
    digitalWrite(motorTwo, HIGH);
    digitalWrite(motorOne, HIGH);
  } else {
    digitalWrite(motorOne, LOW);
    digitalWrite(motorTwo, LOW);
}}





















