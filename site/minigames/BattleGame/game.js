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
	$('#layoutLeft').css("display","none");
	$('#layoutLeftgame').css("display","block");
	$('#exit').hide();
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
	$('#enemy-actions').html("It's a fight!");
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

function MonsterAttack(){
	if (Monster.HP<=0){
		displayStats();
		$('#enemy-actions').html("You have killed the "+Monster.Name+"You gain "+
		Monster.XP+" xp!");
		PlusStat("XP",Monster.XP);
		$('#Heal').hide();
		$('#Attack').hide();
		$('#MagicMissile').hide();
		$('#Run').hide();
		Monster.HP=Monster.MaxHP;
		$('#exit').show();
	}else{
		var damage=Monster.Strength;
		var armor=Stats.Toughness/10;
		damage-=armor;
		MinusStat("HP",damage);
		displayStats();
		$('#enemy-actions').html("The "+Monster.Name+" hits Marc for "+damage+" damage");
	}
}

$('#exit').click(function(){
	$('#layoutLeftgame').css("display","none");
});

$('#Heal').click(function(){
	mana=10-Stats.Intelligence/10;
	if (Stats.MP>=mana){
		MonsterAttack();
		var healing=Stats.Intelligence*2;
		PlusStat("HP",healing);
		MinusStat("MP",mana);
		MonsterAttack();
		$('#player-actions').html("Mark heals "+healing+" health");
	}else{
		$('#player-actions').html("You don't have enough mana for that!");
		$('#enemy-actions').html("");
	}
});

$('#Attack').click(function(){
	var damage=Stats.Strength/2;
	Monster.HP-=damage;
	MonsterAttack();
	$('#player-actions').html("The "+Monster.Name+" hits Marc for "+damage+" damage");
});

$('#MagicMissile').click(function(){
	mana=10-Stats.Intelligence/10;
	if (Stats.MP>=mana){
		var damage=Stats.Intelligence/5;
		Monster.HP-=damage;
		MinusStat("MP",mana);
		MonsterAttack();
		$('#player-actions').html("Mark deals "+damage+" to the "+Monster.Name);
	}else{
		$('#enemy-actions').html("You don't have enough mana for that!");
		$('#player-actions').html("");
	}
});

$('#Run').click(function(){
	MonsterAttack();
	$('#player-actions').html("You run like a little bitch, don't you feel proud?");
	
});


/*
////////////////////////////////////////////////////////////////////////////////////////////
function Enemy(name, hp, Strength, level) {
	this.name = name;
	this.hp = hp;
	this.Strength = Strength;
	this.level = level;
}

var slime = new Enemy('slime', 15, 3, 1);
var troll = new Enemy('troll', 30, 6, 2);
var dragon = new Enemy('dragon', 60, 10, 3);

var monster;
var monsterCodex = [slime, troll, dragon];
*/
//Let's rock!
var battle = function() {
	/*
	//Make sure action buttons are active
	$('#btn-fight').removeClass().addClass('show');
	$('#btn-run').removeClass().addClass('show');
	
	//Total hit points	
	$('#Statshp-total').html(Stats.MaxHP);
	$('#Statsmp-total').html(Stats.MaxMP);
	$('#monstername').html(monster.name.toUpperCase());
	$('#monsterhp-total').html(monster.hp);
	
	//Hide unnecessary buttons
	$('#btn-reload').removeClass().addClass('hide');
	$('#btn-nextbattle').removeClass().addClass('hide');
	
	//Monster Image
	$('#monster-image').addClass(monster.name);
	*/
	//Critical Hit Rolls
	var StatsStrengthCrit = Stats.Strength;
	var monsterStrengthCrit = monster.Strength;
	
	
	//BEGIN BATTLE
	displayStatsHP();
	displayMonsterHP();
	
	$('#battle-text-Stats').html("A " + monster.name + " approaches!");
	$('#battle-text-enemy').html("");
	$('#battle-text-extra').html("");
	
	//FIGHT
	document.getElementById('btn-fight').onclick = function() {
		//Attack Power
		var StatsStrength = Math.random()* Stats.Strength + 1 | 0;
		var monsterStrength = Math.random()* monster.Strength + 1 | 0;
	
		//Attack Strength
		function attackMonster() {
			monster.hp = monster.hp - StatsStrength;
			$('#attack-animation').removeClass().addClass('hit');
			setTimeout(function() {
				$('#attack-animation').removeClass().addClass(monster.name);
			}, 500)
		}
		
		function attackStats() {
			Stats.hp = Stats.hp - monsterStrength;
			$('#monster-image').removeClass().addClass(monster.name + "-attack");
			setTimeout(function() {
				$('#monster-image').removeClass().addClass(monster.name);
			}, 500)
		}
		
		//Will attack be critical?	
		if (StatsStrength === StatsStrengthCrit) {
			StatsStrength = StatsStrength * 2;
			$('#battle-text-Stats').html("CRITICAL HIT! You attack for " + StatsStrength + " Strength.");
			$('#battle-text-enemy').html("");
		} else {
			$('#battle-text-Stats').html("You attack for " + StatsStrength + " Strength.");
			$('#battle-text-enemy').html("");
		}
		
		//Attack enemy
		attackMonster();
		
		//Update monster HP display
		displayMonsterHP();		
				
		//If monster dies
		if (monster.hp < 1 && monster.level < monsterCodex.length) {
			Stats.level += 1;
			difficulty += 1;
			Stats.hp = Stats.MaxHP + (10 * (Stats.level - 1));
			
			$('#Statshp').html(Stats.HP);
			$('#Statsmp').html(Stats.MP);
			$('#Statshp-total').html(Stats.HP);
			$('#Statsmp-total').html(Stats.MaxMP);
			$('#Statslevel').html(Stats.level);
			
			$('#battle-text-enemy').html("YOU DEFEATED THE " + monster.name.toUpperCase() + " and have reached LEVEL " + Stats.level + "!");
			$('#battle-text-extra').html("Get ready for the next battle!");
			$('#monster-image').removeClass();		
			$('#btn-nextbattle').removeClass().addClass('show');
			
			$('#btn-fight').removeClass().addClass('hide');
			$('#btn-run').removeClass().addClass('hide');
		}
		
		if (monster.hp < 1 && monster.level === monsterCodex.length) {
			$('#battle-text-enemy').html("YOU DEFEATED THE " + monster.name.toUpperCase() + "!");
			$('#battle-text-extra').html("YOU WIN!!!");
			$('#monster-image').removeClass();		
			
			$('#btn-fight').removeClass().addClass('hide');
			$('#btn-run').removeClass().addClass('hide');
			$('#btn-nextbattle').removeClass().addClass('hide');
			$('#btn-reload').removeClass().addClass('show');
		}
		
		//If the monster didn't die
		setTimeout(function() {
			if (monster.hp > 0 ) {
				if (monsterStrength === monsterStrengthCrit) {
					monsterStrength = monsterStrength * 2;
					$('#battle-text-enemy').html("CRITICAL HIT! The " + monster.name + " attacks for " + monsterStrength + " Strength.");
				} else {
					$('#battle-text-enemy').html("The " + monster.name + " attacks for " + monsterStrength + " Strength.");
				}
			
				attackStats();
			
				//Update Stats HP display
				displayStatsHP();
				
				//If Stats dies
				if (Stats.hp < 1) {
					$('#battle-text-extra').html("YOU ARE DEAD.");
					
					$('#btn-fight').removeClass().addClass('hide');
					$('#btn-run').removeClass().addClass('hide');
					
					$('#fadetoblack').addClass('fadein');
			
					$('#btn-reload').removeClass().addClass('show')
				}
			}
		}, 1500) //1.5 second delay after Stats attacks		
	} //end of fight
} //end of battle

//RUN
$('#btn-run').click(function() {
		$('#battle-text-Stats').html("You run away.");
		$('#battle-text-enemy').html("");
		$('#battle-text-extra').html("");
		$('#btn-fight').removeClass().addClass('hide');
		$('#btn-run').removeClass().addClass('hide');
				
		$('#btn-reload').removeClass().addClass('show');
		$('#btn-nextbattle').removeClass().addClass('hide');
});

//Set initial difficulty to 1
var difficulty = 1;

var difficultyGrid = function() {
	switch (difficulty) {
		case 1:		
			monster = monsterCodex[0];
			$('#container').removeClass();
			$('#container').addClass('forest');
			battle();
			break;
		case 2:
			monster = monsterCodex[1];
			$('#container').removeClass();
			$('#container').addClass('cave');
			battle();
			break;
		case 3:
			monster = monsterCodex[2];
			$('#container').removeClass();
			$('#container').addClass('lair');
			battle();
			break;
		default:
			document.getElementById('battle-text-Stats').innerHTML = "<span style='color:red'>I AM ERROR.</span>";
			document.getElementById('battle-text-enemy').innerHTML = "";
			document.getElementById('battle-text-extra').innerHTML = "";
			break;
	}
}

//Select first monster
difficultyGrid();

//Additional monsters
document.getElementById('btn-nextbattle').onclick = function() {
	difficultyGrid();
}

