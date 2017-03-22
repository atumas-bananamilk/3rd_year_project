function register(){
	window.location.href = './register.php';
}
function open_ss(name, width_top, width_middle, width_bottom, colour_R, colour_G, colour_B, mov_direction, mov_speed){

	$.ajax({
		url: './load_shape.php',
		type: 'POST',
		data: {
			name: name, 
			width_top: width_top, 
			width_middle: width_middle, 
			width_bottom: width_bottom, 
			colour_R: colour_R, 
			colour_G: colour_G, 
			colour_B: colour_B, 
			mov_direction: mov_direction, 
			mov_speed: mov_speed
		},
		success: function( response ){
			window.location.href = './app.php';
		},
		error: function( response ){
	   		alert("ERROR: "+response);
		}
	});
}
function open_sketch(name){
	window.location.href = './app.php?new=false&name='+name;
}
function create_new_sketch(){
	window.location.href = './app.php?new=true&name=undefined';
}
function go_back(){
	window.location.href = './dashboard.php';
}