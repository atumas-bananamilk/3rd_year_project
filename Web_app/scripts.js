var scene;
var camera;
var renderer;

var group;

var isDragging = false;

var ROTATION_X = 0;
var ROTATION_Y = 0;
var CAMERA_X_DEFAULT = 43;
var CAMERA_Y_DEFAULT = 15;
var CAMERA_Z_DEFAULT = 0;
var CAMERA_X = 0;
var CAMERA_Y = 0;
var CAMERA_Z = 0;

var cylinder;

var shapes = [];
var coordinates = [];

var line;

var lines = [];

var NO_OF_LAYERS = 3;
var NO_OF_TIME_SLOTS = 45;
var NO_OF_PIXELS_IN_LAYER = 15 * NO_OF_TIME_SLOTS + 1;

function mesh_transparent(geometry, colour){
var material = new THREE.MeshBasicMaterial( { color: colour, wireframe: true, transparent: true, opacity: 0.1 } );
return new THREE.Mesh( geometry, material );
}

function mesh_empty(geometry){
var material = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0 } );
return new THREE.Mesh( geometry, material );
}

function mesh(geometry, color_1, color_2){
    //var material = new THREE.MeshNormalMaterial();
    var material = new THREE.MeshBasicMaterial( {color: color_1, overdraw: 0.5} );
    material.side = THREE.DoubleSide;
    var wire_material = new THREE.MeshBasicMaterial( {color: color_2, overdraw: 0.5} );
    wire_material.wireframe = true;

    return THREE.SceneUtils.createMultiMaterialObject(geometry, [material, wire_material]);
}

function set_random_colours(geometry){
for ( var i = 0; i < geometry.faces.length; i += 2 ) {
var hex = Math.random() * 0xffffff;
geometry.faces[ i ].color.setHex( hex );
geometry.faces[ i + 1 ].color.setHex( hex );
}
}

function random_colour(geometry){
return Math.random() * 0xffffff;
}

function create_new_cube(){
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var cube = mesh(geometry, 0xAA0000, 0xFFFFFF);

cube.position.x = 0;
cube.position.y = 0;
cube.position.z = 0;

scene.add( cube );
}

function create_outer_cylinder(colour, up_size, down_size, height, segments){

var geometry = new THREE.CylinderGeometry( up_size, down_size, height, segments, 1, false);
cylinder = mesh_transparent(geometry, colour);

scene.add(cylinder);
return cylinder;
}

function create_cylinder(transparent, colour, up_size, down_size, height, segments){

var geometry = new THREE.CylinderGeometry( up_size, down_size, height, segments, 1, false);
var cylinder = (transparent) ? mesh_transparent(geometry, colour) : mesh(geometry, colour, 0xFFFFFF);;

scene.add(cylinder);
return cylinder;
}

function create_new_ring(){
var geometry = new THREE.TorusGeometry( 3, 0.5, 20, 2999 );
  ring = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
scene.add(ring);
}

function create_new_line(){
line = create_cylinder(false, 0x0000ff, 0.2, 0.2, 16, 4);
line.position.x = 30;
line.position.y = 4;
line.position.z = 0;
line.rotation.z = 0;//Math.PI / 180//3.12;

lines.push(line);
}

function is_colliding(object_1, object_2){
var object_box_1 = new THREE.Box3().setFromObject(object_1);
var object_box_2 = new THREE.Box3().setFromObject(object_2);

if ( object_box_1.intersectsBox(object_box_2) ){
return true;
}
return false;
}

function check_shape_collisions(object){
for (var i = 0; i < shapes.length; i++){
if ( is_colliding(shapes[i], object) ){
//shapes[i].material.color.setHex( 0x0000FF );
var material = new THREE.MeshBasicMaterial( {color: 0x0000FF, overdraw: 0.5} );
    material.side = THREE.DoubleSide;
    shapes[i].material = material;

    add_coordinate(i);
}
}
}

function add_coordinate(coordinate){
coordinates.push(coordinate);
}

function show_result(){
var current_line = lines[ lines.length - 1 ];
check_shape_collisions(current_line);
}

function clear_result(){
for (var i = 0; i < shapes.length; i++){
var material = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0 } );
shapes[i].material = material;
}
coordinates = [];
}

function create_pixel(coordinate){
var layer = parseInt( coordinate / NO_OF_PIXELS_IN_LAYER );
var led;

// center
if ( coordinate == (15 * NO_OF_TIME_SLOTS) * (layer + 1) + layer ){
led = layer * 16;
}
// other pixels
else{
led = (layer * 16) + ( 15 - ((coordinate - layer) % 15) );
}

var slot = (coordinate % NO_OF_PIXELS_IN_LAYER ) % NO_OF_TIME_SLOTS;




var r = 255;
var g = 0;
var b = 0;

var pixel = {
layer: layer,
led: led,
slot: slot,
r: r,
g: g,
b: b
};

return pixel;
}

function generate_coordinates(){
// var ss = "";
// for (var i = 0; i < coordinates.length; i++){
// ss += coordinates[i];
// ss += ", ";
// }
// alert(ss);

// 45 * Math.PI / 180      // Rotates  45 degrees per frame

var ss = "";
var pixel;

for (var i = 0; i < coordinates.length; i++){
pixel = create_pixel( coordinates[i] );

// ss += coordinates[i] + ", ";

// ss += "ID: " + coordinates[i];
ss += " LAYER: " + pixel.layer;
ss += " LED: " + pixel.led;
ss += " SLOT: " + pixel.slot + "\n";
// ss += " R: " + pixel.r;
// ss += " G: " + pixel.g;
// ss += " B: " + pixel.b;
}
alert(ss);
}

function send_coordinates(){
var ss = "";
for (var i = 0; i < coordinates.length; i++){
ss += coordinates[i];
ss += ", ";
}
send_data_to_arduino(ss);
}

function send_data_to_arduino(coordinates_given){
coordinates_given = "nice";

$.ajax({
   url: './server.php',
   type: 'POST',
   data: {coordinates_given: coordinates_given},
   success: function( response ){
   	alert("SUCCESS: "+response);
   },
   error: function( response ){
   	alert("ERROR: "+response);
   }
});
}

function update_length(){
lines[ lines.length - 1 ].scale.y = document.getElementById("new_line_length").value;
}

function update_coordinate(coordinate){
if ( coordinate == "X" ){
lines[ lines.length - 1 ].position.x = document.getElementById("new_line_X").value;
}
else if ( coordinate == "Y" ){
lines[ lines.length - 1 ].position.y = document.getElementById("new_line_Y").value;
}
else{
lines[ lines.length - 1 ].position.z = document.getElementById("new_line_Z").value;
}
}

function rotate_line(axis){
if ( axis == "X" ){
lines[ lines.length - 1 ].rotation.x = document.getElementById("rotate_X").value;
}
else if ( axis == "Y" ){
lines[ lines.length - 1 ].rotation.y = document.getElementById("rotate_Y").value;
}
else{
lines[ lines.length - 1 ].rotation.z = document.getElementById("rotate_Z").value;
}
}

function create_new_shape(short, long, colour){

var size = 2;
// var short = 1.9;//1
// var long = 2.1;//1.1

var points = [
// X, Y, Z
   new THREE.Vector3( 0, 0, 0 ),
   new THREE.Vector3( 0, 0, short ),
   new THREE.Vector3( size, 0, 0 ),
   new THREE.Vector3( size, 0, long ),
   new THREE.Vector3( 0, size, 0 ),
   new THREE.Vector3( 0, size, short ),
   new THREE.Vector3( size, size, 0 ),
   new THREE.Vector3( size, size, long ),

   new THREE.Vector3( 0, 0, -short ),
   new THREE.Vector3( size, 0, -long ),
   new THREE.Vector3( 0, size, -short ),
   new THREE.Vector3( size, size, -long )
];

var geometry = new THREE.ConvexGeometry( points );

//var shape = mesh(geometry, colour, 0xFFFFFF);
var shape = mesh_transparent(geometry, colour);
//var shape = mesh_empty(geometry);
shape.position.x = 0;
shape.position.y = 0;
shape.position.z = 0;

return shape;
}

function draw_shapes(no_of_shapes, position_y, rotation_y){

var shape;
var colour = 0xFFFF00;
var SUB_SHORT = 0.075;
var short_side;
var long_side = 2.1;
short_side = long_side - SUB_SHORT;

var distance_from_center = 1;
var DISTANCE = 2;
var ROW = 14;

group = new THREE.Object3D();

for (var i = 0; i < no_of_shapes; i++){
shape = create_new_shape(short_side, long_side, colour);
long_side = short_side;
short_side -= SUB_SHORT;

shapes.push(shape);

if (i == no_of_shapes - 1){
shape.position.x = distance_from_center;
}
else{
shape.position.x = distance_from_center + DISTANCE * ROW;
ROW--;
}

group.add(shape);
}

group.rotation.y = rotation_y;
group.position.y = position_y;
scene.add( group );
}

function draw_environment(){
// draw outer cylinder
var outer_cylinder = create_outer_cylinder(0xAA0000, 31, 31, NO_OF_LAYERS * 2, 45);
outer_cylinder.position.y = -NO_OF_LAYERS;

// 90 degrees - 1.5686
var ROTATION_ANGLE = 0.13965;//0.1426
var rotation_y;
var POSITION_ADD = -2;
var position_y = -2;

var cylinder_position_y = -1;

for (var k = 0; k < NO_OF_LAYERS; k++){

rotation_y = 0;
for (var i = 0; i < NO_OF_TIME_SLOTS; i++){
draw_shapes( 15, position_y, rotation_y );
rotation_y += ROTATION_ANGLE;
}

position_y += POSITION_ADD;

// draw 1 central cylinder
var cylinder = create_cylinder(true, 0xFFFF00, 1, 1, 2, 32);
cylinder.position.y = cylinder_position_y;
cylinder_position_y += POSITION_ADD;
shapes.push(cylinder);
}

// position_y = -1;

// // draw central cylinders
// for (var i = 0; i < NO_OF_LAYERS; i++){
// var cylinder = create_cylinder(true, 0xFFFF00, 1, 1, 2, 32);
// cylinder.position.y = position_y;
// position_y += POSITION_ADD;
// shapes.push(cylinder);
// }
}

function setup_slider(slider_id, default_val, min_val, max_val, step, /*updated_div_id,*/ line_property_to_update){

  $( function() {
    $( slider_id ).slider({
      value: default_val,
      min: min_val,
      max: max_val,
      step: step,
      slide: function( event, ui ) {
        // $( updated_div_id ).val( ui.value );

        if (line_property_to_update == "length"){
        lines[ lines.length - 1 ].scale.y = ui.value;
        }
        else if (line_property_to_update == "position_X"){
        lines[ lines.length - 1 ].position.x = ui.value;
        }
        else if (line_property_to_update == "position_Y"){
        lines[ lines.length - 1 ].position.y = ui.value;
        }
        else if (line_property_to_update == "position_Z"){
        lines[ lines.length - 1 ].position.z = ui.value;
        }
        else if (line_property_to_update == "rotate_X"){
        lines[ lines.length - 1 ].rotation.x = ui.value;
        }
        else if (line_property_to_update == "rotate_Y"){
        lines[ lines.length - 1 ].rotation.y = ui.value;
        }
        else if (line_property_to_update == "rotate_Z"){
        lines[ lines.length - 1 ].rotation.z = ui.value;
        }
      }
    });
    // $( updated_div_id ).val( $( slider_id ).slider( "value" ) );
  });
}

function setup_UI(){
setup_slider( "#line_length", 1, 0.01, 2, 0.05, /*"#new_line_length",*/ "length" );
setup_slider( "#line_X", 20, -40, 40, 0.1, /*"#new_line_X",*/ "position_X" );
setup_slider( "#line_Y", 5, -40, 40, 0.1, /*"#new_line_Y",*/ "position_Y" );
setup_slider( "#line_Z", 5, -40, 40, 0.1, /*"#new_line_Z",*/ "position_Z" );
setup_slider( "#line_rotate_X", 0, -1.56, 1.56, 0.02, /*"#rotate_X",*/ "rotate_X" );
setup_slider( "#line_rotate_Y", 0, -1.56, 1.56, 0.02, /*"#rotate_Y",*/ "rotate_Y" );
setup_slider( "#line_rotate_Z", 0, -1.56, 1.56, 0.02, /*"#rotate_Z",*/ "rotate_Z" );
}

function load_JS(){
  setup_UI();

scene = new THREE.Scene();
scene.background = new THREE.Color( 0x444444 );
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

renderer = new THREE.WebGLRenderer({ antialias: true, autoSize: true });
    renderer.setSize(window.innerWidth / 1.35, window.innerHeight / 1.35);

draw_environment();

camera.position.x = CAMERA_X_DEFAULT;
camera.position.y = CAMERA_Y_DEFAULT;
camera.position.z = CAMERA_Z_DEFAULT;

    $("#canvas_block").append(renderer.domElement);

    // controls
controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 60;
// axes
scene.add( new THREE.AxisHelper(30) );

    //move_with_mouse(renderer);

function render(){
camera.position.x += CAMERA_X;
camera.position.y += CAMERA_Y;
camera.position.z += CAMERA_Z;

requestAnimationFrame( render );

renderer.render(scene, camera);
};

render();
}

function start_left(){ ROTATION_X = 0.02; }
function stop_left(){ ROTATION_X = 0; }
function start_right(){ ROTATION_X = -0.02; }
function stop_right(){ ROTATION_X = 0; }
function start_up(){ ROTATION_Y = 0.02; }
function stop_up(){ ROTATION_Y = 0; }
function start_down(){ ROTATION_Y = -0.02; }
function stop_down(){ ROTATION_Y = 0; }

function camera_X_in_start(){ CAMERA_X += 0.2; }
function camera_X_in_stop(){ CAMERA_X = 0; }
function camera_X_out_start(){ CAMERA_X -= 0.2; }
function camera_X_out_stop(){ CAMERA_X = 0; }

function camera_Y_in_start(){ CAMERA_Y += 0.2; }
function camera_Y_in_stop(){ CAMERA_Y = 0; }
function camera_Y_out_start(){ CAMERA_Y -= 0.2; }
function camera_Y_out_stop(){ CAMERA_Y = 0; }

function camera_Z_in_start(){ CAMERA_Z += 0.2; }
function camera_Z_in_stop(){ CAMERA_Z = 0; }
function camera_Z_out_start(){ CAMERA_Z -= 0.2; }
function camera_Z_out_stop(){ CAMERA_Z = 0; }


/*function move_with_mouse(renderer){

var previousMousePosition = {
   x: 0,
   y: 0
};
$(renderer.domElement).on('mousedown', function(e) {
   
    isDragging = true;

})
.on('mousemove', function(e) {

   var deltaMove = {
       x: e.offsetX-previousMousePosition.x,
       y: e.offsetY-previousMousePosition.y
   };

   if(isDragging) {
           
       var deltaRotationQuaternion = new THREE.Quaternion()
           .setFromEuler(new THREE.Euler(
               toRadians(deltaMove.y * 1),
               toRadians(deltaMove.x * 1),
               0,
               'XYZ'
           ));
       
       cubes[0].quaternion.multiplyQuaternions(deltaRotationQuaternion, cubes[0].quaternion);
   }
   
   previousMousePosition = {
       x: e.offsetX,
       y: e.offsetY
   };
});

$(document).on('mouseup', function(e) {
   isDragging = false;
});
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}*/





