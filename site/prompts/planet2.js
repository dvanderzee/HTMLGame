var levels = {};

//_1_ means the first question, _2_ is second, etc.
//The letters after the question number indicate the history of choices to get to that point in the branch

levels._1_ = {
	prompt: "You arrive in orbit around the first planet. A quick scan reveals there is already significant human life on the planet. No surprise, this is the closest planet, every company would send it's scouts here first.",
	a: "Next",
	a_go: "_1_a",

}

levels._1_a = {
	prompt: "You figure you should map out the planet before you land.",
	a: "Stellar Map",
	a_go: "_2_",
	b: "Cargo Bay",
	b_go: "_3_",
	c: "Cockpit"
	c_go: "_4_"
}

levels._2_ = {
	prompt: "In front of you is your stellar map, loaded with the current list of unexplored planets. From orbit you can do a scan of the planet and build a map for yourself."
	a: "Exit",
	a_go: "_1_a",
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
	prompt: "You have constructed a map, and now know where the other explorers are stationed.",
	north_go: "_1_",
}