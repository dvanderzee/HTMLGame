var levels = {};

//_1_ means the first question, _2_ is second, etc.
//The letters after the question number indicate the history of choices to get to that point in the branch

levels.dialogue = function() {
	//Run dialogue based on location
	switch (coord[0]) {
		case 0:
			switch (coord[1]) {
				// Coord [0,0]
				case 0:
					levels.prompt = "You've been waiting in the mechanics bay of this space station for 3 hours while a crew inspects your ship.  A number of systems have been malfunctioning, and you wanted it repaired before you began your journey in Sector 17. Finally a mechanic walks through the door. <p>\"So here's the deal Marc.  We've repaired most every system you reported issues with, as well as recalibrating your navigation systems. The biggest problem is with your stellar map. We had to replace the entire console. The new one is all installed, but it doesn't have all of the map files your old one had. You'll have to load in the files currently available for this system.\""
					levels.a = "North"
					levels.b = "South"
					break
				case 1:
					levels.prompt = "prompt 2"
					levels.a = "South"
					levels.b = "Option B"
					break
			}
			break
		case (-1):
				// Coord [-1,0]
				switch (coord[1]) {
					case 0:						
						if (computer == true){
							console.log("You have activated the computer")
							levels.prompt = "You approach the computer and turn it on."
							levels.a = "Exit"
							levels.b = ""
							break
						} else
							levels.prompt = "Leaving the mech station through the door to the south you enter a room filled with computers. Most likely you can find the file you need stored on one of the computers.<p>To the north there is a door leading back into the mech station."
							levels.a = "North"
							levels.b = "Computer"
						break
				}
			break
		case 1:
			switch (coord[1]) {
				// Coord [1,0]
				case 0:
					levels.prompt = "You enter the shuttle bay, and see your ship has been moved onto one of the docks now that repairs are complete.<p> To the south is the entrance to the mech station where your ship was repaired."
					levels.a = "South"
					levels.b = "Enter Ship"
			}
	}
	
}

levels._1_ = {
	prompt: "Prompt 1",
	a: "Option A",
	b: "Option B"
}

levels._2_a = {
	prompt: "Prompt 2_a",
	a: "Option A",
	b: "Option B"
}

levels._2_b = {
	prompt: "Prompt 2_b",
	a: "Option A",
	b: "Option B",
	game: "../Minigames/JigsawPuzzle/Puzzle.html"
}

levels._3_aa = {
	prompt: "Prompt 3_aa",
	a: "Option A",
	b: "Option B",
	item: "item1"
}

levels._3_ab = {
	prompt: "Prompt 3_ab",
	a: "Option A",
	b: "Option B"
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