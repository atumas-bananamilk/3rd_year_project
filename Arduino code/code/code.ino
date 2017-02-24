#include <Adafruit_NeoPixel.h>
#include <Servo.h>

#define MOTOR_PIN 9
#define LED_PIN 10
#define NUM_PIXELS 128

#define NUM_TIME_SLOTS 45

#define MAX_SPEED 70

#define R_colour 0
#define G_colour 0
#define B_colour 255

Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_PIXELS, LED_PIN, NEO_GRB + NEO_KHZ800);
Servo ESC1;
int pos = 0;
int speed;

//char command;
String command;

unsigned long rev_time = 0;
unsigned long time_started = 0;
unsigned long current_time = 0;

unsigned long time_on = 0;
unsigned long time_off = 0;

unsigned long time = 0;
unsigned long begin_on_time = 0;
unsigned long end_on_time = 0;
unsigned long begin_off_time = 0;
unsigned long end_off_time = 0;

boolean cycle_finished = true;

unsigned long iterations = 0;
unsigned long total_time = 0;
unsigned long average_rev_time = 0;

boolean turned_on_already = false;
boolean turned_off_already = true;

unsigned long slot_time = 0;
int slot = 0;
unsigned long next_slot = 0;

// PROTOCOL
// no_of_coordinates, layer, LED, slot, R, G, B, 
//                    layer, LED, slot, R, G, B

//int coordinates[6] = {0, 15, 5, 255, 0, 0};

void setup() {
  Serial.begin(9600);
  
  setup_sensor();
  setup_LEDs();
  setup_motor();
}

void loop() {
  time = micros();
  
  if (cycle_finished){
    begin_on_time = time;
    end_on_time = begin_on_time + time_on;
    
    begin_off_time = end_on_time;
    end_off_time = begin_off_time + time_off;
    
    cycle_finished = false;

    slot = 0;
    next_slot = time + slot_time;
  }

  if (time >= next_slot){
    next_slot = time + slot_time;
    slot++;
  }

//  Serial.print("SLOT: ");
//  Serial.println(slot);

  if (slot == 0 || slot == 43){
//      strip.setPixelColor(15, 255, 0, 0);
//      strip.show();

    digitalWrite(10, HIGH);
  }
  else{
//      for (int i = 0; i < NUM_PIXELS; i++){
//          strip.setPixelColor(i, 0, 0, 0);
//      }
//      strip.show();

    digitalWrite(10, LOW);
    
    if (time >= end_off_time){
      cycle_finished = true;
    }
  }
  
//  if (time >= begin_on_time && time < end_on_time){
//    turned_off_already = false;
//
//    if (!turned_on_already){
////      for (int i = 0; i < 16; i++){
////        strip.setPixelColor(i, 255, 0, 0);
////      }
////      strip.show();
//
//    digitalWrite(10, HIGH);
//
//      turned_on_already = true;
//    }
//  }
//  else{
//    turned_on_already = false;
//    
//    if (!turned_off_already){
////      for (int i = 0; i < NUM_PIXELS; i++){
////          strip.setPixelColor(i, 0, 0, 0);
////      }
////      strip.show();
//
//    digitalWrite(10, LOW);
//
//      turned_off_already = true;
//    }
//    
//    if (time >= end_off_time){
//      cycle_finished = true;
//    }
//  }

  read_serial();
}

void read_serial(){
  if (Serial.available() > 0) {
    command = Serial.readString();
    Serial.print("COMMAND: ");
    Serial.println(command);
  
    if (command.length() > 1){
      read_coordinates();
    }
    else{
      read_motor_control_commands();
    }
  }
}

void read_coordinates(){
  String rr[] = strtok(command, ",");
//  int coordinates[] = atoi(strtok(command, ","));

  int sizee = (sizeof(coordinates)/sizeof(int));
  
    Serial.print("SIZE: ");
    Serial.println(sizee);
}

void read_motor_control_commands(){
  if ( command.equals("a") ){
    Serial.println("SPEEDING UP STARTED");
    for(speed = 0; speed <= MAX_SPEED; speed += 10) {
      setSpeed(speed);
      delay(1000);
    }
    command = "q";
    Serial.println("SPEEDING UP FINISHED");
  }
  else if ( command.equals("s") ){
    Serial.println("STOP STARTED");
    for(speed = MAX_SPEED; speed > 0; speed -= 10) {
      setSpeed(speed);
      delay(1000);
    }
    setSpeed(0);
    command = "q";
    Serial.println("STOP FINISHED");
  }
}

void setup_sensor(){
  //Initialize the intterrupt pin (Arduino digital pin 2)
  attachInterrupt(0, magnet_detect, RISING);
}

//This function is called whenever a magnet/interrupt is detected by the arduino
void magnet_detect(){
  if (iterations >= 5){
    
    average_rev_time = total_time / 5;
  
    set_LED_times(average_rev_time);
    
//    Serial.print("AVERAGE TIME: ");
//    Serial.println(average_rev_time);
    
    total_time = 0;
    iterations = 0;
  }
  else{
    if (time_started == 0){
      time_started = micros();
    }
    else{
      current_time = micros();
      rev_time = current_time - time_started;
      time_started = current_time;
    }
    
      Serial.print("REV TIME: ");
      Serial.println(rev_time);

    // remove random noise
    // 50000, 61000 - neopixel
    // 60000, 68000 - normal LED
    if (rev_time > 60000 && rev_time < 68000){
      total_time += rev_time;
      iterations++;
    }
  }
  
}

void set_LED_times(unsigned long given_rev_time){
  time_on = given_rev_time / NUM_TIME_SLOTS;
  time_off = given_rev_time - time_on;

  slot_time = time_on;
  
//  Serial.print("TIME ON: ");
//  Serial.println(time_on);
//  Serial.print("TIME OFF: ");
//  Serial.println(time_off);
}

void setup_LEDs(){
  strip.begin();
  reset_LEDs();
}

void setup_motor(){
  ESC1.attach(MOTOR_PIN);
  arm();
}

void turn_on(int id_given, int R_given, int G_given, int B_given){
  strip.setPixelColor(id_given, R_given, G_given, B_given);
  strip.show();
}

void turn_off(int id_given){
  strip.setPixelColor(id_given, 0, 0, 0);
  strip.show();
}

void reset_LEDs(){
  for (int i = 0; i < NUM_PIXELS; i++){
    strip.setPixelColor(i, 0, 0, 0);
  }
  strip.show();
}

void arm(){
  setSpeed(0);
}

void setSpeed(int speed){
  int angle = map(speed, 0, 100, 0, 180);
  ESC1.write(angle);
}
