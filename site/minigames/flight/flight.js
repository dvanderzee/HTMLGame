var travel = -1;
var mouse_x = 0;
var dist = 0;
var dead = false;
var started = false;
var finaldist = 0;
var planet = false;
var landed = false;

$(document).mousemove(function(e){
		mouse_x = e.pageX;
		updateDistance();
	});

function updateDistance(){
	if (started == true && dead == false){
		dist = travel + ( mouse_x / 1000);
		dist = dist.toFixed(2);
		$("#distance").text("Distance: " + dist + " km");
	}
	else if (started == true && dead == true){
		finaldist = dist;
		$("#distance").text("Final Distance: " + finaldist + " km");
	}
	if (travel >= 60) {
		death();
		$("#distance").text("You missed the planet");
	}
}

function playgame(){
	$("html").css("cursor","url('./images/ship.png'), auto");
	$(".btn").css("display","none");
	started = true;
		$('table tr').find('td:eq(0)').addClass("first");
		setTimeout(function() {
			$('table tr').find('td:eq(0)').remove();
			$('table tr').each(function(){
				var numberwang = Math.random();
				if(travel <= 40){
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
				else if (travel <= 45){
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
				else if (travel == 46){
					if (planet == false){
						$(this).append('<td class="planet"><img src="./images/planet.png" class="stars"></td>');
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
		}, 400);
		travel += 1;
		updateDistance();
};


function death(){
	$("html").css("cursor","url('./images/explosion.png'), auto");
    setTimeout(function() {
    	$(".btn").html("Reload");
    	$(".btn").css("display","block");
    	$(".btn").click(function() {
	    	location.reload();
		});
    }, 400);
}

$(document).ready(function(){
	$("body").delegate(".obs", "mouseover", function(){
		dead = true;
	    death();
	});

	$("body").delegate(".planet", "mouseover", function(){
		if (travel >= 53) {
			landed = true;
			onPlanet();
		}	
	});
	$(".btn").html("Play");
	$(".btn").on("click", playgame);	
});

function onPlanet(){
	alert("You Landed!")
	//trigger whatever happens after the game
}