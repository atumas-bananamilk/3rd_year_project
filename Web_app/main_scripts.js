/*
  Creator: Aivaras Tumas
  The University of Manchester
  School of Computer Science
  3rd Year Project
*/
/* Javascript functions that are not directly related to processing 3D shapes (mainly on app.php). */

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

function register(){
	window.location.href = './register.php';
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