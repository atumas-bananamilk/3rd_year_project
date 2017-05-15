/*
  Creator: Aivaras Tumas
  The University of Manchester
  School of Computer Science
  3rd Year Project
*/
/* 
  --------------------------------------------------------------------
  PROTOCOL (DATA RECEIVED IS ENCODED LIKE THIS)
    total_no_of_layers, layer_width, colour_R, colour_G, colour_B, 
                        layer_width, colour_R, colour_G, colour_B, 
                        layer_width, colour_R, colour_G, colour_B...
  --------------------------------------------------------------------
*/

#include <Adafruit_NeoPixel.h>
#include <Servo.h>

#define MOTOR_PIN 9
#define LED_PIN 3
#define MAX_SPEED 70
#define NUM_PIXELS 144
#define NUM_LAYER_PIXELS 16

#define NUM_SLOTS 45
#define R_colour 0
#define G_colour 0
#define B_colour 255

Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_PIXELS, LED_PIN, NEO_GRB + NEO_KHZ800);

Servo ESC;
int speed;

String command;

int no_of_layers;
struct layer *layers;

/* DEPRECATED FROM HERE: not being used in the newest version of the project. */
boolean cycle_finished = true;

unsigned long time = 0;
unsigned long rev_time = 0;
unsigned long time_started = 0;
unsigned long current_time = 0;
unsigned long time_on = 0;
unsigned long time_off = 0;
unsigned long begin_on_time = 0;
unsigned long end_on_time = 0;
unsigned long begin_off_time = 0;
unsigned long end_off_time = 0;

unsigned long iterations = 0;
unsigned long total_time = 0;
unsigned long average_rev_time = 0;

boolean turned_on_already = false;
boolean turned_off_already = true;

int slot = 0;
unsigned long slot_time = 0;
unsigned long next_slot = 0;
/* DEPRECATED UNTIL HERE: not being used in the newest version of the project. */

void setup() {
  Serial.begin(9600);
  
  setup_sensor();
  setup_LEDs();
  setup_motor();
}

// struct holds info about a layer
struct layer
{
  int width;  // [0 -  15] 0 - LED closest to the center, 15 - furthest
  int r;      // [0 - 255]
  int g;      // [0 - 255]
  int b;      // [0 - 255]
};

void loop() {

  /* DEPRECATED FROM HERE: not being used in the newest version of the project. */
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
  /* DEPRECATED UNTIL HERE: not being used in the newest version of the project. */

  read_serial();
}

void read_serial(){
  if (Serial.available() > 0) {
    command = Serial.readString();
    Serial.print("COMMAND: ");
    Serial.println(command);
  
    // read encoded pixels
    if (command.length() > 1){
      read_pixels();
    }
    // read encoded motor control commands
    else{
      read_motor_control_commands();
    }
  }
}

void read_pixels(){
   char command_char_array[command.length()];
   command.toCharArray(command_char_array, command.length() + 1);
  
   const char delimiter[2] = ",";
   char *element;
   
   element = strtok(command_char_array, delimiter);
   no_of_layers = atoi(element);

   // create an array of structs (struct holds info about a layer)
   layers = malloc(no_of_layers * (sizeof(struct layer)));

   int curr_pixel_number = 0;
   int curr_pixel = 0;
   
   element = strtok(NULL, delimiter);
   while (element != NULL)
   {
      switch (curr_pixel_number){
        case 0: layers[curr_pixel].width = atoi(element); break;
        case 1: layers[curr_pixel].r = atoi(element); break;
        case 2: layers[curr_pixel].g = atoi(element); break;
        case 3: layers[curr_pixel].b = atoi(element); break;
      }

      curr_pixel_number++;

      if (curr_pixel_number > 3){
        curr_pixel_number = 0;
        curr_pixel++;
      }
      
      element = strtok(NULL, delimiter);
  }
  Serial.println("ALL ENCODED INFO READ");

  turn_on_required_leds();
  start_motor();
}

void turn_on_required_leds(){
  for (int curr_layer = 0; curr_layer < no_of_layers; curr_layer++){
    for (int j = 0; j < layers[curr_layer].width; j++){
      // turn on every LED until width given for each layer
      turn_on_led(j + (curr_layer * NUM_LAYER_PIXELS), layers[curr_layer].r, layers[curr_layer].g, layers[curr_layer].b);
    }
  }
  strip.show();
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

// Mostly used for testing in isolation from the web-app
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

void setup_LEDs(){
  strip.begin();
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

void set_brightness(int brightness){
  // brightness: 0 - 255
  strip.setBrightness(brightness);
}

/*
  --------------------------------------------------------------------
  DEPRECATED CODE
    From here on follow all the unused functions which were used 
    before the requirements of the project changed.

  Current idea (all the code above): create a shape of 9 layers with 
    different widths and colours. No collision detection. This info 
    would then be decoded by Arduino by statically turning on and 
    leaving the LEDs so you see a cylindrical shape without interacting 
    with the LEDs (turning them on/off periodically).

  Initial idea (code above + code below): the decoded info would tell 
    the Arduino when to turn on/off the LEDs while spinning. Arduino 
    would calculate the on/off times by checking the revolution speed 
    and diving it to 45 time slots. 1 slot - ON, other 44 slots - OFF. 
    Everything worked, but the equirements changed because of the 
    issues (hardware) with the LED refresh rates (unstable & too slow).
  ---------------------------------------------------------------------
*/

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
    if (rev_time > 9000 && rev_time < 2000000){
      total_time += rev_time;
      iterations++;
    }
  }
}

void set_LED_times(unsigned long given_rev_time){
  time_on = given_rev_time / NUM_SLOTS;
  time_off = given_rev_time - time_on;
  slot_time = time_on;
}