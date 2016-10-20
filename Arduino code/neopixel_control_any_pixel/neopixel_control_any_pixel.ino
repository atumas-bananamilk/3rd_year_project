#include <Adafruit_NeoPixel.h>

#define PIN A0
#define NUM_PIXELS 144

float delay_1_unconv;
float delay_2_unconv;

unsigned long delay_1;
unsigned long delay_2;

Adafruit_NeoPixel strip = Adafruit_NeoPixel(NUM_PIXELS, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  clear_pixels();

  Serial.begin(9600);
  
  delay_1_unconv = (43 / 44.0) * 1000 * 1000;
  delay_2_unconv = (1 / 44.0) * 1000 * 1000;

  delay_1 = (unsigned long) delay_1_unconv;
  delay_2 = (unsigned long) delay_2_unconv;
}

void loop() {
  clear_pixels();
  delayMicroseconds(delay_1);
  sequence();
  delayMicroseconds(delay_2);
}

void sequence(){
  for (int i = 0; i < NUM_PIXELS; i++){
    set_pixel(i, 5, 5, 5);
  }
  strip.show();
}

void set_pixel(int pixel_id, int R, int G, int B){
    strip.setPixelColor(pixel_id, strip.Color(R, G, B));
}

void clear_pixels(){
  strip.begin();

  for (int i = 0; i < NUM_PIXELS; i++){
    set_pixel(i, 0, 0, 0);
  }
  strip.show();
}

