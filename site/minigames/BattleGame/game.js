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
var Grunt = new Enemy('Grunt', 8, 50, 1, 10);
var Bandit = new Enemy('Bandit', 12, 75, 2, 25);
var Assassin = new Enemy('Assassin', 16, 100, 3, 45);
var Eldar = new Enemy('Eldar', 20, 150, 4, 90);

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
	if (chance<=.1){
		return true;
	}else{
		return false;
	}
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
		var damage=Monster.Strength;
		var iscrit="";
		if (Critical()){damage*=2;iscrit="! It's a Critical Hit!";}
		var armor=Stats.Toughness/10;
		damage-=armor;
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
		var healing=Stats.Intelligence*2;
		var iscrit="";
		if (Critical()){healing*=2;iscrit="! It's a Critical Heal!";}
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
	var damage=Stats.Strength/2;
	var iscrit="";
	if (Critical()){damage*=2;iscrit="! It's a Critical Hit!";}
	Monster.HP-=damage;
	MonsterAttack();
	$('#player-actions').html("You deal "+damage+" to the "+Monster.Name+iscrit);
});

//the wizard's path of attacking button
$('#MagicMissile').click(function(){
	mana=10-Stats.Intelligence/10;
	if (Stats.MP>=mana){
		var damage=Stats.Intelligence/5;
		var iscrit="";
		if (Critical()){damage*=2;iscrit="! It's a Critical Hit!";}
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
	$('#player-actions').html("You run like a little bitch, don't you feel proud?");
	$('#Heal').hide();
	$('#Attack').hide();
	$('#MagicMissile').hide();
	$('#Run').hide();
	Monster.HP=Monster.MaxHP;
	$('#exit').show();
});

battlemain();