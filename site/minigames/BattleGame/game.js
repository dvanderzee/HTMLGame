//the enemy object constructor
function Enemy(Name,Strength,HP,level){
	this.Name=Name;
	this.Strength=Strength;
	this.HP=HP;
	this.MaxHP=HP;
	this.level=level;
}

//the four enemies that you might face
var grunt = new Enemy('grunt', 8,50, 1);
var mercenary = new Enemy('mercenary', 12, 75, 2);
var assasin = new Enemy('assasin', 16, 100, 3);
var eldar = new Enemy('eldar', 20, 150, 4);

var monster;
//changes the enemy you will fight depending upon your level
var EnemyChoice = function() {
	switch (Stats.level) {
		case 1:
			monster=grunt;
			break;
		case 2:
			monster=mercenary;
			break;
		case 3:
			monster=assasin;
			break;
		case 4:
			monster=eldar;
			break;
		default:
			monster=eldar;
			break;
	}
}







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

//Let's rock!
var battle = function() {
	//Make sure action buttons are active
	$('#btn-fight').removeClass().addClass('show');
	$('#btn-run').removeClass().addClass('show');
	
	//Total hit points	
	$('#Statshp-total').html(Stats.MaxHP);
	$('#Statslevel').html(Stats.level);
	$('#monstername').html(monster.name.toUpperCase());
	$('#monsterhp-total').html(monster.hp);
	
	//Hide unnecessary buttons
	$('#btn-reload').removeClass().addClass('hide');
	$('#btn-nextbattle').removeClass().addClass('hide');
	
	//Monster Image
	$('#monster-image').addClass(monster.name);
	
	//Battle Strength display
	function displayStatsHP() {
		if (Stats.HP < 1) {
			$('#Statshp').html(0);  //Prevents showing negative HP
		} else {
			$('#Statshp').html(Stats.HP);
		}
	}
	
	function displayMonsterHP() {
		if (monster.hp < 1) {
			$('#monsterhp').html(0);  //Prevents showing negative HP
		} else {
			$('#monsterhp').html(monster.hp);
		}
	}
	
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
			
			$('#Statshp').html(Stats.hp);
			$('#Statshp-total').html(Stats.hp);		
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

