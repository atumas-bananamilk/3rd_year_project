#include <Adafruit_NeoPixel.h>

//#include <Adafruit_DotStar.h>
#include <Servo.h>

// PROTOCOL
// no_of_coordinates, layer, LED, slot, R, G, B, 
//                    layer, LED, slot, R, G, B

#define MOTOR_PIN 9
#define LED_PIN 3
#define NUM_PIXELS 144
#define NUM_LAYER_PIXELS 16

#define NUM_SLOTS 45

#define MAX_SPEED 70

#define R_colour 0
#define G_colour 0
#define B_colour 255

Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_PIXELS, LED_PIN, NEO_GRB + NEO_KHZ800);

Servo ESC;
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
int *pixel_data;
int no_of_pixels;

struct pixel *pixels;

boolean test = true;
boolean on = false;

void setup() {
  Serial.begin(9600);
  
  setup_sensor();
  setup_LEDs();
  setup_motor();
}

struct pixel
{
  int width;  // [0 -  15] 0 - LED closest to center, 15 - furthest
  int r;      // [0 - 255]
  int g;      // [0 - 255]
  int b;      // [0 - 255]
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

  if (time >= end_off_time){
    cycle_finished = true;
  }

  read_serial();
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

void turn_on_required_leds(){
  for (int curr_layer = 0; curr_layer < no_of_pixels; curr_layer++){
    for (int j = 0; j < pixels[curr_layer].width; j++){
      // turn on every LED until width
//      if (curr_layer == 0 || curr_layer == no_of_pixels - 1){
        turn_on_led(j + (curr_layer * NUM_LAYER_PIXELS), pixels[curr_layer].r, pixels[curr_layer].g, pixels[curr_layer].b);
//      }
    }
  }
  strip.show();
}

void read_pixels(){
   char command_char_array[command.length()];
   command.toCharArray(command_char_array, command.length() + 1);
  
   const char delimiter[2] = ",";
   char *element;
   
   element = strtok(command_char_array, delimiter);
   no_of_pixels = atoi(element);

   pixels = malloc(no_of_pixels * (sizeof(struct pixel)));

   int curr_pixel_number = 0;
   int curr_pixel = 0;
   
   element = strtok(NULL, delimiter);
   while (element != NULL)
   {
      switch (curr_pixel_number){
        case 0: pixels[curr_pixel].width = atoi(element); break;
        case 1: pixels[curr_pixel].r = atoi(element); break;
        case 2: pixels[curr_pixel].g = atoi(element); break;
        case 3: pixels[curr_pixel].b = atoi(element); break;
      }

      curr_pixel_number++;

      if (curr_pixel_number > 3){
        curr_pixel_number = 0;
        curr_pixel++;
      }
      
      element = strtok(NULL, delimiter);
   }
   Serial.println("ALL PIXELS READ");

//    Serial.print("PIXELS: ");
//    Serial.println(no_of_pixels);
//
//  for (int i = 0; i < no_of_pixels; i++){
//    Serial.print("WIDTH: ");
//    Serial.print(pixels[i].width);
//    Serial.print(", R: ");
//    Serial.print(pixels[i].r);
//    Serial.print(", G: ");
//    Serial.print(pixels[i].g);
//    Serial.print(", B: ");
//    Serial.println(pixels[i].b);
//  }

  turn_on_required_leds();
  start_motor();
}

void start_motor(){
  Serial.println("Speeding up started.");
  for(speed = 0; speed <= MAX_SPEED; speed += 10) {
    setSpeed(speed);
    delay(1000);
  }
  Serial.println("Speeding up finished.");
}

void stop_motor(){
  Serial.println("Slowing down started");
  for(speed = MAX_SPEED; speed > 0; speed -= 10) {
    setSpeed(speed);
    delay(600);
  }
  setSpeed(0);
  Serial.println("Slowing down finished.");
}

void read_motor_control_commands(){
  if ( command.equals("a") ){
    start_motor();
    command = "q";
  }
  else if ( command.equals("s") ){
    stop_motor();
    command = "q";
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
    
    total_time = 0;
    iterations = 0;
    time_started = 0;
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

    // remove random noise
    if (test){
      if (rev_time > 9000 && rev_time < 2000000){
        total_time += rev_time;
        iterations++;
      }
    }
  }
}

void set_LED_times(unsigned long given_rev_time){
  time_on = given_rev_time / NUM_SLOTS;
  time_off = given_rev_time - time_on;
  slot_time = time_on;
}

void setup_LEDs(){
  strip.begin();
//  strip.setBrightness(64);
  reset_LEDs();
}

void setup_motor(){
  ESC.attach(MOTOR_PIN);
  arm();
}

void turn_on_led(int id_given, int R_given, int G_given, int B_given){
  strip.setPixelColor(id_given, R_given, G_given, B_given);
}

void turn_off_led(int id_given){
  strip.setPixelColor(id_given, 0, 0, 0);
}

void reset_LEDs(){
  strip.show();
}

void arm(){
  setSpeed(0);
}

void setSpeed(int speed){
  int angle = map(speed, 0, 100, 0, 180);
  ESC.write(angle);
}