var levels = {};

//_1_ means the first question, _2_ is second, etc.
//The letters after the question number indicate the history of choices to get to that point in the branch

levels._1_ = {
	prompt: "New Planet Prompt.",
	a: "Mechanic",
	a_go: "_1_b",
	b: "Explore",
	b_go: "_1_c",
	
	north_go: "_2_",
	south_go: "_3_",
}