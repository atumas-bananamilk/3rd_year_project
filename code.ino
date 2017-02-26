#include <Adafruit_NeoPixel.h>
#include <Servo.h>

#define MOTOR_PIN 9
#define LED_PIN 10
#define NUM_PIXELS 128

#define NUM_SLOTS 45

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
int *pixel_data;
int no_of_pixels;

struct pixel *pixels;

void setup() {
  Serial.begin(9600);
  
  setup_sensor();
  setup_LEDs();
  setup_motor();
}

struct pixel
{
  int layer; // [0 -   8] 0 - top layer, 8 - bottom layer
  int led;   // [0 -  15] 0 - LED closest to center, 15 - furthest
  int slot;  // [0 -  45]
  int r;     // [0 - 255]
  int g;     // [0 - 255]
  int b;     // [0 - 255]
};

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

  // turn all off
  for (int i = 0; i < NUM_PIXELS; i++){
    strip.setPixelColor(i, 0, 0, 0);
  }

    // turn some on
//    for (int i = 0; i < no_of_pixels; i++){
//      if ( slot == pixels[i].slot ){
//        strip.setPixelColor( get_pixel_id( pixels[i].layer, pixels[i].led ), 
//                             pixels[i].r, pixels[i].g, pixels[i].b );
//      }
//    }
    
      // if slot == 0:
          // if layer == 0:
            // if has something on with slot 0 <- turn on
          // if layer == 1:
            // if has something on with slot 5 <- turn on
          // ...
      // if slot == 1:
          // if layer == 0:
            // if has something on with slot 1 <- turn on
          // if layer == 1:
            // if has something on with slot 6 <- turn on
          // ...
     // if slot == 2:
          // if layer == 0:
            // if has something on with slot 2 <- turn on
          // if layer == 1:
            // if has something on with slot 7 <- turn on
          // ...

  for (int i = 0; i < NUM_SLOTS; i++){
    if (slot == i){
      check(i);
    }
  }

//      switch(slot){
//        case 0:{ check(0); break; }
//        case 1:{ check(1); break; }
//        case 2:{ check(2); break; }
//        case 3:{ check(3); break; }
//        case 4:{ check(4); break; }
//        case 5:{ check(5); break; }
//        case 6:{ check(6); break; }
//        case 7:{ check(7); break; }
//        case 8:{ check(8); break; }
//        case 9:{ check(9); break; }
//        case 10:{ check(10); break; }
//        case 11:{ check(11); break; }
//        case 12:{ check(12); break; }
//        case 13:{ check(13); break; }
//        case 14:{ check(14); break; }
//        case 15:{ check(15); break; }
//        case 16:{ check(16); break; }
//        case 17:{ check(17); break; }
//        case 18:{ check(18); break; }
//        case 19:{ check(19); break; }
//        case 20:{ check(20); break; }
//        case 21:{ check(21); break; }
//        case 22:{ check(22); break; }
//        case 23:{ check(23); break; }
//        case 24:{ check(24); break; }
//        case 25:{ check(25); break; }
//        case 26:{ check(26); break; }
//        case 27:{ check(27); break; }
//        case 28:{ check(28); break; }
//        case 29:{ check(29); break; }
//        case 30:{ check(30); break; }
//        case 31:{ check(31); break; }
//        case 32:{ check(32); break; }
//        case 33:{ check(33); break; }
//        case 34:{ check(34); break; }
//        case 35:{ check(35); break; }
//        case 36:{ check(36); break; }
//        case 37:{ check(37); break; }
//        case 38:{ check(38); break; }
//        case 39:{ check(39); break; }
//        case 40:{ check(40); break; }
//        case 41:{ check(41); break; }
//        case 42:{ check(42); break; }
//        case 43:{ check(43); break; }
//        case 44:{ check(44); break; }

    strip.show();
    
  if (slot == 0){
    if (time >= end_off_time){
      cycle_finished = true;
    }
  }

//  if (slot == 0 || slot == 43){
////      strip.setPixelColor(15, 255, 0, 0);
////      strip.show();
//
//    digitalWrite(10, HIGH);
//  }
//  else{
////      for (int i = 0; i < NUM_PIXELS; i++){
////          strip.setPixelColor(i, 0, 0, 0);
////      }
////      strip.show();
//
//    digitalWrite(10, LOW);
//    
//    if (time >= end_off_time){
//      cycle_finished = true;
//    }
//  }

  read_serial();
}

void check(int incr){
  for (int i = 0; i < no_of_pixels; i++){
    if ( pixels[i].layer == 0 && pixels[i].slot == (0 + incr)%NUM_SLOTS ){
      strip.setPixelColor( get_pixel_id( 0, pixels[i].led ), pixels[i].r, pixels[i].g, pixels[i].b );
    }
    else if ( pixels[i].layer == 1 && pixels[i].slot == (5 + incr)%NUM_SLOTS ){
      strip.setPixelColor( get_pixel_id( 1, pixels[i].led ), pixels[i].r, pixels[i].g, pixels[i].b );
    }
    else if ( pixels[i].layer == 2 && pixels[i].slot == (10 + incr)%NUM_SLOTS ){
      strip.setPixelColor( get_pixel_id( 2, pixels[i].led ), pixels[i].r, pixels[i].g, pixels[i].b );
    }
    else if ( pixels[i].layer == 3 && pixels[i].slot == (15 + incr)%NUM_SLOTS ){
      strip.setPixelColor( get_pixel_id( 3, pixels[i].led ), pixels[i].r, pixels[i].g, pixels[i].b );
    }
    else if ( pixels[i].layer == 4 && pixels[i].slot == (20 + incr)%NUM_SLOTS ){
      strip.setPixelColor( get_pixel_id( 4, pixels[i].led ), pixels[i].r, pixels[i].g, pixels[i].b );
    }
    else if ( pixels[i].layer == 5 && pixels[i].slot == (25 + incr)%NUM_SLOTS ){
      strip.setPixelColor( get_pixel_id( 5, pixels[i].led ), pixels[i].r, pixels[i].g, pixels[i].b );
    }
    else if ( pixels[i].layer == 6 && pixels[i].slot == (30 + incr)%NUM_SLOTS ){
      strip.setPixelColor( get_pixel_id( 6, pixels[i].led ), pixels[i].r, pixels[i].g, pixels[i].b );
    }
    else if ( pixels[i].layer == 7 && pixels[i].slot == (35 + incr)%NUM_SLOTS ){
      strip.setPixelColor( get_pixel_id( 7, pixels[i].led ), pixels[i].r, pixels[i].g, pixels[i].b );
    }
    else if ( pixels[i].layer == 8 && pixels[i].slot == (40 + incr)%NUM_SLOTS ){
      strip.setPixelColor( get_pixel_id( 8, pixels[i].led ), pixels[i].r, pixels[i].g, pixels[i].b );
    }
  }
}

void read_serial(){
  if (Serial.available() > 0) {
    command = Serial.readString();
    Serial.print("COMMAND: ");
    Serial.println(command);
  
    if (command.length() > 1){
      read_pixels();
    }
    else{
      read_motor_control_commands();
    }
  }
}

int get_pixel_id(int layer, int led){
  return (layer * 16) + led;
}

void read_pixels(){
   char command_char_array[command.length()];
   command.toCharArray(command_char_array, command.length() + 1);
  
   const char delimiter[2] = ",";
   char *number;
   
   number = strtok(command_char_array, delimiter);
   no_of_pixels = atoi(number);

//   struct pixel pixels[no_of_pixels];
   pixels = malloc(no_of_pixels * (sizeof(struct pixel)));

   int curr_pixel_number = 0;
   int curr_pixel = 0;
   
   number = strtok(NULL, delimiter);
   while (number != NULL)
   {
      switch (curr_pixel_number){
        case 0: pixels[curr_pixel].layer = atoi(number); break;
        case 1: pixels[curr_pixel].led = atoi(number); break;
        case 2: pixels[curr_pixel].slot = atoi(number); break;
        case 3: pixels[curr_pixel].r = atoi(number); break;
        case 4: pixels[curr_pixel].g = atoi(number); break;
        case 5: pixels[curr_pixel].b = atoi(number); break;
      }

      curr_pixel_number++;

      if (curr_pixel_number > 5){
        curr_pixel_number = 0;
        curr_pixel++;
      }
      
      number = strtok(NULL, delimiter);
   }
   
//  Serial.print("SIZE: ");
//  Serial.println(no_of_pixels);
//
//  for (int i = 0; i < no_of_pixels; i++){
//    Serial.println("PIXEL: ");
//    Serial.println(pixels[i].layer);
//    Serial.println(pixels[i].led);
//    Serial.println(pixels[i].slot);
//    Serial.println(pixels[i].r);
//    Serial.println(pixels[i].g);
//    Serial.println(pixels[i].b);
//  }

    Serial.println("READ ALL PIXELS");
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
  time_on = given_rev_time / NUM_SLOTS;
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