

//Initiates the players inventory, giving a few starting things; global access
var inventory=[
	{name:"Shirt",type:"Armor",count:1,description:"simple shirt"},
	{name:"Spatula",type:"Weapon",count:1,description:"cooking spatula"},
	{name:"Chef Hat",type:"Helmet",count:1,description:"cook's har"},
	{name:"Gold",type:"Currency",count:100,description:"really?"}
];

//initializes the equipment area; global access
var equipment={
	Helmet:inventory[2],
	Armor:inventory[0],
	Weapon:inventory[1],
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
		cellname.style.width="70px";
		cellvalue.style.textAlign="right";
		cellname.innerHTML=key;
		
		if (equipment[key]==="empty"){
			cellvalue.innerHTML="[empty]";
		}else{
			cellvalue.innerHTML=equipment[key].name;
			var btn=document.createElement("div");
			btn.className="smallbtn";
			btn.innerHTML="unequip";
			btn.onclick=function(){
				equipment[key]="empty";
				this.parentNode.innerHTML="[empty]";
			}
			cellvalue.appendChild(btn);
			/*var btn=document.createElement("div");
			btn.className="smallbtn";
			btn.innerHTML=equipment[key].name;
			btn.onclick=function(){
				equipment[key]="empty";
				this.parentNode.innerHTML="[empty]";
			}
			cellvalue.appendChild(btn);
			*/
		}
		cellvalue.id=key;
	}
	area.appendChild(mytable);

	//creates Inventory heeader
	newPart=document.createElement("h2");
	newPart.innerHTML="<br>Inventory";
	area.appendChild(newPart);
	mytable=document.createElement("table");

	//steps through each item in inventory array and "prints" them
	for (var key in inventory){
		var row=mytable.insertRow();
		var cellname=row.insertCell();
		var cellvalue=row.insertCell();
		cellvalue.style.textAlign="right";
		
		cellname.innerHTML=inventory[key].name;
		cellvalue.innerHTML=inventory[key].count;
		if (inventory[key].name!="Gold"){
			var btn=document.createElement("div");
			btn.className="smallbtn";
			btn.innerHTML="drop";
			btn.onclick=function(){
				this.parentNode.parentNode.parentNode.deleteRow(key);
			}
			cellvalue.appendChild(btn);
		}
		
		cellvalue.id="items"+key;
	}
	area.appendChild(mytable);
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

inventmain();