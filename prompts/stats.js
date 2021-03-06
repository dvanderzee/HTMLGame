

//initializes our base stats,all functions can access it
var Stats={
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
	XPtoLevel:10
}

var hiddenStats={
	planet2Base: false,
	
}

//will set up the original html content for the display of the stats
function statsmain(){
	//creates stat header
	var newPart=document.createElement("h2");
	newPart.innerHTML="Stats:";
	var area = document.getElementById("statMenu");
	area.appendChild(newPart);
	var mytable=document.createElement("table");

	//steps through Stats object and creates each stat display
	for (var key in Stats){
		var row=mytable.insertRow();
		var cellname=row.insertCell();
		var cellvalue=row.insertCell();
		cellname.style.width="100px";
		cellvalue.style.textAlign="right";
		cellname.innerHTML=key;
		cellvalue.innerHTML=Stats[key];
		cellvalue.id="stats"+key;
	}
	area.appendChild(mytable);
}

//function for levelling up. It assumes we only allow to stats to be increased
//per level. Also fully heals the character since that's fairly common
function LevelUp(x,y){
	Stats.Level+=1;
	Stats[x]+=5;
	Stats[y]+=5;
	Stats.MaxHP=10*Stats.Toughness+10*(Stats.Level-1);
	Stats.HP=Stats.MaxHP;
	Stats.MaxMP=5*Stats.Willpower+5*(Stats.Level-1);
	Stats.MP=Stats.MaxMP;
	Stats.XP-=Stats.XPtoLevel;
	Stats.XPtoLevel*=2;
	UpdateDisplay();
}

//will update the html display
function UpdateDisplay(){
	for (var key in Stats){
		var area=document.getElementById("stats"+key);
		area.innerHTML=Stats[key];
	}
}

//if only 1 stat is being increased (mostly XP)
function PlusStat(stat,amount){
	Stats[stat]+=amount;
	if (stat="XP" && Stats.XPtoLevel<=Stats.XP){
		//change main display to ask what stats to level up and then run levelup
		//with those 2 stats
		if (!showingStats){toggle();}
		stat1=prompt("You have levelled up! Enter your first attribute to boost.",
					 "Intelligence");
		while (!(stat1 in Stats)){
			stat1=prompt("Sorry, that was not a valid attribute, maybe \
						 capitalize it?","Strength");
		}
		stat2=prompt("Enter a second attribute to upgrade","Willpower");
		while (stat1==stat2 || !(stat2 in Stats)){
			stat2=prompt("Incorrect input, try again","Toughness");
		}
		LevelUp(stat1,stat2);
	}else if(stat='HP' && Stats.MaxHP<Stats.HP){
		Stats.HP=Stats.MaxHP;
	}else if(stat='MP' && Stats.MaxMP<Stats.MP){
		Stats.MP=Stats.MaxMP;
	}
	UpdateDisplay();
}

//if a stat is being reduced (mostly applicable to health and MP)
function MinusStat(stat,amount){
	Stats[stat]-=amount;
	if (stat="HP" && Stats.HP<=0){
		//print game over,restart game
		if ($('#layoutLeftgame').display=="none"){
			var area = document.getElementById("layoutLeft");
			area.innerHTML="YOU DIED! Refresh your browser to start again!";
			area = document.getElementById("layoutLeftgame");
			area.innerHTML="YOU DIED! Refresh your browser to start again!";
		}else{
			//I WAS AGAINST THIS COURSE SINCE YOU SHOULD BE DEAD AND ALWAYS
			//HAVE TO RESTART THE ENTIRE GAME!! but whatever, this restarts
			//the current battle instead of the entire game...
			$('#player-actions').html("You fall over in pain as you feel the "+
			Monster.Name+"'s attack hit its mark. Your world goes dark.");
			$('#enemy-actions').html("You suddenly feel the world returning,\
				but it's flowing backwards. Time is reverting!");
			$('#enemy-pic').removeClass();
			$('#background').css("background","black");
			$('#Heal').hide();
			$('#Attack').hide();
			$('#MagicMissile').hide();
			$('#Run').hide();
			$('#Restart').show();
		}
	}
	UpdateDisplay();
}

statsmain();