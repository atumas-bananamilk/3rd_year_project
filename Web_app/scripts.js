var scene;
var camera;
var renderer;

var group;

var isDragging = false;

var ROTATION_X = 0;
var ROTATION_Y = 0;
var CAMERA_X_DEFAULT = 10;
var CAMERA_Y_DEFAULT = 20;
var CAMERA_Z_DEFAULT = 20;
var CAMERA_X = 0;
var CAMERA_Y = 0;
var CAMERA_Z = 0;

var cylinder;

var shapes = [];
var coordinates = [];

var line;

var lines = [];

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

function create_cylinder(colour, up_size, down_size, height, segments){

	var geometry = new THREE.CylinderGeometry( up_size, down_size, height, segments, 1, false);
	var cylinder = mesh(geometry, colour, 0xFFFFFF);

	scene.add(cylinder);
	return cylinder;
}

function create_new_ring(){
	var geometry = new THREE.TorusGeometry( 3, 0.5, 20, 2999 );
  	ring = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
	scene.add(ring);
}

function create_new_line(){
	line = create_cylinder(0x0000ff, 0.1, 0.1, 16, 3);
	line.position.x = 17;
	line.position.y = 8;
	line.position.z = 3;
	line.rotation.z = 3.12;

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
	for (var i = 0; i < shapes.length - 1; i++){
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
	for (var i = 0; i < shapes.length - 1; i++){
		var material = new THREE.MeshBasicMaterial( { transparent: true, opacity: 0 } );
		shapes[i].material = material;
	}
	coordinates = [];
}

function generate_coordinates(){
	var ss = "";
	for (var i = 0; i < coordinates.length; i++){
		ss += coordinates[i];
		ss += ", ";
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
	    url: 'server.php',
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

function create_new_shape(colour){

	var size = 2;
	var short = 2.1;//1
	var long = 2.2;//1.1

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

function draw_shapes(position_y, rotation_y){
	// draw line of shapes
	var shape_0 = create_new_shape( 0xFFFF00 );
	var shape_1 = create_new_shape( 0xFFFF00 );
	var shape_2 = create_new_shape( 0xFFFF00 );
	var shape_3 = create_new_shape( 0xFFFF00 );
	var shape_4 = create_new_shape( 0xFFFF00 );
	var shape_5 = create_new_shape( 0xFFFF00 );
	var shape_6 = create_new_shape( 0xFFFF00 );
	var shape_7 = create_new_shape( 0xFFFF00 );
	var shape_8 = create_new_shape( 0xFFFF00 );
	var shape_9 = create_new_shape( 0xFFFF00 );
	var shape_10 = create_new_shape( 0xFFFF00 );
	var shape_11 = create_new_shape( 0xFFFF00 );
	var shape_12 = create_new_shape( 0xFFFF00 );
	var shape_13 = create_new_shape( 0xFFFF00 );
	var shape_14 = create_new_shape( 0xFFFF00 );

	shapes.push(shape_0);
	shapes.push(shape_1);
	shapes.push(shape_2);
	shapes.push(shape_3);
	shapes.push(shape_4);
	shapes.push(shape_5);
	shapes.push(shape_6);
	shapes.push(shape_7);
	shapes.push(shape_8);
	shapes.push(shape_9);
	shapes.push(shape_10);
	shapes.push(shape_11);
	shapes.push(shape_12);
	shapes.push(shape_13);
	shapes.push(shape_14);

	var distance_from_center = 1;
	var DISTANCE = 2;
	var ROW = 1;

	shape_14.position.x = distance_from_center;
	shape_13.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_12.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_11.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_10.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_9.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_8.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_7.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_6.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_5.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_4.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_3.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_2.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_1.position.x = distance_from_center + DISTANCE * ROW;
	ROW++;
	shape_0.position.x = distance_from_center + DISTANCE * ROW;

	group = new THREE.Object3D();
	group.add( shape_0 );
	group.add( shape_1 );
	group.add( shape_2 );
	group.add( shape_3 );
	group.add( shape_4 );
	group.add( shape_5 );
	group.add( shape_6 );
	group.add( shape_7 );
	group.add( shape_8 );
	group.add( shape_9 );
	group.add( shape_10 );
	group.add( shape_11 );
	group.add( shape_12 );
	group.add( shape_13 );
	group.add( shape_14 );

	group.rotation.y = rotation_y;
	group.position.y = position_y;
	scene.add( group );
}

function draw_environment(height){

	// draw outer cylinder
	var outer_cylinder = create_outer_cylinder(0xAA0000, 31, 31, height * 2, 44);
	outer_cylinder.position.y = -height;

	// 11 shapes in 1/4
	// 90 degrees - 1.5686
	var ROTATION_ANGLE = 0.1426;
	var rotation_y;
	var POSITION_ADD = -2;
	var position_y = -2;

	for (var k = 0; k < height; k++){
		rotation_y = 0;
		for (var i = 0; i < 44; i++){
			draw_shapes( position_y, rotation_y );
			rotation_y += ROTATION_ANGLE;
		}
		position_y += POSITION_ADD;
	}

	position_y = -1;

	// draw central cylinders
	for (var i = 0; i < height; i++){
		var cylinder = create_cylinder(0xFFFF00, 1, 1, 2, 32);
		cylinder.position.y = position_y;
		position_y += POSITION_ADD;

		shapes.push(cylinder);
	}
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
	setup_slider( "#line_X", 37, -40, 40, 0.1, /*"#new_line_X",*/ "position_X" );
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

	draw_environment(9);

	camera.position.x = CAMERA_X_DEFAULT;
	camera.position.y = CAMERA_Y_DEFAULT;
	camera.position.z = CAMERA_Z_DEFAULT;

    $("#canvas_block").append(renderer.domElement);

    // controls
	controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 5;
    controls.maxDistance = 60;
	
	// axes
	scene.add( new THREE.AxisHelper( 20 ) );

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

function camera_X_in_start(){ CAMERA_X += 0.1; }
function camera_X_in_stop(){ CAMERA_X = 0; }
function camera_X_out_start(){ CAMERA_X -= 0.1; }
function camera_X_out_stop(){ CAMERA_X = 0; }

function camera_Y_in_start(){ CAMERA_Y += 0.1; }
function camera_Y_in_stop(){ CAMERA_Y = 0; }
function camera_Y_out_start(){ CAMERA_Y -= 0.1; }
function camera_Y_out_stop(){ CAMERA_Y = 0; }

function camera_Z_in_start(){ CAMERA_Z += 0.1; }
function camera_Z_in_stop(){ CAMERA_Z = 0; }
function camera_Z_out_start(){ CAMERA_Z -= 0.1; }
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







