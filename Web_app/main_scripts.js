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
function ask_to_delete_project(name){

    if (confirm("Are you sure you want to delete this project?")) {
    	if ( delete_project(name) ){
    		delete_project_image(name);
    	}
    }
}
function delete_project(name){
	var success = false;

	$.ajax({
		url: './delete_project.php',
		type: 'POST',
		data: {name: name},
		async: false,
		success: function( response ){
			if (response.length == 0){
				success = true;
			}
			else{
				alert(response);
			}
		},
		error: function( response ){
	   		alert("ERROR: "+response);
		}
	});

	return success;
}
function delete_project_image(name){
	$.ajax({
		url: './delete_project_image.php',
		type: 'POST',
		data: {name: name},
		async: false,
		success: function( response ){
			if (response.length == 0){
				window.location.href = './dashboard.php';
			}
			else{
				alert(response);
			}
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
function logout(){
	window.location.href = "./logout.php";
}