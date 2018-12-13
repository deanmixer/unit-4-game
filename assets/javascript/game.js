

let tryitout = $(document).ready(function() {

let playerChar = 0;
let enemyChar = 0;
let winCounter = 0;
let playerObj
let enemyObj
let attackAudio = new Audio("assets/sounds/blaster.mp3");
let winAudio = new Audio("assets/sounds/wookie2.mp3");
let loseAudio = new Audio("assets/sounds/fail.mp3");
let rd1 = new Audio("assets/sounds/MKDround1.mp3");
let rd2 = new Audio("assets/sounds/MKDround2.mp3");
let rd3 = new Audio("assets/sounds/finalround.mp3");

const jarJar = {
	name: "Jar Jar",
	maxHitPoints: 150,
	hitPoints: 150,
	attackPower: 20,
	counterPower: 20,
	attackSound() {

	},
	fashionSense: "beach bum",
}

const mazKanata = {
	name: "Maz Kanata",
	maxHitPoints: 120,
	hitPoints: 120,
	attackPower: 35,
	counterPower: 20,
	attackSound() {

	},
	fashionSense: "cheeto steampunk"
}

const watto = {
	name: "Watto",
	maxHitPoints: 85,
	hitPoints: 85,
	attackPower: 70,
	counterPower: 35,
	attackSound() {

	},
	fashionSense: "flirty but fun"
}

const wicket = {
	name: "Wicket",
	maxHitPoints: 200,
	hitPoints: 200,
	attackPower: 15,
	counterPower: 15,
	attackSound() {

	},
	fashionSense: "forest chic"
}

$(".charCard").hover(function() {
	// if ($(event.currentTarget).hasClass("grayscale") !== "true") {
		$(event.currentTarget).css('cursor','pointer');
	// }
})

$(".combatButton").hover(function() {
	$(event.currentTarget).css('cursor','pointer');
})

$("div.charSelect > .charCard").mouseenter(function() {
	if (playerChar === 0 || enemyChar === 0) {
	$(event.currentTarget).siblings().addClass("grayscale");
	} else return;
})

$("div.charSelect > .charCard").mouseleave(function() {
	if (enemyChar === 0) {
	$(event.currentTarget).siblings().removeClass("grayscale");
	} else return;
})

$(".charCard").click(function() {
	if (playerChar === 0) {
	playerChar = this.id;
	$(".chooser").addClass("hide");
	$(".maincontent").removeClass("hide");
	$(".charCard").removeClass("grayscale");
	$("#attackOptions").css('display','flex');
	$(event.currentTarget).siblings().appendTo("#attackOptions");	
	$(event.currentTarget).appendTo("#yourChar");
	playerObjAssignment();
	return playerChar} else return
})

$(".charCard").click(function() {
	if (playerChar !== this.id && enemyChar === 0) {
	enemyChar = this.id;
	// $(event.currentTarget).siblings().addClass("grayscale");
	$(".keepClear").addClass("hide");
	$(event.currentTarget).appendTo("#defender");
	// $(event.currentTarget).removeClass("grayscale");
	$(".charCard").removeClass("grayscale");
	$(".combatButton").removeClass("grayscale");
	$("#chooseAgain").text("");
	$("#playerMessage").text("");
	enemyObjAssignment(enemyChar, enemyObj);
	if (winCounter > 1) {
		rd3.play();		
	} else if (winCounter > 0) {
		rd2.play();
	} else rd1.play();
	return playerChar;} else return
})



let playerObjAssignment = function() {
	if (playerChar === "jarjar") {
		playerObj = Object.assign({}, jarJar);
	} else if (playerChar === "maz") {
		playerObj = Object.assign({}, mazKanata);
	} else if (playerChar === "watto") {
		playerObj = Object.assign({}, watto);
	} else if (playerChar === "wicket") {
	playerObj = Object.assign({}, wicket);
	}
}

let enemyObjAssignment = function() {
	if (enemyChar === "jarjar") {
		enemyObj = Object.assign({}, jarJar);
	} else if (enemyChar === "maz") {
		enemyObj = Object.assign({}, mazKanata);
	} else if (enemyChar === "watto") {
		enemyObj = Object.assign({}, watto);
	} else if (enemyChar === "wicket") {
	enemyObj = Object.assign({}, wicket);
	}	
}

// let objAssignment = function (filler, fillerObj) {
// 	if (filler === "jarjar") {
// 		fillerObj = Object.assign({}, jarJar);
// 	} else if (filler === "maz") {
// 		fillerObj = Object.assign({}, mazKanata);
// 	} else if (filler === "watto") {
// 		fillerObj = Object.assign({}, watto);
// 	} else if (filler === "wicket") {
// 	fillerObj = Object.assign({}, wicket);
// 	}
// 	console.log(fillerObj);
// 	console.log(enemyObj);
// 	return fillerObj
// }

$(".combatButton").click(function() {
	if (playerChar !== 0 && enemyChar !== 0) {
	$("#playerMessage").text("You hit for " + playerObj.attackPower + " points!");
	enemyObj.hitPoints = enemyObj.hitPoints - playerObj.attackPower;
	playerObj.attackPower = playerObj.attackPower + 8;
	if (enemyObj.hitPoints > 0) {
		$("#enemyMessage").text(enemyObj.name + " hits for " + enemyObj.counterPower + " points!");
		playerObj.hitPoints = playerObj.hitPoints - enemyObj.counterPower;
		healthUpdate();
			if (playerObj.hitPoints <= 0) {
			playerObj.hitPoints = 0;
			gameOver();
			return;
			}
		} else {$("#enemyMessage").text("");
			$("#chooseAgain").text("You defeated " + enemyObj.name + "!");
			healthUpdate();
			chooseAgain();
			winCheck();}
	}
})

let healthUpdate = function() {
	if (playerChar === "jarjar") {
		$("#jarJarHealth").text(playerObj.hitPoints);
		if ((playerObj.hitPoints / playerObj.maxHitPoints) < .25) {
			$("#jarJarHealth").css('background-color', 'red');
		} else if ((playerObj.hitPoints / playerObj.maxHitPoints) < .5) {
			$("#jarJarHealth").css('background-color', '#dca453');
		};
	} else if (playerChar === "maz") {
		$("#mazHealth").text(playerObj.hitPoints);
		if ((playerObj.hitPoints / playerObj.maxHitPoints) < .25) {
			$("#mazHealth").css('background-color', 'red');
		} else if ((playerObj.hitPoints / playerObj.maxHitPoints) < .5) {
			$("#mazHealth").css('background-color', '#dca453');
		};
	} else if (playerChar === "watto") {
		$("#wattoHealth").text(playerObj.hitPoints);
		if ((playerObj.hitPoints / playerObj.maxHitPoints) < .25) {
			$("#wattoHealth").css('background-color', 'red');
		} else if ((playerObj.hitPoints / playerObj.maxHitPoints) < .5) {
			$("#wattoHealth").css('background-color', '#dca453');
		};
	} else if (playerChar === "wicket") {
		$("#wicketHealth").text(playerObj.hitPoints);
		if ((playerObj.hitPoints / playerObj.maxHitPoints) < .25) {
			$("#wicketHealth").css('background-color', 'red');
		} else if ((playerObj.hitPoints / playerObj.maxHitPoints) < .5) {
			$("#wicketHealth").css('background-color', '#dca453');
		};
	}	
	if (enemyChar === "jarjar") {
		$("#jarJarHealth").text(enemyObj.hitPoints);
		if ((enemyObj.hitPoints / enemyObj.maxHitPoints) < .25) {
			$("#jarJarHealth").css('background-color', 'red');
		} else if ((enemyObj.hitPoints / enemyObj.maxHitPoints) < .5) {
			$("#jarJarHealth").css('background-color', '#dca453');
		};
	} else if (enemyChar === "maz") {
		$("#mazHealth").text(enemyObj.hitPoints);
		if ((enemyObj.hitPoints / enemyObj.maxHitPoints) < .25) {
			$("#mazHealth").css('background-color', 'red');
		} else if ((enemyObj.hitPoints / enemyObj.maxHitPoints) < .5) {
			$("#mazHealth").css('background-color', '#dca453');
		};
	} else if (enemyChar === "watto") {
		$("#wattoHealth").text(enemyObj.hitPoints);
		if ((enemyObj.hitPoints / enemyObj.maxHitPoints) < .25) {
			$("#wattoHealth").css('background-color', 'red');
		} else if ((enemyObj.hitPoints / enemyObj.maxHitPoints) < .5) {
			$("#wattoHealth").css('background-color', '#dca453');
		};
	} else if (enemyChar === "wicket") {
		$("#wicketHealth").text(enemyObj.hitPoints);
		if ((enemyObj.hitPoints / enemyObj.maxHitPoints) < .25) {
			$("#wicketHealth").css('background-color', 'red');
		} else if ((enemyObj.hitPoints / enemyObj.maxHitPoints) < .5) {
			$("#wicketHealth").css('background-color', '#dca453');
		};
	}	
}

let chooseAgain = function () {
	enemyChar = 0;
	$("#defender").children(".charCard").addClass("hide");
	$("#defender").children(".charCard").appendTo(".charSelect");
	$(".combatButton").addClass("grayscale");
	$(".keepClear").removeClass("hide");
	winCounter ++;
	console.log(winCounter);
};

let winCheck = function() {
	if (winCounter >= 3) {
		$(".maincontent").addClass("hide");
		$(".winner").removeClass("hide");
		winAudio.play();
		// $("#yourChar").children(".charCard").children(img).appendTo("#bigLose");
	}
}

let gameOver = function() {
	$(".maincontent").addClass("hide");
	$(".gameover").removeClass("hide");
	$("#yourChar").children(".charCard").addClass("hide");
	loseAudio.play();
}

$(".resetButton").click(function() {
	location.reload();
})
})

