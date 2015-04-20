

//will initialize our base stats,all functions can access it
var BaseStats={
	Level:1,
	Dexterity:10,
	Fellowship:10,
	Intelligence:10,
	Strength:10,
	Toughness:10,
	Willpower:10,
	MaxHP:100,
	MaxMP:50,
	CurrentHP:100,
	CurrentMP:50,
	XPtoNextLevel:25,
	XP:0
}

//will set up the original html content for the display of the stats
function statsmain(){
	var newPart=document.createElement("h2");
	newPart.appendChild(document.createTextNode("Stats:"));
	var area = document.getElementById("statMenu");
	area.appendChild(newPart);


	for (var key in BaseStats){
		var newPart=document.createElement("p");
		newPart.appendChild(document.createTextNode(key));
		newPart.appendChild(document.createTextNode(": "));
		newPart.appendChild(document.createTextNode(BaseStats[key]));
		var area=document.getElementById("statMenu");
		newPart.id="stats"+key;
		area.appendChild(newPart);
	}
	LevelUp("Toughness","Intelligence");
}

//function for levelling up. It assumes we only allow to stats to be increased per level
//Also fully heals the character since that's fairly common
function LevelUp(x,y){
	BaseStats.Level+=1;
	BaseStats[x]+=5;
	BaseStats[y]+=5;
	BaseStats.MaxHP=10*BaseStats.Toughness+10*(BaseStats.Level-1);
	BaseStats.MaxMP=5*BaseStats.Intelligence+5*(BaseStats.Level-1);
	BaseStats.CurrentHP=BaseStats.MaxHP;
	BaseStats.CurrentMP=BaseStats.MaxMP;
	BaseStats.XPtoNextLevel*=4;
	BaseStats.XP=0;
	UpdateDisplay();
}

//will update the html display
function UpdateDisplay(){
	for (var key in BaseStats){
		var area=document.getElementById("stats"+key);
		area.innerHTML=key+": "+BaseStats[key];
	}
}

statsmain();