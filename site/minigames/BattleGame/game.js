//the enemy object constructor
function Enemy(Name,Strength,HP,level,xp){
	this.Name=Name;
	this.Strength=Strength;
	this.HP=HP;
	this.MaxHP=HP;
	this.level=level;
	this.XP=xp;
}

//the four enemies that you might face
var Grunt = new Enemy('Grunt', 8, 100, 1, 10);
var Bandit = new Enemy('Bandit', 12, 125, 2, 20);
var Assassin = new Enemy('Assassin', 16, 150, 3, 30);
var Eldar = new Enemy('Eldar', 20, 200, 4, 40);

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
	$('#enemy-actions').html("Here's a tip: Heal may take 2 turns but you can \
							 use it a lot more than potions so try it out!");
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
	var variation=Math.random()*amount*3;
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
		displayStats();
		$('#enemy-actions').html("You have killed the "+Monster.Name+"! You gain "+
		Monster.XP+" xp!");
		PlusStat("XP",Monster.XP);
		$('#Heal').hide();
		$('#Attack').hide();
		$('#MagicMissile').hide();
		$('#Run').hide();
		Monster.HP=Monster.MaxHP;
		$('#exit').show();
	}
	else{
		var damage=Monster.Strength+Randomize(Stats.Level);
		var iscrit="";
		if (Critical()){damage*=2;iscrit="! It's a Critical Hit!";}
		var armor=Stats.Toughness/10+Math.floor(EquipStats("Toughness"));
		damage-=armor;
		damage=Math.floor(damage);
		MinusStat("HP",damage);
		displayStats();
		$('#enemy-actions').html("The "+Monster.Name+" hits you for "+damage+
								 " damage"+iscrit);
	}
}

//will go back to the story once you have finished your fight
$('#exit').click(function(){
	$('#layoutLeftgame').css("display","none");
	$('#layoutLeft').css("display","block");
	$('#movementButtons').show();
	$('#invStatToggle').show();
	toggle();
});

//lets the character heal mid-battle button
$('#Heal').click(function(){
	mana=10-Stats.Intelligence/10;
	if (Stats.MP>=mana){
		MonsterAttack();
		var healing=Stats.Intelligence*2+EquipStats("Intelligence")+
					Randomize(Stats.Level*3);
		var iscrit="";
		if (Critical()){healing*=2;iscrit="! It's a Critical Heal!";}
		healing=Math.floor(healing);
		PlusStat("HP",healing);
		MinusStat("MP",mana);
		MonsterAttack();
		$('#player-actions').html("You heal "+healing+" health"+iscrit);
	}else{
		$('#player-actions').html("You don't have enough mana for that!");
		$('#enemy-actions').html("");
	}
});

//the main way to attack button
$('#Attack').click(function(){
	var damage=Stats.Strength/2+EquipStats("Strength")+Randomize(Stats.Level);
	var iscrit="";
	if (Critical()){damage*=2;iscrit="! It's a Critical Hit!";}
	damage=Math.floor(damage);
	Monster.HP-=damage;
	MonsterAttack();
	$('#player-actions').html("You deal "+damage+" to the "+Monster.Name+iscrit);
});

//the wizard's path of attacking button
$('#MagicMissile').click(function(){
	mana=10-Stats.Intelligence/10;
	if (Stats.MP>=mana){
		var damage=Stats.Intelligence/5+EquipStats("Intelligence")+Randomize(Stats.Level);
		var iscrit="";
		if (Critical()){damage*=2;iscrit="! It's a Critical Hit!";}
		damage=Math.floor(damage);
		Monster.HP-=damage;
		MinusStat("MP",mana);
		MonsterAttack();
		$('#player-actions').html("You deal "+damage+" to the "+Monster.Name+iscrit);
	}else{
		$('#enemy-actions').html("You don't have enough mana for that!");
		$('#player-actions').html("");
	}
});

//run like a pansy button
$('#Run').click(function(){
	MonsterAttack();
	chancetorun=Math.random()*100;
	if (Stats.Dexterity>chancetorun){
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
	}
});

battlemain();