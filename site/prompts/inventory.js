
//this function lets us easily create new items without having to set each
//part separately
function Item(name,type,count,equipped,effect){
	this.name=name;
	this.type=type;
	this.count=count;
	this.equipped=equipped;
	this.effect=effect;
}

//Initiates the players inventory, giving a few starting things; global access
var inventory={
	Gold:new Item("Gold","Currency",100,null,"no"),
	Shirt:new Item("Shirt","Armor",1,true,"simple shirt"),
	Spatula:new Item("Spatula","Weapon",1,true,"cooking spatula"),
	KitchenKnife:new Item
	(
		"Kitchen Knife",
		"Weapon",
		1,
		false,
		"cooking knife, has a little tomato still on it"
	),
	ChefHat:new Item("Chef Hat","Helmet",1,true,"cook's hat")
};

//initializes the equipment area; global access
var equipment={
	Helmet:inventory.ChefHat,
	Armor:inventory.Shirt,
	Weapon:inventory.Spatula,
	Shield:"empty",
	Greaves:"empty",
	Ring:"empty",
};

function inventmain(){
	//creates Equipment header
	var newPart=document.createElement("h2");
	newPart.innerHTML="Equipment";
	var area=document.getElementById("sidebarMenu");
	area.appendChild(newPart);
	var mytable=document.createElement("table");
	
	//steps through the equipment array and "prints" out each piece of equipment
	for (var key in equipment){
		var row=mytable.insertRow();
		var cellname=row.insertCell();
		var cellvalue=row.insertCell();
		cellname.style.minWidth="70px";
		cellvalue.style.textAlign="right";
		cellname.innerHTML=key;
		//displays either empty or the name of the item and a button to unequip it
		if (equipment[key]==="empty"){
			cellvalue.innerHTML="[empty]";
		}
		else{
			cellvalue.innerHTML=equipment[key].name;
			var buttoncell=row.insertCell();
			var btn=document.createElement("div");
			btn.className="smallbtn";
			btn.innerHTML="Unequip";
			
			//will change the matching equipment slot and it's display
			btn.onclick=Unequip;
			buttoncell.appendChild(btn);
		}
		row.id="equip"+key;
	}
	area.appendChild(mytable);

	//creates Inventory header
	newPart=document.createElement("h2");
	newPart.innerHTML="<br>Inventory";
	area.appendChild(newPart);
	mytable=document.createElement("table");
	mytable.id="Inventorytable";

	//steps through each item in inventory array and "prints" them
	for (var key in inventory){
		printitem(mytable,key);
	}
	area.appendChild(mytable);
	addinventory("Health Potion","HealthPotion","Potion",1,
				 function(){PlusStat("HP",50);});
	addinventory("Health Potion","HealthPotion","Potion",2,
				 function(){PlusStat("HP",50);});
}

//will unequip equipment; always linked to buttons in the equipment area
function Unequip(){
	equipment[this.parentNode.parentNode.cells[0].innerHTML]="empty";
	current=this.parentNode.parentNode.cells[1].innerHTML;
	if (!inventory[current]){
		for (i in inventory){
			if (inventory[i].name===current){
				current=i;
				break;
			}
		}
	}
	inventory[current].equipped=false;
	this.parentNode.parentNode.cells[1].innerHTML="[empty]";
	this.parentNode.parentNode.deleteCell(2);
}

//adds the inventory object to the equipment object; also changes the display
//to reflect this change; always linked to buttons in the inventory area
function Equip(){
	//will equip the item to the appropriate slot, unequipping whatever
	//was equipped in that slot beforehand
	var tempname=this.parentNode.parentNode.cells[0].innerHTML;
	if (!inventory[tempname]){
		for (var i in inventory){
			if(tempname===inventory[i].name){
				var tempname=i;
				break;
			}
		}
	}
	var display=document.getElementById("equip"+inventory[tempname].type);
	if (equipment[inventory[tempname].type]!="empty"){
		equipment[inventory[tempname].type].equipped=false;
	}else{
		var buttoncell=display.insertCell();
		var btn=document.createElement("div");
		btn.className="smallbtn";
		btn.innerHTML="Unequip";
		btn.onclick=Unequip;
		buttoncell.appendChild(btn);
	}
	inventory[tempname].equipped=true;
	equipment[inventory[tempname].type]=inventory[tempname];
	display.cells[1].innerHTML=inventory[tempname].name;
}

//will do whatever the object's effect says it does, then reduces count
//by one. If this brings it to 0, deletes it;always linked to inventory buttons
function Use(){
	//does whatever it's supposed to do and then either subtracts the
	//count of the item by 1 or if it only has 1 left deletes it
	var counter=0;
	var tempname=this.parentNode.parentNode.cells[0].innerHTML;
	//if it's a multi-word item
	if (!inventory[tempname]){
		for (var i in inventory){
			if(tempname===inventory[i].name){
				var tempname=i;
				break;
			}
			counter++;
		}
	}
	inventory[tempname].effect();
	if (inventory[tempname].count>1){
		inventory[tempname].count-=1;
		this.parentNode.parentNode.cells[1].innerHTML=inventory[tempname].count;
	}else{
		delete inventory[tempname];
		this.parentNode.parentNode.parentNode.deleteRow(counter);
	}
}

//will delete the object from your inventory as long as it is not equipped
//always linked to buttons in the inventory area
function Drop(){
	var count=0;
	for (var i in inventory){
		if(this.parentNode.parentNode.cells[0].innerHTML===inventory[i].name){
			var tempname=i;
			break;
		}
		count++;
	}
	if (!inventory[tempname].equipped){
		delete inventory[tempname];
		this.parentNode.parentNode.parentNode.deleteRow(count);
	}else{
		alert("You must unequip this first!");
	}
}

function printitem(mytable,key){
	var row=mytable.insertRow();
	var cellname=row.insertCell();
	var cellvalue=row.insertCell();
	cellvalue.style.textAlign="right";
	cellname.style.minWidth="70px";

	//displays the name of the item, the count and as long as it's not gold,
	//also displays options to drop and use or equip objects
	cellname.innerHTML=inventory[key].name;
	cellvalue.innerHTML=inventory[key].count;
	type=inventory[key].type;
	if (type!="Currency" && type!="KeyItem"){
		var buttoncell=row.insertCell();
		var btn=document.createElement("div");
		btn.className="smallbtn";
		//if the item is equppable display equip, otherwise display use
		if (type==="Helmet" || type==="Armor" || type==="Weapon" ||
				type==="Shield" || type==="Greaves" || type==="Ring"){
			btn.innerHTML="Equip";
			btn.onclick=Equip;
		}
		else{
			btn.innerHTML="Use";
			btn.onclick=Use;
		}
		buttoncell.appendChild(btn);
		
		//creates the drop button which, when pressed, will delete the row in the
		//HTML and deletes the corresponding object in inventory
		buttoncell=row.insertCell();
		btn=document.createElement("div");
		btn.className="smallbtn";
		btn.innerHTML="Drop";
		btn.onclick=Drop;
		buttoncell.appendChild(btn);
	}
	row.id="items"+key;
}

//will add objects to the inventory,if they're already present, add to count
function addinventory(name,nospacename,type,count,effect){
	if (nospacename==null){nospacename=name;}
	if (inventory[nospacename]){
		inventory[nospacename].count+=count;
		temp=document.getElementById("items"+nospacename);
		temp.cells[1].innerHTML=inventory[nospacename].count;
	}else{
		inventory[nospacename]=new Item(name,type,count,null,effect);
		mytable=document.getElementById("Inventorytable");
		printitem(mytable,nospacename);
	}
}


inventmain();