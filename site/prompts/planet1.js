var levels = {};

//_1_ means the first question, _2_ is second, etc.
//The letters after the question number indicate the history of choices to get to that point in the branch

levels._1_ = {
	prompt: "An alien approaches and greets you.",
	a: "Wave",
	b: "Kill it"
	//location: "" [Info about the current area could go here if we are doing nav through areas]
}

levels._2_a = {
	prompt: "The alien befriends you and gives you a mountain of treasure.",
	a: "Retire",
	b: "Sell and buy a ship"
}

levels._2_b = {
	prompt: "The dead alien's blood is all over you. Guards have been alerted.",
	a: "Hide",
	b: "Get ready to fight"
}

levels._3_aa = {
	prompt: "You fly home and start a family.",
	a: "Game over",
	b: "Play again"
}

levels._3_ab = {
	prompt: "You use warp drive to visit the next planet.",
	a: "Land in the city",
	b: "Land in the wilderness"
}