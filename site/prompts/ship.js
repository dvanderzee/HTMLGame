var levels = {};

//_1_ means the first question, _2_ is second, etc.
//The letters after the question number indicate the history of choices to get to that point in the branch

//{ Lines associated with Planet 0
levels._0_ = {
	prompt: "You're on your way to a Government space port, the midway point \
			between explored space and the frontier. After nearly 3 days of \
			travel you only have a few hours remaining. <p> Once docked, you \
			can have your ship repaired an refuelled.",
	a: "Next",
	a_go: "_0_a",
}

levels._0_a = {
	prompt: "Alarms start going off, and lights all around are flashing. \
			Emergency systems begin as the whole ship thrashes violently, \
			you're fairly certain something just exploded. No time to waste \
			worrying about that, you need to land. The nearest planet is a wild \
			planet, but it's close enough to send out an S.O.S. ",
	a: "Fly",
	a_go: "_0_a_minigame",
}

levels._0_a_minigame = {
	game: "./minigames/flight/flight1.html",
	success: "_0_a_success",
	fail: "_0_a_fail",

}

levels._0_a_success = {
	prompt: "After a very rough landing you do a quick damage report. Your ship\
			is a bit of a wreck, with some scrap parts and machines strewn \
			about, seems they fell out of the cargo bay. One of the fuel cells \
			overheated, and became unstable. That would be the explosion. \
			You've also completely lost the stellar map. Luckily Comms are \
			still online, and an S.O.S. has been sent. Now you just need to \
			last long enough for help to arrive.",
	a: "Exit Ship",
	a_go: "_0_exit"
}

levels._0_exit = {
	location: "planet0",
	start: "_1_"
}

levels._0_a_fail = {
	prompt: "You've crashed your ship! Gameover"
}

//}


//{ Lines associated with Planet 1
levels._1_check = {
	condition: "Starmap",
	pass: "Starmap"
	
}


//}


//{ Lines associated with Planet 1

levels._1_deny = {
	prompt: "You enter your ship. Looking around, you see the damaged console \
			the mechanic was referring to. Unfortunately you still don't have \
			the map you need.",
	
	a: "Leave Ship",
	a_go: "_1_a",
	
	north_go: "_1_deck",
	south_go: "_1_cargo"
}

levels._1_accept = {
	prompt: "You enter your ship. Looking around, you see the damaged console \
			the mechanic was referring to. Now that you've acquired the files \
			you need, you can navigate to the first newly charted planet and \
			begin exploring.",
	
	a: "Take Off",
	a_go: "_1_minigame",
	
	north_go: "_1_cockpit",
	south_go: "_1_cargo"
}

levels._1_cockpit = {
	prompt: "You're in the cockpit of your ship. There isn't much to see here, \
			your pilot's seat and the controls. Everything seems to be in order,\
			you should set a course back on the bridge before doing anything though.",
	south_go: "_1_check"
}

levels._1_cargo = {
	prompt: "You're in your ships cargo bay. The room is stocked with supplies \
			for your journey.",
	north_go: "_1_check"
}

levels._1_a_minigame = {
	game: "./minigames/flight/flight.html",
	success: "_1_success",
	fail: "_1_fail",
}

levels._1_success = {
	a: "Next",
	a_go: "_2_"
}

levels._1_fail = {
	prompt: "You crashed your ship! Gameover"
}

levels._1_a = {
	location: "planet1.js",
	start: "_2_"
}

//}

//{ Lines associated with Planet 2
levels._2_ = {
	prompt: "You arrive in orbit around the first planet. A quick scan reveals \
			there is already significant human life on the planet. No surprise,\
			this is the closest planet, every company would send it's scouts here first.",
	a: "Next",
	a_go: "_2_a",

}

levels._2_a = {
	prompt: "You figure you should map out the planet before you land.",
	a: "Stellar Map",
	a_go: "_2_b",
	b: "Cargo Bay",
	b_go: "_2_cargo",
	c: "Cockpit",
	c_go: "_2_cockpit",
}

levels._2_cockpit = {
	prompt: "You're in the cockpit of your ship. Are you ready to fly down to the planet?",
	a: "Fly",
	a_go: "_2_minigame_2",
	
	south_go: "_2_a"
}

levels._2_cargo = {
	prompt: "You're in your ships cargo bay. The room is stocked with supplies \
			for your journey.",
	north_go: "_2_a"
}

levels._2_b = {
	prompt: "In front of you is your stellar map, loaded with the current list \
			of unexplored planets. From orbit you can do a scan of the planet \
			and build a map for yourself.",
	a: "Exit",
	a_go: "_2_a",
	b: "Activate Minigame",
	b_go: "_2_minigame",
}

levels._2_minigame = {
	game: "./minigames/jigsawpuzzle/planet2_puzzle.html",
	success: "_2_success",
	fail: "_2_fail",
	reward: function(){
		hiddenStats.planet2Base = true;
	}
}

levels._2_success = {
	prompt: "You have constructed a map, and now know where the other explorers\
			are stationed.",
	north_go: "_2_b",
}

levels._2_b = {
	prompt: "Now that you have your map, you are fully prepared to land.",
	a: "Cargo Bay",
	a_go: "_2_cargo",
	b: "Cockpit",
	b_go: "_2_cockpit",
}

levels._2_minigame_2 = {
	game: "./minigames/flight/flight.html",
	success: "_2_flight_success",
	fail: "_2_flight_fail",

}

levels._2_flight_success = {
	condition: "map",
	pass: "hiddenStats.planet2Base"
}

levels._2_fail = {
	prompt: "You crashed your ship! Gameover"
}

levels._2_deny = {
	location: "planet2.js",
	start: "_0_"
}

levels._2_accept = {
	location: "planet2.js",
	start: "_1_"
}

levels._2_c = {
	prompt: "You enter your ship. Looking around, you see the damaged console \
	the mechanic was referring to. Unfortunately you still don't have the map you need.",
	
	a: "Leave Ship",
	a_go: "_1_a",
	
	north_go: "_2_c_deck",
	south_go: "_2_c_cargo"
}

levels._2_c_cockpit = {
	prompt: "You're in the cockpit of your ship. Without new intel there's nowhere to go.",

	south_go: "_2_c"
}

levels._2_c_cargo = {
	prompt: "You're in your ships cargo bay. The room is stocked with supplies\
			for your journey.",
	north_go: "_2_c"
}

//}