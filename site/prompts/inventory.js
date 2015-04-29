

//Initiates the players inventory, giving a few starting things; global access
var inventory={
	Gold:{
		name:"Gold",
		type:"Currency",
		count:100,
		description:"really?"
	},
	Shirt:{
		name:"Shirt",
		type:"Armor",
		count:1,
		equipped:true,
		description:"simple shirt"
	},
	Spatula:{
		name:"Spatula",
		type:"Weapon",
		count:1,
		equipped:true,
		description:"cooking spatula"
	},
	KitchenKnife:{
		name:"Kitchen Knife",
		type:"Weapon",
		count:1,
		equipped:false,
		description:"cooking knife, has a little tomato still on it"
	},
	ChefHat:{
		name:"Chef Hat",
		type:"Helmet",
		count:1,
		equipped:true,
		description:"cook's hat"
	}
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
			btn.onclick=function Unequip(){
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
			buttoncell.appendChild(btn);
		}
		row.id="equip"+key;
		console.log(row.id);
	}
	area.appendChild(mytable);

	//creates Inventory header
	newPart=document.createElement("h2");
	newPart.innerHTML="<br>Inventory";
	area.appendChild(newPart);
	mytable=document.createElement("table");
	addinventory("Health Potion","HealthPotion","Potion",3,"restores 50 HP");

	//steps through each item in inventory array and "prints" them
	for (var key in inventory){
		var row=mytable.insertRow();
		var cellname=row.insertCell();
		var cellvalue=row.insertCell();
		cellvalue.style.textAlign="right";
		cellname.style.minWidth="70px";

		//displays the name of the item, the count and as long as it's not gold,
		//also displays options to drop and use or equip objects
		cellname.innerHTML=inventory[key].name;
		cellvalue.innerHTML=inventory[key].count;
		if (inventory[key].name!="Gold"){
			var buttoncell=row.insertCell();
			var btn=document.createElement("div");
			btn.className="smallbtn";
			//if the item is equppable display equip, otherwise display use
			type=inventory[key].type;
			if (type==="Helmet" || type==="Armor" || type==="Weapon" ||
					type==="Shield" || type==="Greaves" || type==="Ring"){
				btn.innerHTML="Equip";
				btn.onclick=function Equip(){
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
						btn.onclick=function Unequip(){
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
						buttoncell.appendChild(btn);
					}
					inventory[tempname].equipped=true;
					equipment[inventory[tempname].type]=inventory[tempname];
					display.cells[1].innerHTML=inventory[tempname].name;
				}
			}
			else{
				btn.innerHTML="Use";
				btn.onclick=function Use(){
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
					if (inventory[tempname].count>1){
						inventory[tempname].count-=1;
						this.parentNode.parentNode.cells[1].innerHTML-=1;
					}else{
						delete inventory[tempname];
						mytable.deleteRow(counter);
					}
				}
			}
			buttoncell.appendChild(btn);
			
			//creates the drop button which, when pressed, will delete the row in the
			//HTML and deletes the corresponding object in inventory
			buttoncell=row.insertCell();
			btn=document.createElement("div");
			btn.className="smallbtn";
			btn.innerHTML="Drop";
			btn.onclick=function Drop(){
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
					mytable.deleteRow(count);
				}else{
					alert("You must unequip this first!");
				}
			}
			buttoncell.appendChild(btn);
		}
		
		row.id="items"+key;
	}
	area.appendChild(mytable);

}


//will add objects to the inventory,if they're already present, add to count
function addinventory(name_,nospacename,type_,count_,description_){
	inventory[nospacename]={
		name:name_,
		type:type_,
		count:count_,
		description:description_
	}
	
}


inventmain();