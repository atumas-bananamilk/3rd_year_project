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

// var line;

var lines = [];

var NO_OF_LAYERS = 9;
var NO_OF_TIME_SLOTS = 45;
var NO_OF_PIXELS_IN_LAYER = 15 * NO_OF_TIME_SLOTS + 1;



var shape_top;
var shape_values;
var LAYER_SELECTED = 1;

var layers = [];

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

function create_cylinder(transparent, colour, top_size, bottom_size, height, segments){
	var geometry = new THREE.CylinderGeometry( top_size, bottom_size, height, segments, 1, false);
	var cylinder = (transparent) ? mesh_transparent(geometry, colour) : mesh(geometry, colour, 0xFFFFFF);;

	scene.add(cylinder);
	return cylinder;
}

function create_new_ring(){
	var geometry = new THREE.TorusGeometry( 3, 0.5, 20, 2999 );
	ring = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
	scene.add(ring);
}

function create_new_line(x_given, y_given, z_given){
	var line = create_cylinder(false, 0x0000ff, 0.2, 0.2, 16, 4);
	line.position.x = x_given;
	line.position.y = y_given;
	line.position.z = z_given;
	line.rotation.z = 0;//Math.PI / 180//3.12;

	lines.push(line);
}

function test_1(){
	create_new_line(30,4,0);
	create_new_line(-30,4,1);
	create_new_line(0,4,30);
	create_new_line(0,4,-30);
}

function test_2(){
	create_new_line(30,7,0);
	create_new_line(-30,7,1);
	create_new_line(0,7,30);
	create_new_line(0,7,-30);

	// create_new_line(21.2,7,21.8);
	// create_new_line(-21.2,7,-21.8);
	// create_new_line(-21.2,7,21.8);
	// create_new_line(21.2,7,-21.8);
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

	var slot = parseInt(coordinate / 15) - (layer * NO_OF_TIME_SLOTS);

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
	// 45 * Math.PI / 180      // Rotates  45 degrees per frame

	var msg = coordinates.length+",";
	var pixel;

	for (var i = 0; i < coordinates.length; i++){
		pixel = create_pixel( coordinates[i] );
		msg += pixel.layer+",";
		msg += pixel.led+",";
		msg += pixel.slot+",";
		msg += pixel.r+",";
		msg += pixel.g+",";
		msg += pixel.b+",";
	}
	msg = msg.slice(0, -1);
	alert(msg);
	send_data_to_arduino(msg);
}

function show_shape(){
	var encoded_data = encode_pixels();
	// alert(encoded_data);
	send_data_to_server(encoded_data);
}

function encode_pixels(){
	var encoded_str = layers.length;
	for (var i = 0; i < layers.length; i++){
		encoded_str += ","+layers[i]['width'];
		encoded_str += ","+layers[i]['colour_R'];
		encoded_str += ","+layers[i]['colour_G'];
		encoded_str += ","+layers[i]['colour_B'];
	}
	return encoded_str;
}

function send_data_to_server(data){
	$.ajax({
		url: './server.php',
		type: 'POST',
		data: {data: data},
		success: function( response ){
			if (response.length == 0){
				alert("Success!");
			}
			else{
				alert(response);
			}
		},
		error: function( response ){
	   		alert("Error: "+response);
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

function create_project(){
	var name_typed = name_input.value;
	for (var i = 0; i < NO_OF_LAYERS; i++){
		layers[i]['name'] = name_typed;
	}

	$.ajax({
		url: './create_project.php',
		type: 'POST',
		data: {layers: layers},
		success: function( response ){
			if (response.length == 0){
				alert("Project saved.");
				window.location.href = './app.php?new=false&name='+name_typed;
			}
			else{
				alert(response);
			}
		},
		error: function( response ){
	   		alert("Error: "+response);
		}
	});
}

function save_project(previous_name){
	var name_typed = name_input.value;
	for (var i = 0; i < NO_OF_LAYERS; i++){
		layers[i]['name'] = name_typed;
	}

	$.ajax({
		url: './save_project.php',
		type: 'POST',
		data: {previous_name: previous_name, layers: layers},
		success: function( response ){
			if (response.length == 0){
				alert("Project saved.");
				window.location.href = './app.php?new=false&name='+name_typed;
			}
			else{
				alert(response);
			}
		},
		error: function( response ){
	   		alert("Error: "+response);
		}
	});
}

function create_new_sketch(){
	window.location.href = './app.php?new=true&name=undefined';
}

function reset_layer_selects(){
	document.getElementById("layer_1").src = "./images/number_1.png";
	document.getElementById("layer_2").src = "./images/number_2.png";
	document.getElementById("layer_3").src = "./images/number_3.png";
	document.getElementById("layer_4").src = "./images/number_4.png";
	document.getElementById("layer_5").src = "./images/number_5.png";
	document.getElementById("layer_6").src = "./images/number_6.png";
	document.getElementById("layer_7").src = "./images/number_7.png";
	document.getElementById("layer_8").src = "./images/number_8.png";
	document.getElementById("layer_9").src = "./images/number_9.png";
}

function select_layer(id){
	reset_layer_selects();

	switch(id){
		case 1:{ 
			document.getElementById("layer_1").src = "./images/number_1_selected.png"; 
			LAYER_SELECTED = 1;
			break; 
		}
		case 2:{ 
			document.getElementById("layer_2").src = "./images/number_2_selected.png"; 
			LAYER_SELECTED = 2;
			break; 
		}
		case 3:{ 
			document.getElementById("layer_3").src = "./images/number_3_selected.png"; 
			LAYER_SELECTED = 3;
			break; 
		}
		case 4:{ 
			document.getElementById("layer_4").src = "./images/number_4_selected.png"; 
			LAYER_SELECTED = 4;
			break; 
		}
		case 5:{ 
			document.getElementById("layer_5").src = "./images/number_5_selected.png"; 
			LAYER_SELECTED = 5;
			break; 
		}
		case 6:{ 
			document.getElementById("layer_6").src = "./images/number_6_selected.png"; 
			LAYER_SELECTED = 6;
			break; 
		}
		case 7:{ 
			document.getElementById("layer_7").src = "./images/number_7_selected.png"; 
			LAYER_SELECTED = 7;
			break; 
		}
		case 8:{ 
			document.getElementById("layer_8").src = "./images/number_8_selected.png"; 
			LAYER_SELECTED = 8;
			break; 
		}
		case 9:{ 
			document.getElementById("layer_9").src = "./images/number_9_selected.png"; 
			LAYER_SELECTED = 9;
			break; 
		}
	}
	setup_UI();
}

function draw_environment(){
	// NOTE: need to subtract 0 otherwise there is a bug coming from the library
	// (bug only occurs with variables but not plain numbers)
	var rgb;
	var position_y = 9;

	for (var i = 0; i < NO_OF_LAYERS; i++){
		rgb = rgbToHex(layers[i]['colour_R'] - 0, layers[i]['colour_G'] - 0, layers[i]['colour_B'] - 0);
		var shape = create_cylinder(false, rgb, layers[i]['width'] - 0, layers[i]['width'] - 0, 2, 30);
		shape.position.y = position_y;
		shapes.push(shape);
		position_y -= 2;
	}
}

function redraw_layer(){
	// NOTE: need to subtract 0 otherwise there is a bug coming from the library
	// (bug only occurs with variables but not plain numbers)
	scene.remove( shapes[LAYER_SELECTED - 1] );

	var rgb = rgbToHex(layers[LAYER_SELECTED - 1]['colour_R'] - 0, layers[LAYER_SELECTED - 1]['colour_G'] - 0, layers[LAYER_SELECTED - 1]['colour_B'] - 0);
	shapes[LAYER_SELECTED - 1] = create_cylinder(false, rgb, layers[LAYER_SELECTED - 1]['width'] - 0, layers[LAYER_SELECTED - 1]['width'] - 0, 2, 30);
	shapes[LAYER_SELECTED - 1].position.y = 9 - 2 * (LAYER_SELECTED - 1);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return c.toString(16).length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return parseInt( componentToHex(r) + componentToHex(g) + componentToHex(b), 16 );
}

function setup_slider(slider_id, default_val, min_val, max_val, step){
	$( function() {
    	$( slider_id ).slider({
	    	value: default_val,
	    	min: min_val,
	    	max: max_val,
	    	step: step,
	    	slide: function( event, ui ) {
		        if (slider_id == "#width_slider"){
					layers[LAYER_SELECTED - 1]['width'] = ui.value;
		        	document.getElementById("width_input").value = ui.value;
		        }
		        else if (slider_id == "#colour_R_slider"){
					layers[LAYER_SELECTED - 1]['colour_R'] = ui.value;
		        	document.getElementById("colour_R_input").value = ui.value;
		        }
		        else if (slider_id == "#colour_G_slider"){
					layers[LAYER_SELECTED - 1]['colour_G'] = ui.value;
		        	document.getElementById("colour_G_input").value = ui.value;
		        }
		        else if (slider_id == "#colour_B_slider"){
					layers[LAYER_SELECTED - 1]['colour_B'] = ui.value;
		        	document.getElementById("colour_B_input").value = ui.value;
		        }
				redraw_layer();
	    	}
	    });
	});
}

function setup_UI(){
	document.getElementById("width_input").value = layers[LAYER_SELECTED - 1]['width'];
	document.getElementById("colour_R_input").value = layers[LAYER_SELECTED - 1]['colour_R'];
	document.getElementById("colour_G_input").value = layers[LAYER_SELECTED - 1]['colour_G'];
	document.getElementById("colour_B_input").value = layers[LAYER_SELECTED - 1]['colour_B'];

	setup_slider( "#width_slider", layers[LAYER_SELECTED - 1]['width'], 1, 16, 1 );
	setup_slider( "#colour_R_slider", layers[LAYER_SELECTED - 1]['colour_R'], 0, 255, 1 );
	setup_slider( "#colour_G_slider", layers[LAYER_SELECTED - 1]['colour_G'], 0, 255, 1 );
	setup_slider( "#colour_B_slider", layers[LAYER_SELECTED - 1]['colour_B'], 0, 255, 1 );
}

function setup_layers(layer_1_given, layer_2_given, layer_3_given, layer_4_given, layer_5_given, layer_6_given, layer_7_given, layer_8_given, layer_9_given){
	layers.push(layer_1_given);
	layers.push(layer_2_given);
	layers.push(layer_3_given);
	layers.push(layer_4_given);
	layers.push(layer_5_given);
	layers.push(layer_6_given);
	layers.push(layer_7_given);
	layers.push(layer_8_given);
	layers.push(layer_9_given);
}

function load_JS(layer_1_given, layer_2_given, layer_3_given, layer_4_given, layer_5_given, layer_6_given, layer_7_given, layer_8_given, layer_9_given){
	setup_layers(layer_1_given, layer_2_given, layer_3_given, layer_4_given, layer_5_given, layer_6_given, layer_7_given, layer_8_given, layer_9_given);
	setup_UI();

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x000000 );
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer({ antialias: true, autoSize: true });
	renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth / 1.40, window.innerHeight / 1.40);

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

	clear_result();

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





