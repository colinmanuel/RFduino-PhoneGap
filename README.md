# RFduino Motor Control

This is a small project to control 12v motors using the [RFduino](http://rfduino.com/ "RFduino") and Don Coleman's [RFduino Plugin for PhoneGap](https://github.com/don/cordova-plugin-rfduino/ "RFduino Plugin for PhoneGap"). 

The project goal is to use PhoneGap to build an iPhone app that will control the speed and direction of a 12v motor, or any device that can be controlled by an Arduino pin. The initial prototype will control LED color and brightness as a proxy for motor control using a motor driver.

### TODO:
-  ~~Communicate with RFduino~~
-  ~~Toggle 1 output correctly (Blue LED)~~
-  ~~Drive and stop motor~~
-  ~~Toggle 2 outputs correctly (Blue and Green LED)~~
- Make 2 LEDs from 2 pins turn on and off simultaneously
- Add PWM control to one output (Blue LED)
- Add PWM control to two outputs (Blue and Green LED)
- Drive, stop and reverse motor
- Control motor with variable speed in both directions
- Send motor state data from RFduino to iPhone
- Redesign iPhone interface / remove JQM
- Automatically select closest BLE signal

