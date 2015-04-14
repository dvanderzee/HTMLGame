console.log("Working");
//will hold our base stats, unmodified at all
var BaseStats={
	Level:1,
	Strength:10,
	Toughness:10,
	Dexterity:10,
	Intelligence:10,
	Willpower:10,
	Fellowship:10,
	MaxHP:100,
	MaxMP:50
}

//will hold temporary stats, modified by damage dealt recently, possibly equipment,
//and other stats(since HP and MP are effected by other stats)
var ModifiedStats={
	Level:BaseStats.Level,
	Strength:BaseStats.Strength,
	Toughness:BaseStats.Toughness,
	Dexterity:BaseStats.Dexterity,
	Intelligence:BaseStats.Intelligence,
	Willpower:BaseStats.Willpower,
	Fellowship:BaseStats.Fellowship,
	MaxHP:BaseStats.MaxHP+10*(BaseStats.Toughness-10),
	MaxMP:BaseStats.MaxMP+5*(BaseStats.Intelligence-10),
	CurrentHP:BaseStats.MaxHP+10*(BaseStats.Toughness-10),
	CurrentMP:BaseStats.MaxMP+5*(BaseStats.Intelligence-10),
	XPtoNextLevel:25*BaseStats.Level,
	XP:0
}

ModifiedStats.CurrentHP-=10;

var newPart=document.createElement("h2");
newPart.appendChild(document.createTextNode("Stats:"));
var area=document.getElementById("tester");
area.appendChild(newPart);

for (var key in ModifiedStats){
	var newPart=document.createElement("p");
	newPart.appendChild(document.createTextNode(key));
	newPart.appendChild(document.createTextNode(": "));
	newPart.appendChild(document.createTextNode(ModifiedStats[key]));
	var area=document.getElementById("tester");
	area.appendChild(newPart);
}

LevelUp("Intelligence","Willpower")

var newPart=document.createElement("h2");
newPart.appendChild(document.createTextNode("Updated Stats:"));
var area=document.getElementById("tester");
area.appendChild(newPart);

for (var key in ModifiedStats){
	var newPart=document.createElement("p");
	newPart.appendChild(document.createTextNode(key));
	newPart.appendChild(document.createTextNode(": "));
	newPart.appendChild(document.createTextNode(ModifiedStats[key]));
	var area=document.getElementById("tester");
	area.appendChild(newPart);
}

//function for levelling up. It assumes we only allow to stats to be increased per level
//Also fully heals the character since that's fairly common
function LevelUp(x,y){
	BaseStats.Level+=1;
	BaseStats.MaxHP+=10;
	BaseStats.MaxMP+=5;
	BaseStats[x]+=5;
	BaseStats[y]+=5;
	ModifiedStats.Level=BaseStats.Level;
	ModifiedStats.MaxHP=BaseStats.MaxHP+10*(BaseStats.Toughness-10);
	ModifiedStats.MaxMP=BaseStats.MaxMP+5*(BaseStats.Intelligence-10);
	ModifiedStats.CurrentHP=ModifiedStats.MaxHP;
	ModifiedStats.CurrentMP=ModifiedStats.MaxMP;
	ModifiedStats[x]=BaseStats[x];
	ModifiedStats[y]=BaseStats[y];
	ModifiedStats.XPtoNextLevel*=4;
	ModifiedStats.XP=0;
}

//function for updating modified stats depending upon buffs/debuffs from equipment and monsters
//currently just resets all stats to their base forms
function updateModifiedStats(){
	ModifiedStats.Strength=BaseStats.Strength;
	ModifiedStats.Toughness=BaseStats.Toughness;
	ModifiedStats.Dexterity=BaseStats.Dexterity;
	ModifiedStats.Intelligence=BaseStats.Intelligence;
	ModifiedStats.Willpower=BaseStats.Willpower;
	ModifiedStats.Fellowship=BaseStats.Fellowship;
	ModifiedStats.MaxHP=BaseStats.MaxHP+10*BaseStats.Toughness;
	ModifiedStats.MaxMP=BaseStats.MaxMP+5*BaseStats.Intelligence;
}

//creates Stats heeader
var newPart=document.createElement("h2");
newPart.appendChild(document.createTextNode("Stats"));
var area=document.getElementById("sidebarMenu");
area.appendChild(newPart);

//steps through each item in ModifiedStat array and "prints" them
for (var key in ModifiedStats){
	var newPart=document.createElement("p");
	newPart.appendChild(document.createTextNode(key));
	newPart.appendChild(document.createTextNode(": "));
	temp=ModifiedStats[key];
	newPart.appendChild(document.createTextNode(temp));
	var area=document.getElementById("sidebarMenu");
	area.appendChild(newPart);
}


