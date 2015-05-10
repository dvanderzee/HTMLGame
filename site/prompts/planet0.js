var levels = {};

//_1_ means the first question, _2_ is second, etc.
//The letters after the question number indicate the history of choices to get to that point in the branch

//{ Lines associated with Mapping the planet
levels._1_ = {
	prompt: "A desert. That's just perfect. You'll need to find water, and do your best to avoid the natives, they're known to be pretty hostile towards visitors.",
	a: "Explore",
	a_go: "_2_",
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
	game: "./minigames/jigsawpuzzle/planet1_puzzle.html",
	success: "_1_success",
	fail: "_1_fail",
	reward: function(){
		hiddenStats.planet0Map = true;
	}
}

levels._1_success = {
	prompt: "Now that you have this map, it should be easier to find water (NORTH!), assuming all of the scans are accurate. It was a crash landing after all.",
	north: "North",
	north_go: "_3_"
}

levels._2_ = {
	prompt: "You can look for water in the distance or search for what you can find in the brush",
	a: "Water",
	a_go: "_3_",
	b: "Search Brush",
	b_go: "_4_battle"
}

levels._3_ = {
	prompt: "Skin scorched and throat parched you finally find an oasis. You're quick to fill your waterskins, and take a long slow drink from the pool; all from the shade of a lemon tree. Now that you're stocked you just need to hold out until rescue arrives.",
	a: "Return to your ship",
	a_go: "_5_"	
}

levels._4_ = {
	prompt: "You're under attack!",
	a: "Fight",
	a_go: "_4_battle"
}

levels._4_battle = {
	battle: true,
	success: "_4_success",
	fail: "_4_fail"
}

levels._4_success = {
	prompt: "You managed to come out on top, and even got a bit of loot for your troubles. You're still stuck waiting though.",
	a: "Back",
	a_go: "_2_"
}
	
levels._4_fail = {
	prompt: "You died. Game Over."
}	

//{ Waiting for rescue, being attacked while you do.
levels._5_ = {
	prompt: "Finally help arrives. You are escorted onto a transport ship and brought to the nearby space station.",
	a: "Next",
	a_go: "_6_"
}

levels._6_ = {
	location: "planet1",
	start: "_1_a"
}

