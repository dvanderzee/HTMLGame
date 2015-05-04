var levels = {};

//_1_ means the first question, _2_ is second, etc.
//The letters after the question number indicate the history of choices to get to that point in the branch

levels._1_ = {
	prompt: "You're in the mechanic's station.  A number of workers are busy inspecting and repairing ships on the station. You spot the mechanic who was handling inspections \
	of your ship. There is an exit to the north and to the south.",
	a: "Mechanic",
	a_go: "_1_b",
	b: "Explore",
	b_go: "_1_c",
	
	north_go: "_2_",
	south_go: "_3_",
}

levels._1_a = {
	prompt: "You've been waiting in the mechanics bay of this space station for 3 hours while a crew inspects your ship.  \
	A number of systems have been malfunctioning, and you wanted it repaired before you began your journey in Sector 17. \
	Finally a mechanic walks through the door. <p>\"So here's the deal Marc.  We've repaired most every system you reported issues with, \
	as well as recalibrating your navigation systems. The biggest problem is with your stellar map. We had to replace the entire console. \
	The new one is all installed, but it doesn't have all of the map files your old one had. You'll have to load in the files currently \
	available for this system.\"",
	a: "Continue",
	a_go: "_1_",
	
	north_go: "_2_",
	south_go: "_3_",
}

levels._1_b = {
	prompt: "You approach the mechanic again, and ask him where you might find the files you need. <p>\"Listen buddy, that's not really my domain. \
	Check out the computers in the room south a' here.  If you got access to 'em then the files you need are on there.\"",
	a: "Continue",
	a_go: "_1_",
	b: "Explore",
	b_go: "_1_c",
	
	north_go: "_2_",
	south_go: "_3_",
}

levels._1_c = {
	prompt: "You look around the mechanic station, but there isn't much to see. They have already moved your ship back into the docking bay to the north.",
	a: "Mechanic",
	a_go: "_1_b",
	b: "Continue",
	b_go: "_1_",
	
	north_go: "_2_",
	south_go: "_3_",
}

levels._2_ = {
	prompt: "You enter the shuttle bay, and see your ship has been moved onto one of the docks now that repairs are complete.\
	<p> To the south is the entrance to the mech station where your ship was repaired.",
	b: "Enter Ship",
	b_go: "_2_a",
	
	south_go: "_1_",
}

levels._2_a = {
	condition: "map",
	pass: "map"
	
}

levels._2_a_accept = {
	game: "./minigames/flight/flight.html",
	success: "_2_a_success",
	fail: "_2_a_fail",

}

levels._2_a_deny = {
	prompt: "You enter your ship.  Looking around, you see the damaged console the mechanic was referring to.  Unfortunately you still don't have the map you need.",
	
	a: "Leave Ship",
	a_go: "_2_",
}
levels._2_a_minigame = {
	game: "./minigames/flight/flight.html",
	success: "_2_success",
	fail: "_2_fail",
}

levels._2_a_success = {
	planet: "planet2"
}

levels._2_a_fail = {
	prompt: "You crashed your ship! Gameover"
}

levels._3_ = {
	prompt: "Leaving the mech station through the door to the south you enter a room filled with computers. \
	Most likely you can find the file you need stored on one of the computers.<p>To the north there is a door leading back into the mech station.",
	a: "Computer",
	a_go: "_3_a",
	north_go: "_1_",
}

levels._3_a = {
	prompt: "You approach the computer and turn it on.",
	a: "Exit",
	a_go: "_3_",
	b: "Activate Minigame",
	b_go: "_3_minigame",
}

levels._3_minigame = {
	game: "./minigames/jigsawpuzzle/Puzzle.html",
	success: "_3_success",
	fail: "_3_fail",
	reward: function(){
		addinventory("map","map","key item",1,null)
	}
}

levels._3_success = {
	prompt: "You have hack into the computer and acquire the files you need on a portable drive!",
	north_go: "_1_",
}

levels._3_ba = {
	prompt: "Prompt 3_ba",
	a: "Option A",
	b: "Option B"
}

levels._3_bb = {
	prompt: "Prompt 3_bb",
	a: "Option A",
	b: "Option B"
}

levels._4_aaa = {
	prompt: "Prompt 4_aaa",
	a: "Option A",
	b: "Option B",
}

levels._4_aab = {
	prompt: "Prompt 4_aab",
	a: "Option A",
	b: "Option B",
	newplanet: true
}

levels._4_aba = {
	prompt: "Prompt 4_aba",
	a: "Option A",
	b: "Option B"
}

levels._4_abb = {
	prompt: "Prompt 4_abb",
	a: "Option A",
	b: "Option B"
}

levels._4_bba = {
	prompt: "Prompt 4_bba",
	a: "Option A",
	b: "Option B"
}

levels._4_bbb = {
	prompt: "Prompt 4_bbb",
	a: "Option A",
	b: "Option B"
}

levels._4_baa = {
	prompt: "Prompt 4_baa",
	a: "Option A",
	b: "Option B"
}

levels._4_bab = {
	prompt: "Prompt 4_bab",
	a: "Option A",
	b: "Option B"
}