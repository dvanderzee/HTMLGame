//the enemy object constructor
function Enemy(Name,Strength,HP,level,xp,chance){
	this.Name=Name;
	this.Strength=Strength;
	this.HP=HP;
	this.MaxHP=HP;
	this.level=level;
	this.XP=xp;
	this.Chance=chance;
}

//the four enemies that you might face
var Grunt = new Enemy('Grunt', 50, 50, 1, 10, 20);
var Bandit = new Enemy('Bandit', 15, 75, 2, 20, 15);
var Assassin = new Enemy('Assassin', 20, 100, 3, 30, 10);
var Eldar = new Enemy('Eldar', 25, 125, 4, 40, 5);

var Monster=Grunt;
//changes the enemy you will fight depending upon your level
var EnemyChoice = function() {
	switch (Stats.Level) {
		case 1:
			Monster=Grunt;
			break;
		case 2:
			Monster=Bandit;
			break;
		case 3:
			Monster=Assassin;
			break;
		default:
			Monster=Eldar;
			break;
	}
}

//initializes the scene for the battle
function battlemain(){
	$('#layoutLeftgame').css("display","block");
	$('#layoutLeft').css("display","none");
	$('#movementButtons').hide();
	$('#invStatToggle').hide();
	$('#exit').hide();
	$('#Restart').hide();
	if (!showingStats){toggle();}
	
	//displays the characters most important stats
	$('#HP-Current').html(Stats.HP);
	$('#HP-Total').html(Stats.MaxHP);
	$('#MP-Current').html(Stats.MP);
	$('#MP-Total').html(Stats.MaxMP);
	
	EnemyChoice();
	//displays the health and name of the monster
	$('#Monster-Name').html(Monster.Name);
	$('#Monster-HP').html(Monster.HP);
	$('#Monster-HP-Total').html(Monster.MaxHP);
	$('#enemy-pic').addClass(Monster.Name);
	$('#player-actions').html("A "+Monster.Name+" jumps out of the \
							  forest in front of you!");
	$('#enemy-actions').html("Tip: Don't feel afraid to use your spells! You \
							have them for a reason!");
	$('#Heal').show();
	$('#Attack').show();
	$('#MagicMissile').show();
	$('#Run').show();
}

//displays the updated stats in-game
function displayStats() {
	$('#HP-Current').html(Stats.HP);
	$('#MP-Current').html(Stats.MP);
	$('#Monster-HP').html(Monster.HP);
}

//determines whether or not an attack is critical
function Critical(){
	chance=Math.random();
	if (chance<=.05){
		return true;
	}else{
		return false;
	}
}

//will determine the variation of all hits
function Randomize(amount){
	var variation=Math.random()*amount;
	var minusorplus=Math.random();
	if (minusorplus<.5){
		return variation;
	}else{
		return 0-variation;
	}
}

//will add bonus damage/armor/intelligence... from your equipment
function EquipStats(stat){
	var bonus=0;
	for (var item in equipment){
		if (equipment[item]!="empty" && equipment[item].effect[0]==stat){
			bonus+=equipment[item].effect[1];
		}
	}
	return bonus;
}

//controls the monster attacks and the case of a dead monster/player
function MonsterAttack(){
	if (Monster.HP<=0){
		$('#enemy-actions').html("You have killed the "+Monster.Name+"! You gain "+
		Monster.XP+" xp!");
		PlusStat("XP",Monster.XP);
		displayStats();
		$('#HP-Total').html(Stats.MaxHP);
		$('#MP-Total').html(Stats.MaxMP);
		$('#Heal').hide();
		$('#Attack').hide();
		$('#MagicMissile').hide();
		$('#Run').hide();
		Monster.HP=Monster.MaxHP;
		$('#exit').show();
	}
	else{
		if (Math.random()*100>Monster.Chance){
			var damage=Monster.Strength+Randomize(Monster.Chance/5);
			var iscrit="";
			if (Critical()){damage*=2;iscrit="! It's a Critical Hit!";}
			var armor=Stats.Toughness/10+Math.floor(EquipStats("Toughness"));
			damage-=armor;
			damage=Math.max(Math.floor(damage),0);
			$('#enemy-actions').html("The "+Monster.Name+" hits you for "+damage+
									 " damage"+iscrit);
			MinusStat("HP",damage);
		}else{
			$('#enemy-actions').html("The "+Monster.Name+" misses you by a hair!");
			if (Math.random()<.01){
				$('#enemy-actions').html("The "+Monster.Name+" maniacally laughs \
					instead of attacking. It starts choking on it's laughter. \
					You withhold the urge to facepalm.");
				Monster.HP-=Monster.Strength/2;
			}
		}
		displayStats();
	}
}

//will go back to the story once you have finished your fight
$('#exit').click(function(){
	$('#layoutLeftgame').css("display","none");
	$('#layoutLeft').css("display","block");
	$('#movementButtons').show();
	$('#invStatToggle').show();
	update(levels[level].success);
});

$('#Restart').click(function(){
	Monster.HP=Monster.MaxHP;
	Stats.HP=Stats.MaxHP;
	Stats.MP=Stats.MaxMP;
	UpdateDisplay();
	battlemain();
	$('#player-actions').html("Time stops rewinding and you are once again \
			faced with the "+Monster.Name+". It does not seem to have any \
			clue of what just happened.");
	$('#enemy-actions').html("Maybe this time you'll be successful...");
});

//lets the character heal mid-battle button
$('#Heal').click(function(){
	mana=Math.max(Math.ceil(10-Stats.Intelligence/10),5);
	if (Stats.MP>=mana){
		//chance that your spell simply fizzles, always one in a hundred
		if (Math.random()>.01){
			var healing=Math.max(Stats.Intelligence*2+EquipStats("Intelligence")+
						Randomize(Stats.Level*9),0);
			var iscrit="";
			if (Critical()){healing*=2;iscrit="! It's a Critical Heal!";}
			healing=Math.floor(healing);
			PlusStat("HP",healing);
			MinusStat("MP",mana);
			$('#player-actions').html("You heal "+healing+" health"+iscrit);
		}else{
			$('#player-actions').html("Your spell fizzles unexpectedly.");
			//chance that your spell backfires :( 1/1000 chance of happening
			if (Math.random()<.01){
				MinusStat("HP",Math.floor(Stats.MaxHP/10));
				$('#player-actions').html("You hear faint laughter as the \
				gods laugh at your misfortune. You lose some health.");
			}
		}
		MonsterAttack();
	}else{
		$('#player-actions').html("You don't have enough Mana for that!");
		$('#enemy-actions').html("");
	}
});

//the main way to attack button
$('#Attack').click(function(){
	if (Math.random()*100>Math.max(12-Stats.Dexterity/5,1)){
		var damage=Stats.Strength/2+EquipStats("Strength")+Randomize(3*Stats.Level);
		var iscrit="";
		if (Critical()){damage*=2;iscrit="! It's a Critical Hit!";}
		damage=Math.max(Math.floor(damage),0);
		Monster.HP-=damage;
		$('#player-actions').html("You deal "+damage+" damage to the "+
				Monster.Name+iscrit);
	}else{
		$('#player-actions').html("You clumsily attack the "+Monster.Name+
				" and it easily sidesteps, taunting you while it's at it.");
		if (Math.random()<.01){
			$('#player-actions').html("In a moment of insanity, you forget \
				that you are in battle and start dancing a jig. The opening \
				costs you a hit in the midsection");
			MinusStat("HP",Stats.MaxHP/10-4);
		}
	}
	MonsterAttack();
});

//the wizard's path of attacking button
$('#MagicMissile').click(function(){
	mana=Math.max(Math.ceil(7-Stats.Intelligence/10),3);
	if (Stats.MP>=mana){
		if (Math.random()>.01){
			var damage=Math.pow(Stats.Intelligence/5,2)+EquipStats("Intelligence")+
					   Randomize(Stats.Level*3);
			var iscrit="";
			if (Critical()){damage*=2;iscrit="! It's a Critical Hit!";}
			damage=Math.max(Math.floor(damage),0);
			Monster.HP-=damage;
			MinusStat("MP",mana);
			$('#player-actions').html("You deal "+damage+" to the "+
									  Monster.Name+iscrit);
		}else{
			$('#player-actions').html("Your spell fizzles unexpectedly.");
			if (Math.random()<.01){
				Monster.HP-=99999;
				MinusStat("HP",Stats.MaxHP/10);
				$('#player-actions').html("A fireball bursts from your hands, \
					engulfing the "+Monster.Name+"! Your skin is crisped a bit \
					from the flames but your foe is but a pile of ash.");
			}
		}
		MonsterAttack();
	}else{
		$('#enemy-actions').html("You don't have enough mana for that!");
		$('#player-actions').html("");
	}
});

//run like a pansy button
$('#Run').click(function(){
	MonsterAttack();
	chancetorun=Math.random()*100;
	if (Monster.Chance>chancetorun){
		$('#player-actions').html("You run like a little bitch, don't you feel proud?");
		$('#Heal').hide();
		$('#Attack').hide();
		$('#MagicMissile').hide();
		$('#Run').hide();
		Monster.HP=Monster.MaxHP;
		$('#exit').show();
	}else{
		$('#player-actions').html("You attempt to run but your pathetic legs are \
								stiffened with fear. Better luck next time wimp.");
		if (Math.random()<.01){
			$('#player-actions').html("You somehow manage to trip over yourself \
				in your retreat and bruise your ribs on a root. You notice \
				the "+Monster.Name+"'s laughter and redden slightly.");
			MinusStat("HP",3);
		}
	}
});


