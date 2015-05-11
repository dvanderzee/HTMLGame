var levels = {};

//_1_ means the first question, _2_ is second, etc.
//The letters after the question number indicate the history of choices to get to that point in the branch

levels._ship_ = {
	prompt: "You're not finished exploring, no need to stay cooped up in your ship on this beautiful day!",
	a: "Back",
	a_go: "_0_explore"	
}

levels._ship_2 = {
	prompt: "You're not finished exploring, no need to stay cooped up in your ship on this beautiful day!",
	a: "Back",
	a_go: "_1_"	
}

//{ Lines associated with not staying in the camp
levels._0_ = {
	prompt: "Not knowing where to go exactly, you land your ship in the first clearing you spot. All around you is forest, and you can explore in any direction.",
	a: "Enter Ship",
	a_go: "_ship_",
	b: "Explore",
	b_go: "_0_explore",
	
	north: "North",
	south: "South",
	east: "East",
	west: "West",
	north_go: "_0_north",
	east_go: "_0_east",
	south_go: "_0_south",
	west_go: "_0_west",
}

levels._0_explore = {
	prompt: "Not much to see here, probably should head in a different direction...",
	a: "Enter Ship",
	a_go: "_ship_",
	north: "North",
	south: "South",
	east: "East",
	west: "West",
	north_go: "_0_north",
	east_go: "_0_east",
	south_go: "_0_south",
	west_go: "_0_west",
}

levels._0_north = {
	prompt: "You roam around but find nothing of consequence.",
	a: "Back",
	a_go: "_0_",
}

levels._0_east = {
	battle: true,
	success: "_0_success",
	fail: "_0_fail",
}

levels._0_south = {
	battle: true,
	success: "_0_success2",
	fail: "_0_fail",
}

levels._0_west = {
	battle: true,
	success: "_0_success",
	fail: "_0_fail",
}

levels._0_success = {
	prompt: "You managed to come out on top, and even got a bit of loot for your troubles.",
	reward: function(){
		addinventory("Gold","Gold","currency",math.Floor((math.Random *10) + 1),null)
	},
	a: "Leave",
	a_go: "_0_explore",
}

levels._0_success2 = {
	prompt: "You managed to come out on top, and even got a bit of loot for your troubles. With him out of your way you are free to continue south",
	reward: function(){
		addinventory("Gold","Gold","currency",math.Floor((math.Random *10) + 1),null)
	},
	a: "Continue",
	a_go: "_0_a",
}

levels._0_fail = {
	prompt: "You have been killed! Gameover",
}

levels._0_a = {
	prompt: "After travelling through the thick jungle for hours you spot a light up ahead. You stumble into a camp.<p> How you missed this is beyond you, there are easily 100 people here.",
	a: "Find Leader",
	a_go: "_0_b",
	
	b: "Return to Ship",
	b_go: "_0_",
}

levels._0_b = {
	prompt: "A short bit of searching later you find the camp coordinator and explain your current situation. He lends you a map, telling you to make a copy then hand it off to his assistant.",
	a: "Next",
	a_go: "_0_minigame",
}

levels._0_minigame = {
	game: "./minigames/jigsawpuzzle/planet3_puzzle.html",
	success: "_map_success",
}

levels._map_success = {
	prompt: "After transcribing a map you return to your ship, and move it into the camp, landing in a designated area.",
	a: "Next",
	a_go: "_1_",
	
}

//}


//{ Lines associated with the camp
levels._1_ = {
	prompt: "You look around the camp. With this many people, you doubt you'll have much luck discovering anything big. <p> The camp coordinator might know the route to the next planet if you ask him. Or you might manage to scrape together some loot by exploring the jungle.",
	a: "Enter Ship",
	a_go: "_ship_2",
	b: "Talk",
	b_go: "_1_talk",
	
	east: "East",
	east_go: "_1_east",
	west: "West",
	west_go: "_1_west",
}

levels._1_a = {
	prompt: "You look around the camp. With this many people, you doubt you'll have much luck discovering anything big. <p> The camp coordinator might know the route to the next planet if you ask him. Or you might manage to scrape together some loot by exploring the jungle.",
	a: "Enter Ship",
	a_go: "_ship_",
	b: "Talk",
	b_go: "_1_talk_b",
	
	east: "East",
	east_go: "_1_east",
	west: "West",
	west_go: "_1_west",
}

levels._1_b = {
	prompt: "Not much to do here except explore some more",
	a: "Explore",
	a_go: "_1_explore",
}

levels._1_explore = {
	battle: true,
	success: "_1_final",
	fail: "_1_fail",
}

levels._1_final = {
	prompt: "After that ambush you've had enough of this place, time to get out of here",
	a: "Find Coordinator",
	a_go: "_1_talk_c",
}

levels._1_talk = {
	prompt: "\"Ah, yes, you're the newest explorer here on the frontier.  I'd love to chat but I'm very buys at the moment. Why don't you do some exploring and come find me later.\"",
	a: "Back",
	a_go: "_1_",
}

levels._1_talk_b = {
	prompt: "\"Hello again. I don't believe I properly introduced myself during our last encounter. My name is Sam, and I'm the coordinator on this planet.  With so many companies vying for control, there was a need for someone to mediate. Currently, you're free to explore, as no official claims have been registered. Until that time, all land here is public. Enjoy your stay.\"",
	a: "Back",
	a_go: "_1_b",
}

levels._1_talk_c = {
	prompt: "You again find the coordinator, and this time before he can lead the conversation you quickly tell him that you are seeking to move on from this planet. \"Oh is that all? You should have said so. You can easily reach the next planet in one jump, I'll get you a file with the coordinates. Come find me later.\"",
	a: "Back",
	a_go: "_1_final",
	b: "Demand Coordinates",
	b_go: "_1_talk_d"
}

levels._1_talk_d = {
	prompt: "\"Right then, the coordinates to the next planet are on this memory unit. Plug it into your ship and you'll be able to set a course. Hopefully you'll find better luck there. You're one of the few to move on from here.\"",
	a: "Ship",
	a_go: "ship_leave",
}

levels._1_east = {
	battle: true,
	success: "_1_success",
	fail: "_1_fail",
}

levels._1_west = {
	battle: true,
	success: "_1_success",
	fail: "_1_fail",
}

levels._1_success = {
	prompt: "You managed to come out on top, and even got a bit of loot for your troubles.",
	reward: function(){
		addinventory("Gold","Gold","currency",math.Floor((math.Random *10) + 1),null)
	},
	a: "Leave",
	a_go: "_1_a",
}

levels._1_fail = {
	prompt: "You have been killed! Gameover",
}

levels.ship_leave = {
	prompt: "You're on your way kid!",
	a: "Fly Away",
	a_go: "_2_"
}

levels._2_ = {
	game: "./minigames/flight/flight3.html",
	success: "_2_success",
	fail: "_2_fail",
}

levels._2_success = {
	prompt: "You've reached the end of our game! Congrats you win!",
}

//}