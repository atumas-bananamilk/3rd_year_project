/* ----- HELPER METHODS ----- */
// helper method to setup input
function setup_input(name, layer_number, width, colour_R, colour_G, colour_B){
	var input = {
		name:name,
		layer_number:layer_number,
		width:width,
		colour_R:colour_R,
		colour_G:colour_G,
		colour_B:colour_B
	};

	return input;
}
/* ----- END ----- */

QUnit.test( "\"add_layer\": exists", function( assert ) {
	assert.ok( add_layer, "\"add_layer\" exists" );
});

QUnit.test( "\"add_layer\": is function", function( assert ) {
	assert.ok( typeof add_layer === 'function', "\"add_layer\" is function" );
});

QUnit.test( "\"add_layer\": setting correct values for layer 1", function( assert ) {
	var input = setup_input("sketch_1", 1, 2, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"add_layer\": setting correct values for layer 2", function( assert ) {
	var input = setup_input("sketch_1", 2, 2, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 2, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"add_layer\": setting correct values for layer 3", function( assert ) {
	var input = setup_input("sketch_1", 3, 2, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 3, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"add_layer\": setting correct values for layer 4", function( assert ) {
	var input = setup_input("sketch_1", 4, 2, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 4, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"add_layer\": setting correct values for layer 5", function( assert ) {
	var input = setup_input("sketch_1", 5, 2, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 5, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"add_layer\": setting correct values for layer 6", function( assert ) {
	var input = setup_input("sketch_1", 6, 2, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 6, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"add_layer\": setting correct values for layer 7", function( assert ) {
	var input = setup_input("sketch_1", 7, 2, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 7, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"add_layer\": setting correct values for layer 8", function( assert ) {
	var input = setup_input("sketch_1", 8, 2, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 8, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"add_layer\": setting correct values for layer 9", function( assert ) {
	var input = setup_input("sketch_1", 9, 2, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 9, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"add_layer\": setting correct values for more than 1 layers", function( assert ) {
	var input_1 = setup_input("sketch_1", 1, 15, 40, 255, 55);
	var input_2 = setup_input("sketch_1", 2, 4, 230, 80, 0);

	var layers = [];
	layers = add_layer(layers, input_1);
	layers = add_layer(layers, input_2);
	
	assert.propEqual( layers[0], input_1, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input_1, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 15, "width is correct" );
	assert.equal( layers[0]['colour_R'], 40, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 55, "colour_B is correct" );
	
	assert.propEqual( layers[1], input_2, "output properties are the same as input properties" );
	assert.deepEqual( layers[1], input_2, "output values are the same as input values" );
	assert.equal( layers[1]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[1]['layer_number'], 2, "layer_number is correct" );
	assert.equal( layers[1]['width'], 4, "width is correct" );
	assert.equal( layers[1]['colour_R'], 230, "colour_R is correct" );
	assert.equal( layers[1]['colour_G'], 80, "colour_G is correct" );
	assert.equal( layers[1]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"add_layer\": setting correct values for all 9 layers", function( assert ) {
	var input_1 = setup_input("sketch_1", 1, 15, 40, 255, 55);
	var input_2 = setup_input("sketch_1", 2, 4, 230, 80, 0);
	var input_3 = setup_input("sketch_1", 3, 6, 90, 66, 87);
	var input_4 = setup_input("sketch_1", 4, 8, 90, 12, 145);
	var input_5 = setup_input("sketch_1", 5, 11, 254, 0, 88);
	var input_6 = setup_input("sketch_1", 6, 14, 222, 222, 222);
	var input_7 = setup_input("sketch_1", 7, 2, 34, 56, 1);
	var input_8 = setup_input("sketch_1", 8, 6, 0, 0, 0);
	var input_9 = setup_input("sketch_1", 9, 16, 1, 11, 111);

	var layers = [];
	layers = add_layer(layers, input_1);
	layers = add_layer(layers, input_2);
	layers = add_layer(layers, input_3);
	layers = add_layer(layers, input_4);
	layers = add_layer(layers, input_5);
	layers = add_layer(layers, input_6);
	layers = add_layer(layers, input_7);
	layers = add_layer(layers, input_8);
	layers = add_layer(layers, input_9);
	
	assert.propEqual( layers[0], input_1, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input_1, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 15, "width is correct" );
	assert.equal( layers[0]['colour_R'], 40, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 55, "colour_B is correct" );
	
	assert.propEqual( layers[1], input_2, "output properties are the same as input properties" );
	assert.deepEqual( layers[1], input_2, "output values are the same as input values" );
	assert.equal( layers[1]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[1]['layer_number'], 2, "layer_number is correct" );
	assert.equal( layers[1]['width'], 4, "width is correct" );
	assert.equal( layers[1]['colour_R'], 230, "colour_R is correct" );
	assert.equal( layers[1]['colour_G'], 80, "colour_G is correct" );
	assert.equal( layers[1]['colour_B'], 0, "colour_B is correct" );
	
	assert.propEqual( layers[2], input_3, "output properties are the same as input properties" );
	assert.deepEqual( layers[2], input_3, "output values are the same as input values" );
	assert.equal( layers[2]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[2]['layer_number'], 3, "layer_number is correct" );
	assert.equal( layers[2]['width'], 6, "width is correct" );
	assert.equal( layers[2]['colour_R'], 90, "colour_R is correct" );
	assert.equal( layers[2]['colour_G'], 66, "colour_G is correct" );
	assert.equal( layers[2]['colour_B'], 87, "colour_B is correct" );
	
	assert.propEqual( layers[3], input_4, "output properties are the same as input properties" );
	assert.deepEqual( layers[3], input_4, "output values are the same as input values" );
	assert.equal( layers[3]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[3]['layer_number'], 4, "layer_number is correct" );
	assert.equal( layers[3]['width'], 8, "width is correct" );
	assert.equal( layers[3]['colour_R'], 90, "colour_R is correct" );
	assert.equal( layers[3]['colour_G'], 12, "colour_G is correct" );
	assert.equal( layers[3]['colour_B'], 145, "colour_B is correct" );
	
	assert.propEqual( layers[4], input_5, "output properties are the same as input properties" );
	assert.deepEqual( layers[4], input_5, "output values are the same as input values" );
	assert.equal( layers[4]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[4]['layer_number'], 5, "layer_number is correct" );
	assert.equal( layers[4]['width'], 11, "width is correct" );
	assert.equal( layers[4]['colour_R'], 254, "colour_R is correct" );
	assert.equal( layers[4]['colour_G'], 0, "colour_G is correct" );
	assert.equal( layers[4]['colour_B'], 88, "colour_B is correct" );
	
	assert.propEqual( layers[5], input_6, "output properties are the same as input properties" );
	assert.deepEqual( layers[5], input_6, "output values are the same as input values" );
	assert.equal( layers[5]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[5]['layer_number'], 6, "layer_number is correct" );
	assert.equal( layers[5]['width'], 14, "width is correct" );
	assert.equal( layers[5]['colour_R'], 222, "colour_R is correct" );
	assert.equal( layers[5]['colour_G'], 222, "colour_G is correct" );
	assert.equal( layers[5]['colour_B'], 222, "colour_B is correct" );
	
	assert.propEqual( layers[6], input_7, "output properties are the same as input properties" );
	assert.deepEqual( layers[6], input_7, "output values are the same as input values" );
	assert.equal( layers[6]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[6]['layer_number'], 7, "layer_number is correct" );
	assert.equal( layers[6]['width'], 2, "width is correct" );
	assert.equal( layers[6]['colour_R'], 34, "colour_R is correct" );
	assert.equal( layers[6]['colour_G'], 56, "colour_G is correct" );
	assert.equal( layers[6]['colour_B'], 1, "colour_B is correct" );
	
	assert.propEqual( layers[7], input_8, "output properties are the same as input properties" );
	assert.deepEqual( layers[7], input_8, "output values are the same as input values" );
	assert.equal( layers[7]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[7]['layer_number'], 8, "layer_number is correct" );
	assert.equal( layers[7]['width'], 6, "width is correct" );
	assert.equal( layers[7]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[7]['colour_G'], 0, "colour_G is correct" );
	assert.equal( layers[7]['colour_B'], 0, "colour_B is correct" );
	
	assert.propEqual( layers[8], input_9, "output properties are the same as input properties" );
	assert.deepEqual( layers[8], input_9, "output values are the same as input values" );
	assert.equal( layers[8]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[8]['layer_number'], 9, "layer_number is correct" );
	assert.equal( layers[8]['width'], 16, "width is correct" );
	assert.equal( layers[8]['colour_R'], 1, "colour_R is correct" );
	assert.equal( layers[8]['colour_G'], 11, "colour_G is correct" );
	assert.equal( layers[8]['colour_B'], 111, "colour_B is correct" );
});

QUnit.test( "\"add_layer\": layer_number out of range shows error", function( assert ) {
	var input_1 = setup_input("sketch_1", -1, 4, 40, 255, 55);
	var input_2 = setup_input("sketch_1", 10, 4, 40, 255, 55);

	var layers = [];
	var output = add_layer(layers, input_1);
	assert.equal( output, "(add_layer) Layer number out of range (given: -1).", "layer number out of range error shown (less than)" );
	
	layers = [];
	output = add_layer(layers, input_2);
	assert.equal( output, "(add_layer) Layer number out of range (given: 10).", "layer number out of range error shown (greater than)" );
});

QUnit.test( "\"add_layer\": width out of range shows error", function( assert ) {
	var input_1 = setup_input("sketch_1", 1, -1, 40, 255, 55);
	var input_2 = setup_input("sketch_1", 1, 17, 40, 255, 55);

	var layers = [];
	var output = add_layer(layers, input_1);
	assert.equal( output, "(add_layer) Layer width out of range (given: -1).", "width out of range error shown (less than)" );
	
	layers = [];
	output = add_layer(layers, input_2);
	assert.equal( output, "(add_layer) Layer width out of range (given: 17).", "width out of range error shown (greater than)" );
});

QUnit.test( "\"add_layer\": colour_R out of range shows error", function( assert ) {
	var input_1 = setup_input("sketch_1", 1, 3, -1, 255, 55);
	var input_2 = setup_input("sketch_1", 1, 3, 256, 255, 55);

	var layers = [];
	var output = add_layer(layers, input_1);
	assert.equal( output, "(add_layer) Layer red colour out of range (given: -1).", "red colour out of range error shown (less than)" );
	
	layers = [];
	output = add_layer(layers, input_2);
	assert.equal( output, "(add_layer) Layer red colour out of range (given: 256).", "red colour out of range error shown (greater than)" );
});

QUnit.test( "\"add_layer\": colour_G out of range shows error", function( assert ) {
	var input_1 = setup_input("sketch_1", 1, 3, 20, -1, 55);
	var input_2 = setup_input("sketch_1", 1, 3, 20, 256, 55);

	var layers = [];
	var output = add_layer(layers, input_1);
	assert.equal( output, "(add_layer) Layer green colour out of range (given: -1).", "green colour out of range error shown (less than)" );
	
	layers = [];
	output = add_layer(layers, input_2);
	assert.equal( output, "(add_layer) Layer green colour out of range (given: 256).", "green colour out of range error shown (greater than)" );
});

QUnit.test( "\"add_layer\": colour_B out of range shows error", function( assert ) {
	var input_1 = setup_input("sketch_1", 1, 3, 20, 230, -1);
	var input_2 = setup_input("sketch_1", 1, 3, 20, 230, 256);

	var layers = [];
	var output = add_layer(layers, input_1);
	assert.equal( output, "(add_layer) Layer blue colour out of range (given: -1).", "blue colour out of range error shown (less than)" );
	
	layers = [];
	output = add_layer(layers, input_2);
	assert.equal( output, "(add_layer) Layer blue colour out of range (given: 256).", "blue colour out of range error shown (greater than)" );
});

QUnit.test( "\"set_layer_width\": exists", function( assert ) {
	assert.ok( set_layer_width, "\"set_layer_width\" exists" );
});

QUnit.test( "\"set_layer_width\": is function", function( assert ) {
	assert.ok( typeof set_layer_width === 'function', "\"set_layer_width\" is function" );
});

QUnit.test( "\"set_layer_colour_R\": exists", function( assert ) {
	assert.ok( set_layer_colour_R, "\"set_layer_colour_R\" exists" );
});

QUnit.test( "\"set_layer_colour_R\": is function", function( assert ) {
	assert.ok( typeof set_layer_colour_R === 'function', "\"set_layer_colour_R\" is function" );
});

QUnit.test( "\"set_layer_colour_G\": exists", function( assert ) {
	assert.ok( set_layer_colour_G, "\"set_layer_colour_G\" exists" );
});

QUnit.test( "\"set_layer_colour_G\": is function", function( assert ) {
	assert.ok( typeof set_layer_colour_G === 'function', "\"set_layer_colour_G\" is function" );
});

QUnit.test( "\"set_layer_colour_B\": exists", function( assert ) {
	assert.ok( set_layer_colour_B, "\"set_layer_colour_B\" exists" );
});

QUnit.test( "\"set_layer_colour_B\": is function", function( assert ) {
	assert.ok( typeof set_layer_colour_B === 'function', "\"set_layer_colour_B\" is function" );
});

QUnit.test( "\"set_layer_width\": changing correct values for layer 1", function( assert ) {
	var input = setup_input("sketch_1", 1, 2, 0, 255, 0);
	var input_changed = setup_input("sketch_1", 1, 15, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );

	layers = set_layer_width(layers, 1, 15);

	assert.propEqual( layers[0], input_changed, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input_changed, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 15, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"set_layer_colour_R\": changing correct values for layer 1", function( assert ) {
	var input = setup_input("sketch_1", 1, 2, 0, 255, 0);
	var input_changed = setup_input("sketch_1", 1, 2, 134, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );

	layers = set_layer_colour_R(layers, 1, 134);

	assert.propEqual( layers[0], input_changed, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input_changed, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 134, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"set_layer_colour_G\": changing correct values for layer 1", function( assert ) {
	var input = setup_input("sketch_1", 1, 2, 0, 255, 0);
	var input_changed = setup_input("sketch_1", 1, 2, 0, 122, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );

	layers = set_layer_colour_G(layers, 1, 122);

	assert.propEqual( layers[0], input_changed, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input_changed, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 122, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );
});

QUnit.test( "\"set_layer_colour_B\": changing correct values for layer 1", function( assert ) {
	var input = setup_input("sketch_1", 1, 2, 0, 255, 0);
	var input_changed = setup_input("sketch_1", 1, 2, 0, 255, 56);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );

	layers = set_layer_colour_B(layers, 1, 56);

	assert.propEqual( layers[0], input_changed, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input_changed, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 2, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 56, "colour_B is correct" );
});

QUnit.test( "\"set_layer_width\": width out of range shows error", function( assert ) {
	var input = setup_input("sketch_1", 1, 4, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 4, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );

	var output;
	output = set_layer_width(layers, 1, 0);
	assert.equal( output, "(set_layer_width) Layer width out of range (given: 0).", "width out of range error shown (less than)" );

	output = set_layer_width(layers, 1, 17);
	assert.equal( output, "(set_layer_width) Layer width out of range (given: 17).", "width out of range error shown (greater than)" );
});

QUnit.test( "\"set_layer_colour_R\": colour_R out of range shows error", function( assert ) {
	var input = setup_input("sketch_1", 1, 4, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 4, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );

	var output;
	output = set_layer_colour_R(layers, 1, -1);
	assert.equal( output, "(set_layer_colour_R) Layer red colour out of range (given: -1).", "colour_R out of range error shown (less than)" );

	output = set_layer_colour_R(layers, 1, 257);
	assert.equal( output, "(set_layer_colour_R) Layer red colour out of range (given: 257).", "colour_R out of range error shown (greater than)" );
});

QUnit.test( "\"set_layer_colour_G\": colour_G out of range shows error", function( assert ) {
	var input = setup_input("sketch_1", 1, 4, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 4, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );

	var output;
	output = set_layer_colour_G(layers, 1, -1);
	assert.equal( output, "(set_layer_colour_G) Layer green colour out of range (given: -1).", "colour_G out of range error shown (less than)" );

	output = set_layer_colour_G(layers, 1, 257);
	assert.equal( output, "(set_layer_colour_G) Layer green colour out of range (given: 257).", "colour_G out of range error shown (greater than)" );
});

QUnit.test( "\"set_layer_colour_B\": colour_B out of range shows error", function( assert ) {
	var input = setup_input("sketch_1", 1, 4, 0, 255, 0);

	var layers = [];
	layers = add_layer(layers, input);

	assert.propEqual( layers[0], input, "output properties are the same as input properties" );
	assert.deepEqual( layers[0], input, "output values are the same as input values" );
	assert.equal( layers[0]['name'], "sketch_1", "name is correct" );
	assert.equal( layers[0]['layer_number'], 1, "layer_number is correct" );
	assert.equal( layers[0]['width'], 4, "width is correct" );
	assert.equal( layers[0]['colour_R'], 0, "colour_R is correct" );
	assert.equal( layers[0]['colour_G'], 255, "colour_G is correct" );
	assert.equal( layers[0]['colour_B'], 0, "colour_B is correct" );

	var output;
	output = set_layer_colour_B(layers, 1, -1);
	assert.equal( output, "(set_layer_colour_B) Layer blue colour out of range (given: -1).", "colour_B out of range error shown (less than)" );

	output = set_layer_colour_B(layers, 1, 257);
	assert.equal( output, "(set_layer_colour_B) Layer blue colour out of range (given: 257).", "colour_B out of range error shown (greater than)" );
});