

//stores all of the characters current inventory,starts with a few things
var inventory=[
	{name:"Leather Plate",type:"Armor",count:1},
	{name:"Dagger",type:"Weapon",count:1},
	{name:"Leather Cap",type:"Helmet",count:1},
	{name:"Gold",type:"Currency",count:100}
];

//stores all of the current character's equipped items
var equipment={
	Head:inventory[0],
	Body:"empty",
	Weapon:"empty",
	Ring1:"empty",
	Ring2:"empty",
	Legs:"empty"
};
//creates Equipment header
var newPart=document.createElement("h2");
newPart.appendChild(document.createTextNode("Equipment"));
var area=document.getElementById("sidebarMenu");
area.appendChild(newPart);
//steps through the equipment array and "prints" out each piece of equipment
for (var key in equipment){
	var newPart=document.createElement("p");
	newPart.appendChild(document.createTextNode(key));
	newPart.appendChild(document.createTextNode(": "));
	if (equipment[key]==="empty"){
	newPart.appendChild(document.createTextNode(equipment[key]));
	}else{
		newPart.appendChild(document.createTextNode(equipment[key].name));
	}
	var area=document.getElementById("sidebarMenu");
	area.appendChild(newPart);
}
//creates Inventory heeader
var newPart=document.createElement("h2");
newPart.appendChild(document.createTextNode("Inventory"));
var area=document.getElementById("sidebarMenu");
var newPart2=document.createElement("br");
area.appendChild(newPart2);
area.appendChild(newPart);
//steps through each item in inventory array and "prints" them
for (var key in inventory){
	temp=inventory[key];
	var newPart=document.createElement("p");
	newPart.appendChild(document.createTextNode(temp.name));
	newPart.appendChild(document.createTextNode(": "));
	newPart.appendChild(document.createTextNode(temp.count));
	var area=document.getElementById("sidebarMenu");
	area.appendChild(newPart);
}

//will add an item to the equipment if the associated area is open
function addequip(){
	
}
//removes the current item from the equipment area, sets that area back to "empty"
function removeequip(){
	
}
//will add objects to the inventory,if they're already present, add to count
function addinventory(){
	
}
//will remove objects from the inventory,if count of that object is 0, remove it from array
//unless it is "gold" in which case it stays as zero
function removeinventory(){
	
}
//will eventually handle printing and will be called each time something changes
function printinventory(){
	
}

