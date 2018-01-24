var characterId;
var opponentId;
var characterChosen = false;
var opponentChosen = false;
var opponentsLeft;
var characterHealth;
var opponentHealth;
var characterBaseAttack;
var characterAttack;
var opponentAttack;
var timesClicked = 0;
var emptiedImages = [];

function resetGame() {
	$("#your-character-img").empty();
	$("#opponent-img").empty();
		emptiedImages.forEach(function(element, index) {
			$("#character-images").append(element);
		});
		
	$(".image-padding").each(function() {
		playerName = $(this).attr("id");
		$("#" + playerName).removeClass("red-padding");
		$("#" + playerName).addClass("green-padding option");
		$("#stat-"+playerName).text("Attack: " + $(this).attr("attack"));
		$("#hp-"+playerName).empty();
		$("#character-images").append($(this));
		$("#instructions").text("Choose Opponent");
		$("#instructions").removeClass("green-font red-font");
		$("#instructions").addClass("blink green-font")
		characterChosen = false;
		opponentChosen = false;
		opponentsLeft = $(".image-padding").length - 1;
		emptiedImages = [];
		timesClicked = 0;
	});

	$(document).ready(gameplay);
};

function gameplay() {
	$(".image-padding").each(function() {
		playerName = $(this).attr("id");
		$("#stat-"+playerName).text("Attack: " + $(this).attr("attack"));
	});

	opponentsLeft = $(".image-padding").length - 1;

	var chooseCharacter = $(".option");
	chooseCharacter.on("click", function() {
		console.log("in chooseCharacter click");
		if(characterChosen === false) {
			console.log("characterChosen = false");
			characterId = $(this).attr("id");
			$("#" + characterId).removeClass("option");
			$("#your-character-img").append($("#" + characterId));
			$("#instructions").text("Choose Opponent");
			$("#instructions").removeClass("green-font");
			$("#instructions").addClass("red-font");
			$(".option").removeClass("green-padding");
			$(".option").addClass("red-padding");
			characterHealth = parseInt($("#" + characterId).attr("hp"));
			characterBaseAttack = parseInt($("#" + characterId).attr("attack"));
			characterAttack = characterBaseAttack;
			$("#hp-" + characterId).text("HP: " + characterHealth); 

			$(".option").each(function(){
				playerName = $(this).attr("id");
				$("#stat-"+playerName).text("Counter: " + $(this).attr("counter"));
			});
		}

		if(characterChosen === true && opponentChosen === false) {
			opponentId = $(this).attr("id");
			$("#" + opponentId).removeClass("option");
			$("#opponent-img").append($("#" + opponentId));
			$("#instructions").text("Click Basketball to Attack Opponent");
			$("#instructions").removeClass("red-font");
			$("#instructions").addClass("black-font");
			$("#instructions").removeClass("blink");
			opponentHealth = parseInt($("#" + opponentId).attr("hp"));
			opponentAttack = parseInt($("#" + opponentId).attr("counter"));
			$("#hp-" + opponentId).text("HP: " + opponentHealth);
			opponentChosen = true;
		}

		characterChosen = true;

	});

	var attackButton = $("#basketball");
	attackButton.on("click", function(){
		if(opponentChosen === true && characterChosen === true && opponentHealth > 0 && characterHealth > 0) {
			characterHealth = characterHealth - opponentAttack;
			opponentHealth = opponentHealth - characterAttack;
			$("#hp-" + characterId).text("HP: " + characterHealth);
			$("#hp-" + opponentId).text("HP: " + opponentHealth);
			timesClicked++;
			characterAttack = characterBaseAttack*(timesClicked + 1);
			$("#stat-" + characterId).text("Attack: " + characterAttack);

			if(opponentHealth <= 0) {
				opponentsLeft--;
				emptiedImages.push($("#opponent-img").html());
				console.log("push1");
				var name = $("#" + opponentId).attr("name");
				$("#opponent-img").empty();
				$("#instructions").addClass("blink");
				$("#instructions").removeClass("black-font");
				console.log(opponentsLeft);
				if(opponentsLeft > 0) {
					opponentChosen = false;
					$("#instructions").text("You defeated " + name); 
					$("#instructions").append("<br>");
					$("#instructions").append("Choose your next opponent");
					$("#instructions").addClass("red-font");
				}
				else {
					$("#instructions").text("You are an NBA Champion");
					$("#instructions").append("<br>");
					$("#instructions").append("Game is resetting...");
					$("#instructions").addClass("green-font");
					emptiedImages.push($("#your-character-img").html());
					console.log("push2");
					setTimeout(resetGame, 5000);
				}
			}
			else if(characterHealth <= 0) {
				emptiedImages.push($("#your-character-img").html());
				console.log("push3");
				emptiedImages.push($("#opponent-img").html());
				console.log("push4");
				$("#your-character-img").empty();
				$("#instructions").addClass("blink");
				$("#instructions").removeClass("black-font");
				$("#instructions").addClass("red-font");
				$("#instructions").text("Better luck next season"); 
				$("#instructions").append("<br>");
				$("#instructions").append("Game is resetting");
				setTimeout(resetGame, 5000);
			}
			else {}
		}
	});
};

$(document).ready(gameplay);
