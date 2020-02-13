"use strict";

let areInstructionsShowing;
let task;
let isEntryClicked = false;


setup();

function setup(){
	document.querySelector("#instructions").style.display = "none"
}

function minimizeInstructions(){
	document.querySelector("#instructions").classList.remove("zoomIn");
	document.querySelector("#instructions").classList.add("zoomOut");
	//gives the illusion that the instructions and to-do body moves swiftly together
	slideUpToDoBody();
}

function slideUpToDoBody(){
	const toDoBody = document.querySelector("#toDoBody");

	toDoBody.classList.add("slideOutUpCustom");
	toDoBody.addEventListener("animationend", function(){
		toDoBody.classList.remove("slideOutUpCustom");
	});
}

function zoomInAnimation(){
	//remove, in case zoomOut exists, due to previous clicks
	document.querySelector("#instructions").classList.remove("zoomOut");
	document.querySelector("#instructions").classList.add("zoomIn");
}

function hideInstructions(){
	minimizeInstructions();
	document.querySelector("#instructions").addEventListener("animationend", onInstructionsZoomedOut);
	areInstructionsShowing = false;
}

function onInstructionsZoomedOut(){
	document.querySelector("#instructions").style.display = "none";
	document.querySelector("#instructions").removeEventListener("animationend", onInstructionsZoomedOut);
}

function showInstructions(){
	//should I remove the event listener here?

	zoomInAnimation();
	document.querySelector("#instructions").style.display = "block";

	areInstructionsShowing = true;
}

//if instructions title is click, it'll show instructions, vice versa
document.querySelector("#instructionsTitle").onclick = function(){
	if(areInstructionsShowing){
		hideInstructions();
	} else {
		showInstructions();
	}
};

function grabInput(){
	task = document.querySelector("#inputField").value;
}

function clearInput(){
	document.querySelector("#inputField").value = "";
}

document.querySelector("#submitButton").onclick = function(){
	if(document.querySelector("#inputField").value.length === 0){
		showAlert();
		return;
	}
	grabInput();
	clearInput();
	addEntry(task);
};

function addEntry(task){
	var newEntry = document.createElement("div");
	var entryText = document.createTextNode(task);
	
	
	//create button to delete entry
	var button = document.createElement("button");
	button.onclick = function(){
		newEntry.remove();
	}
	
	//change color when user clicks entry
	newEntry.onclick = function(){
		if(isEntryClicked == false) {
			newEntry.style.backgroundColor = "#ffaf8b";
			button.style.backgroundColor= "#ffaf8b";
			isEntryClicked = true;
	} else {
			newEntry.style.backgroundColor = "#ea7e5d";
			button.style.backgroundColor= "#ea7e5d";
			isEntryClicked = false;
	}
};
	
	//icon for display inside button
	var icon = document.createElement("i");
	newEntry.classList.add("entryDesign", "animated", "zoomIn");
	button.classList.add("fas", "fa-times", "float-right", "buttonDesign");
	
	button.appendChild(icon);
	
	
	
	newEntry.appendChild(entryText);
	newEntry.appendChild(button);
	document.querySelector("#entryContainer").appendChild(newEntry);
}



//show alert if no text in input field
function showAlert(){
	bootbox.alert({
		message: "Enter item to create a new task!",
		size: 'small'
	});
}

//press enter to trigger a submit button click
document.querySelector("#inputField").addEventListener("keyup", function(event){
	if(event.keyCode === 13){
		event.preventDefault;
		document.querySelector("#submitButton").click();
	}
});