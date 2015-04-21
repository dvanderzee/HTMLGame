var levels = {};

//_1_ means the first question, _2_ is second, etc.
//The letters after the question number indicate the history of choices to get to that point in the branch

levels.dialogue = function() {
	//Run dialogue based on location
	switch (coord[0]) {
		case 0:
			switch (coord[1]) {
				case 0:
					levels.prompt = "prompt 1"
					levels.a = "North"
					levels.b = "Option B"
					break
				case 1:
					levels.prompt = "prompt 2"
					levels.a = "South"
					levels.b = "Option B"
					break
			}
			break
		case 1:
				switch (coord[1]) {
					case 0:
						levels.prompt = "prompt 2"
						levels.a = "South"
						levels.b = "Option B"
						break
					case 1:
						levels.prompt = "prompt 2"
						levels.a = "South"
						levels.b = "Option B"
						break
				}
			break
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