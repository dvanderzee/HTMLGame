

//initializes our base stats,all functions can access it
var BaseStats={
	Level:1,
	Dexterity:10,
	Fellowship:10,
	Intelligence:10,
	Strength:10,
	Toughness:10,
	Willpower:10,
	HP:100,
	MaxHP:100,
	MP:50,
	MaxMP:50,
	XP:0,
	XPtoLevel:25
}

//will set up the original html content for the display of the stats
function statsmain(){
	//creates stat header
	var newPart=document.createElement("h2");
	newPart.innerHTML="Stats:";
	var area = document.getElementById("statMenu");
	area.appendChild(newPart);
	var mytable=document.createElement("table");

	//steps through BaseStats object and creates each stat display
	for (var key in BaseStats){
		var row=mytable.insertRow();
		var cellname=row.insertCell();
		var cellvalue=row.insertCell();
		cellname.style.width="100px";
		cellvalue.style.textAlign="right";
		cellname.innerHTML=key;
		cellvalue.innerHTML=BaseStats[key];
		cellvalue.id="stats"+key;
	}
	area.appendChild(mytable);
	PlusStat("XP",26);
	MinusStat("HP",92);
}

//function for levelling up. It assumes we only allow to stats to be increased per level
//Also fully heals the character since that's fairly common
function LevelUp(x,y){
	BaseStats.Level+=1;
	BaseStats[x]+=5;
	BaseStats[y]+=5;
	BaseStats.MaxHP=10*BaseStats.Toughness+10*(BaseStats.Level-1);
	BaseStats.HP=BaseStats.MaxHP;
	BaseStats.MaxMP=5*BaseStats.Intelligence+5*(BaseStats.Level-1);
	BaseStats.MP=BaseStats.MaxMP;
	BaseStats.XP-=BaseStats.XPtoLevel;
	BaseStats.XPtoLevel*=4;
	UpdateDisplay();
}

//will update the html display
function UpdateDisplay(){
	for (var key in BaseStats){
		var area=document.getElementById("stats"+key);
		area.innerHTML=BaseStats[key];
	}
}

//if only 1 stat is being increased (mostly XP)
function PlusStat(stat,amount){
	BaseStats[stat]+=amount;
	if (stat="XP" && BaseStats.XPtoLevel<=BaseStats.XP){
		//change main display to ask what stats to level up and then run levelup
		//with those 2 stats
		LevelUp("Toughness","Intelligence");
	}
	UpdateDisplay();
}

//if a stat is being reduced (mostly applicable to health and MP)
function MinusStat(stat,amount){
	BaseStats[stat]-=amount;
	if (stat="HP" && BaseStats.HP<0){
		//print game over,restart game
		var area = document.getElementById("statMenu");
		area.innerHTML="YOU DIED!";
	}else{
		UpdateDisplay();
	}
}

statsmain();