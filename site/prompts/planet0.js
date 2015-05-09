var levels = {};

//_1_ means the first question, _2_ is second, etc.
//The letters after the question number indicate the history of choices to get to that point in the branch

//{ Lines associated with Mapping the planet
levels._1_ = {
	prompt: "A desert. Thats just perfect. You'll need to find water, and do your best to avoid the natives, they're known to be pretty hostile towards visitors.",
	a: "Explore",
	a_go: "_1_explore",
	b: "Salvage machinery",
	b_go: "_1_salvage"
	
}

levels._1_salvage = {
	prompt: "After rummaging through the wreckage you come across a data slate. It's a mapping tool, and its still active. It must have scanned the planet during descent, now you can build a map.",
	a: "Map",
	a_go: "_1_minigame",
	b: "Back",
	b_go: "_1_"
	
}

levels._1_minigame = {
	game: "./minigames/jigsawpuzzle/planet0_puzzle.html",
	success: "_1_success",
	fail: "_1_fail",
	reward: function(){
		hiddenStats.planet0Map = true;
	}
}

levels._1_success = {
	prompt: "Now that you have this map, it should be easier to find water, assuming all of the scans are accurate. It was a crash landing after all.",
	north_go: "_2_b",
}
	
}

//{ Lines associated with exploration
levels._1_explore = {
	explore: function(){
		explore(50,25,"_1_oasis");
	}
}

levels._1_oasis = {
	prompt: "Skin scorched and throat parched you finally find an oasis. You're quick to fill your waterskins, and take a long slow drink from the pool; all from the shade of a lemon tree. Now that you're stocked you just need to hold out until rescue arrives.",
	a: "Return to your ship",
	a_go: "_2_"
	
}
	
	
}



//{ Waiting for rescue, being attacked while you do.
levels._2_ = {
	prompt: "Back at your ship, now with supplies to last, you need to wait, and hope you dont get attacked while you do.",
	a: "Next",
	a_go: "_2_wait_"
	
}
	
levels._2_wait_ = {
	explore: function(){
		explore(50,25,"_2_rescue");
	}
}

levels._2_wait_fight_ = {
	game: "./minigames/BattleGame/battle.html",
	success: "_2_success",
	fail: "_2_fail",
}

levels._2_success = {
	prompt: "You managed to come out on top, and even got a bit of loot for your troubles. You're still stuck waiting though.",
	reward: function(){
		addinventory("Gold","Gold","currency",math.Floor((math.Random *10) + 1),null)
	},
	a: "Wait",
	a_go: "_2_wait"
}

levels._2_fail = {
	prompt: "You have been killed! Gameover"
}

levels._2_rescue = {
	prompt: "Finally help arrives. You are escorted onto a transport ship and brought to the nearby space station.",
	a: "Next",
	a_go: "_2_leave"
}

levels._2_leave = {
	location: "planet1.js",
	start: "_1_a"
}
}

