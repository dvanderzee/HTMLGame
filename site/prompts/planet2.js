var levels = {};

//_1_ means the first question, _2_ is second, etc.
//The letters after the question number indicate the history of choices to get to that point in the branch

levels._ship_ = {
	location: "ship.js",
	start: "_2_c"
	
}

//{ Lines associated with not staying in the camp
levels._0_ = {
	prompt: "Not knowing where to go exactly, you land your ship in the first clearing you spot. All around you is forest, and you can explore in any direction."
	a: "Enter Ship",
	a_go: "_ship_"
	b: "Explore",
	b_go: "_0_explore_"
	
	north_go: "_0_north",
	east_go: "_0_east",
	south_go: "_0_south",
	west_go: "_0_west",
}

levels._0_explore_ = {
	explore: function(){
		explore(50,10,"_0_a");
	}
}

levels._0_north = {
	explore: function(){
		explore(20,5,"_0_a");
	}
}

levels._0_east = {
	explore: function(){
		explore(10,70,"_0_a");
	}
}

levels._0_south = {
	explore: function(){
		explore(5,20,"_0_a");
	}
}

levels._0_west = {
	explore: function(){
		explore(10,5,"_0_a");
	}
}

levels._0_none = {
	prompt: "You roam around but find nothing of consequence.",
	a: "Back",
	a_go: "_0_",

}

levels._0_fight_ = {
	game: "./minigames/BattleGame/battle.html",
	success: "_0_success",
	fail: "_0_fail",

}

levels._0_success = {
	prompt: "You managed to come out on top, and even got a bit of loot for your troubles.",
	reward: function(){
		addinventory("Gold","Gold","currency",math.Floor((math.Random *10) + 1),null)
	},
	a: "Leave",
	a_go: "_0_"
}

levels._0_fail = {
	prompt: "You have been killed! Gameover"
}

levels._0_a = {
	prompt: "After travelling through the thick jungle for hours you spot a light up ahead. You stumble into a camp.<p> How you missed this is beyond you, there are easily 100 people here.",
	a: "Find Leader",
	a_go: "_0_b",
	
	b: "Leave",
	b_go: "_0_"
}

levels._0_b = {
	prompt: "A short bit of searching later you find the camp coordinator and explain your current situation. He lends you a map, telling you to make a copy then hand it off to his assistant.",
	a: "Next",
	a_go: "_0_minigame"
}

levels._0_minigame = {
	game: "./minigames/jigsawpuzzle/planet2.html",
	success: "_map_success",
}

levels._map_success = {
	prompt: "After transcribing a map you return to your ship, and move it into the camp, landing in a designated area.",
	a: "Next",
	a_go: "_1_"
	
}

//}


//{ Lines associated with the camp
levels._1_ = {
	prompt: "You look around the camp. With this many people, you doubt you'll have much luck discovering anything big. <p> The camp coordinator might know the route to the next planet if you ask him. Or you might manage to scrape together some loot by exploring the jungle."
	a: "Enter Ship",
	a_go: "_ship_"
	b: "Talk",
	b_go: "_1_talk"
	
	north_go: "_1_north",
	east_go: "_1_east",
	south_go: "_1_south",
	west_go: "_1_west",
}

levels._1_talk = {
	condition: "coordinator",
}

levels._1_talk_a = {
	prompt: "\"Ah, yes, you're the newest explorer here on the frontier.  I'd love to chat but I'm very buys at the moment. Why don't you do some exploring and come find me later.\"",
	a: "Back",
	a_go: "_1_"
}

levels._1_talk_b = {
	prompt: "\"Hello again. I don't believe I properly introduced myself during our last encounter. My name is Sam, and I'm the coordinator on this planet.  With so many companies vying for control, there was a need for someone to mediate. Currently, you're free to explore, as no official claims have been registered. Until that time, all land here is public. Enjoy your stay.\"",
	a: "Back",
	a_go: "_1_"
}

levels._1_talk_c = {
	prompt: "You again find the coordinator, and this time before he can lead the conversation you quickly tell him that you are seeking to move on from this planet. \"Oh is that all? You should have said so. You can easily reach the next planet in one jump, I'll get you a file with the coordinates. Come find me later.\"",
	a: "Back",
	a_go: "_1_"
}

levels._1_talk_d = {
	prompt: "\"Right then, the coordinates to the next planet are on this memory unit. Plug it into your ship and you'll be able to set a course. Hopefully you'll find better luck there. You're one of the few to move on from here.\"",
	a: "Back",
	a_go: "_1_"
}

levels._1_north = {
	explore: function(){
		explore(20,null,null);
	}
}

levels._1_east = {
	explore: function(){
		explore(10,null,null);
	}
}

levels._1_south = {
	explore: function(){
		explore(5,null,null);
	}
}

levels._1_west = {
	explore: function(){
		explore(10,null,null);
	}
}

levels._1_fight_ = {
	game: "./minigames/BattleGame/battle.html",
	success: "_0_success",
	fail: "_0_fail",

}

levels._1_success = {
	prompt: "You managed to come out on top, and even got a bit of loot for your troubles.",
	reward: function(){
		addinventory("Gold","Gold","currency",math.Floor((math.Random *10) + 1),null)
	},
	a: "Leave",
	a_go: "_1_"
}

levels._1_fail = {
	prompt: "You have been killed! Gameover"
}

//}