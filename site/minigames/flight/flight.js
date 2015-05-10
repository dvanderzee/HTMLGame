/*Code by Miles*/

var travel = -1;
var mouse_x = 0;
var mouse_x_init = 0;
var mouse_y = 0;
var mouse_y_init = 0;
var mouse_y_prev = 0;
var y_delt = 0;
var dist = 0;
var dead = false;
var started = false;
var finaldist = 0;
var planet = false;
var landed = false;
var asteroid_width = 0;
var asteroid_loc = 0;
var ship_loc = 0;
var ship_width = 0;

$(document).mousemove(function(e){
	mouse_x = e.pageX;
	mouse_y = e.pageY;
	updateDistance();
	$("#cursor").css("transform", "translate("+(mouse_x - 30)+"px,"+(mouse_y-30)+"px)");
});

function shipCursor(){
	if (started == true && dead == false){
		$("html").css("cursor","none");
		$("#cursor").css("background-image", "url('./images/ship.gif')");
	}
}

function updateDistance(){
	if (started == true && dead == false){
		dist = (travel * 100) + ( mouse_x / 10);
		dist = dist.toFixed(1);
		$("#distance").text("Distance: " + dist + " km");
	}
	else if (started == true && dead == true){
		finaldist = dist;
		$("#distance").text("Final Distance: " + finaldist + " km");
	}
	if (travel >= (flight_length)) {
		onPlanet();
	}
}

function playgame(){
	$(".btn").css("display","none");
	started = true;
		$('table tr').find('td:eq(0)').addClass("first");
		setTimeout(function() {
			$('table tr').find('td:eq(0)').remove();
			$('table tr').each(function(){
				var numberwang = Math.random();
				if(travel <= (flight_length - 10)){
					if (numberwang < .025){
						$(this).append('<td class="obs"><img src="./images/asteroid1.png" class="asteroids"></td>');
					}
					else if (numberwang > .025 && numberwang < .05){
						$(this).append('<td class="obs"><img src="./images/asteroid2.png" class="asteroids"></td>');
					}
					else if (numberwang > .05 && numberwang < .075){
						$(this).append('<td class="obs"><img src="./images/asteroid3.png" class="asteroids"></td>');
					}
					else if (numberwang > .075 && numberwang < .1){
						$(this).append('<td class="obs"><img src="./images/asteroid4.png" class="asteroids"></td>');
					}
					else if (numberwang > .1 && numberwang < .3){
						$(this).append('<td><img src="./images/stardust.png" class="stars"></td>');
					}
					else if (numberwang > .3 && numberwang < .5){
						$(this).append('<td><img src="./images/stardust2.png" class="stars"></td>');
					}
					else if (numberwang > .5 && numberwang < .7){
						$(this).append('<td><img src="./images/stardust3.png" class="stars"></td>');
					}
					else {
						$(this).append('<td><img src="./images/stardust4.png" class="stars"></td>');
					}
				}
				else if (travel <= (flight_length - 5)){
					if (numberwang < .3){
						$(this).append('<td><img src="./images/stardust.png" class="stars"></td>');
					}
					else if (numberwang > .3 && numberwang < .5){
						$(this).append('<td><img src="./images/stardust2.png" class="stars"></td>');
					}
					else if (numberwang > .5 && numberwang < .7){
						$(this).append('<td><img src="./images/stardust3.png" class="stars"></td>');
					}
					else {
						$(this).append('<td><img src="./images/stardust4.png" class="stars"></td>');
					}
				}
				else if (travel == (flight_length - 4)){
					if (planet == false){
						$(this).append('<td class="planet"><img src="./images/' + planet_loc +'" class="stars"></td>');
						planet = true;
					}
					else{
						$(this).append('<td><img src="./images/stardust3.png" class="stars"></td>');
					}
				}
			});
			if (dead != true && landed != true){
				playgame();
			}
		}, flight_speed);
		travel += 1;
		updateDistance();
};

function crashcheck(){
	if (dead != true){
		$('.obs').each(function(){
			asteroid_width = $(this).width();
			asteroid_loc = $(this).position();
			ship_loc = $("#cursor").position();
			ship_width = $("#cursor").width();
			ship_L = ship_loc.left;
			ship_R = ship_loc.left + ship_width;
			ship_T = ship_loc.top;
			ship_B = ship_loc.top + ship_width;
			ast_L = asteroid_loc.left;
			ast_R = asteroid_loc.left + asteroid_width;
			ast_T = asteroid_loc.top;
			ast_B = asteroid_loc.top + asteroid_width;
			if ((((ship_R < ast_R)) && ((ship_R > ast_L))) && (((ship_T > ast_T) && (ship_T < ast_B)) || ((ship_B > ast_T) && (ship_B < ast_B)))){
				dead = true;
			    death();
			}
		});
	}	
}

function death(){
	$("#cursor").css("width", "75px");
	$("#cursor").css("height", "75px");
	$("#cursor").css("background-image", "url('./images/explosion.png')");
    setTimeout(function() {
    	$(".btn").html("Reload");
    	$(".btn").css("display","block");
    	$(".btn").mouseover(function(){
    		$("#cursor").css("display","none");
    	});
    	$(".btn").click(function() {
	    	location.reload();
		});
    }, 400);
}

$(document).ready(function(){
	setInterval(function(){
		crashcheck();
	}, 50);
	$(".first").css({"-webkit-animation": "shrink .2s linear", "animation": "shrink .2s linear"});
	$("body").delegate(".obs", "mouseover", function(){
		dead = true;
	    death();
	});
	$("body").delegate(".planet", "mouseover", function(){
		landed = true;
		onPlanet();
	});
	$(".btn").html("Play");
	$(".btn").on("click", function(){
		playgame();
		shipCursor();
	});	
});

function onPlanet(){
	parent.postMessage({'success':true}, "*");
}