(function () {
	"use strict";
	let areInstructionsShowing;
	let isEntryClicked = false;

	setup();
	function setup() {

		//press enter to trigger a submit button click
		document.querySelector("#inputField").addEventListener("keyup", (event) => {
			// Enter key
			if (event.keyCode === 13) {
				event.preventDefault;
				document.querySelector("#submitButton").click();
			}
		});

		//if instructions title is click, it'll show instructions, vice versa
		document.querySelector("#instructionsTitle").onclick = () => {
			if (areInstructionsShowing) {
				hideInstructions();
			} else {
				showInstructions();
			}
		};

		document.querySelector("#submitButton").onclick = () => {
			if (document.querySelector("#inputField").value.length === 0) {
				showAlert();
				return;
			}
			addEntry();
		};
	}

	function minimizeInstructions() {
		document.querySelector("#instructions").classList.remove("zoomIn");
		document.querySelector("#instructions").classList.add("zoomOut");
		//gives the illusion that the instructions and to-do body moves swiftly together
		slideUpToDoBody();
	}

	function slideUpToDoBody() {
		const toDoBody = document.querySelector("#toDoBody");

		toDoBody.classList.add("slideOutUpCustom");
		toDoBody.addEventListener("animationend", () => {
			toDoBody.classList.remove("slideOutUpCustom");
		});
	}

	function zoomInAnimation() {
		//remove, in case zoomOut exists, due to previous clicks
		document.querySelector("#instructions").classList.remove("zoomOut");
		document.querySelector("#instructions").classList.add("zoomIn");
	}

	function hideInstructions() {
		minimizeInstructions();
		document.querySelector("#instructions").addEventListener("animationend", onInstructionsZoomedOut);
		areInstructionsShowing = false;
	}

	function onInstructionsZoomedOut() {
		document.querySelector("#instructions").style.display = "none";
		document.querySelector("#instructions").removeEventListener("animationend", onInstructionsZoomedOut);
	}

	function showInstructions() {
		zoomInAnimation();
		document.querySelector("#instructions").style.display = "block";
		areInstructionsShowing = true;
	}

	function grabInput() {
		return document.querySelector("#inputField").value;
	}

	function clearInput() {
		document.querySelector("#inputField").value = "";
	}

	function addEntry() {
		var newEntry = document.createElement("div");
		newEntry.classList.add("entryDesign", "animated", "zoomIn");

		//create button to delete entry
		var button = document.createElement("button");
		button.classList.add("fas", "fa-times", "float-right", "fixed-button", "buttonDesign");
		button.onclick = () => newEntry.remove();

		//change color when user clicks entry
		newEntry.onclick = () => {
			let colorChanged;
			if (isEntryClicked == false){
				colorChanged = "#ffaf8b";
				isEntryClicked = true;
			} else {

				colorChanged = "#ea7e5d";
				isEntryClicked = false
			}
			newEntry.style.backgroundColor = colorChanged;
			button.style.backgroundColor = colorChanged;
		};

		//icon for display inside button
		var icon = document.createElement("i");
		button.appendChild(icon);

		const task = grabInput(); 
		clearInput();
		var entryText = document.createTextNode(task);
		newEntry.appendChild(entryText);
		newEntry.appendChild(button);
		document.querySelector("#entryContainer").appendChild(newEntry);
	}

	//show alert if no text in input field
	function showAlert() {
		bootbox.alert({
			message: "Enter item to create a new task!",
			size: 'small'
		});
	}
})();
