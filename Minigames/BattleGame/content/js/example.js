//Hero and enemy character sheets
var hero = {
	hp:20,
	baseHp:20,
	damage:6,
	level:1
}

function Enemy(name, hp, damage, level) {
	this.name = name;
	this.hp = hp;
	this.damage = damage;
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
	$('#herohp-total').html(hero.hp);
	$('#herolevel').html(hero.level);
	$('#monstername').html(monster.name.toUpperCase());
	$('#monsterhp-total').html(monster.hp);
	
	//Hide unnecessary buttons
	$('#btn-reload').removeClass().addClass('hide');
	$('#btn-nextbattle').removeClass().addClass('hide');
	
	//Monster Image
	$('#monster-image').addClass(monster.name);
	
	//Battle damage display
	function displayHeroHP() {
		if (hero.hp < 1) {
			$('#herohp').html(0);  //Prevents showing negative HP
		} else {
			$('#herohp').html(hero.hp);
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
	var heroDamageCrit = hero.damage;
	var monsterDamageCrit = monster.damage;
	
	
	//BEGIN BATTLE
	displayHeroHP();
	displayMonsterHP();
	
	$('#battle-text-hero').html("A " + monster.name + " approaches!");
	$('#battle-text-enemy').html("");
	$('#battle-text-extra').html("");
	
	//FIGHT
	document.getElementById('btn-fight').onclick = function() {
		//Attack Power
		var heroDamage = Math.random()* hero.damage + 1 | 0;
		var monsterDamage = Math.random()* monster.damage + 1 | 0;
	
		//Attack Damage
		function attackMonster() {
			monster.hp = monster.hp - heroDamage;
			$('#attack-animation').removeClass().addClass('hit');
			setTimeout(function() {
				$('#attack-animation').removeClass().addClass(monster.name);
			}, 500)
		}
		
		function attackHero() {
			hero.hp = hero.hp - monsterDamage;
			$('#monster-image').removeClass().addClass(monster.name + "-attack");
			setTimeout(function() {
				$('#monster-image').removeClass().addClass(monster.name);
			}, 500)
		}
		
		//Will attack be critical?	
		if (heroDamage === heroDamageCrit) {
			heroDamage = heroDamage * 2;
			$('#battle-text-hero').html("CRITICAL HIT! You attack for " + heroDamage + " damage.");
			$('#battle-text-enemy').html("");
		} else {
			$('#battle-text-hero').html("You attack for " + heroDamage + " damage.");
			$('#battle-text-enemy').html("");
		}
		
		//Attack enemy
		attackMonster();
		
		//Update monster HP display
		displayMonsterHP();		
				
		//If monster dies
		if (monster.hp < 1 && monster.level < monsterCodex.length) {
			hero.level += 1;
			difficulty += 1;
			hero.hp = hero.baseHp + (10 * (hero.level - 1));
			
			$('#herohp').html(hero.hp);
			$('#herohp-total').html(hero.hp);		
			$('#herolevel').html(hero.level);
			
			$('#battle-text-enemy').html("YOU DEFEATED THE " + monster.name.toUpperCase() + " and have reached LEVEL " + hero.level + "!");
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
				if (monsterDamage === monsterDamageCrit) {
					monsterDamage = monsterDamage * 2;
					$('#battle-text-enemy').html("CRITICAL HIT! The " + monster.name + " attacks for " + monsterDamage + " damage.");
				} else {
					$('#battle-text-enemy').html("The " + monster.name + " attacks for " + monsterDamage + " damage.");
				}
			
				attackHero();
			
				//Update Hero HP display
				displayHeroHP();
				
				//If hero dies
				if (hero.hp < 1) {
					$('#battle-text-extra').html("YOU ARE DEAD.");
					
					$('#btn-fight').removeClass().addClass('hide');
					$('#btn-run').removeClass().addClass('hide');
					
					$('#fadetoblack').addClass('fadein');
			
					$('#btn-reload').removeClass().addClass('show')
				}
			}
		}, 1500) //1.5 second delay after hero attacks		
	} //end of fight
} //end of battle

//RUN
$('#btn-run').click(function() {
		$('#battle-text-hero').html("You run away.");
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
			document.getElementById('battle-text-hero').innerHTML = "<span style='color:red'>I AM ERROR.</span>";
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