// Grumpies


// Players .stage-deck
// col-6 col-sm-4 col-md-3

// Players .stage-playing .game-playing
// col col-sm-4 pull-sm-4 

// Players .stage-playing .game-board
// col-6 player


// Game 
$(document).ready(function(){
	//********************************************************************//
	// Initialize & Game Setup 
	var grumpPlayer, grumpOpp, gameGrumps;



	//********************************************************************//
	// Events

	// When new page loads, set up game
	newGame();

	// When a staged player is clicked, move them into the board for game play
	$('.stage-deck .player').on('click', '.player-box', function(){
		var clicked = gameGrumps[ $(this).data('grump') ];
		if( grumpPlayer === '' ){
			grumpPlayer = clicked; 
			var u = $(this).parent().remove();
			u.addClass('player-user');
			$('.game-playing').append(u);
			$('.player-user .player-box').before('<h2>You. Good</h2>');

			$("#player-choice-instructions").html("You've chosen <strong>" + clicked.name + "</strong> as your player. <br>Meow choose your next opponent <br>May the grumpiest <span>&#128574;</span> win.");

		}else{
			grumpOpp = clicked;
			var u = $(this).parent().remove();
			u.addClass('player-opp');
			$('.game-playing').append(u);
			$('.player-opp .player-box').before('<h2>Opponent. The Worst.</h2>');

			changeStage('.stage-playing', '.stage-deck, .stage-over');
		}
	});

	// When rock, paper, scissors is rolled, play a game
	$('.roll-buttons button').on('click', function(){
		var playerMove = $(this).data('roll');
		var w = didWin( grumpPlayer.prob + grumpPlayer.probIncrease );
		gameRoll(playerMove, w);
	});

	// When play new is clicked, play a new game
	$('.game-over-rps button').on('click', function(){
		grumpPlayer.health = regenerate();
		grumpPlayer.probIncrease += .075;
		$('.player-user .player-health').html( grumpPlayer.health + ' Grumpies');
		
		changeStage('.stage-deck', '.stage-playing, .stage-over');
	});

	// When plag again is clicked, reset game
	$('.game-over-grump button').on('click', function(){
		newGame();
	});

	//********************************************************************//
	// Functions

	// Function to create a grumpy html element 
	function makePlayer(grumper, dataVal){
		var h = '';
		h += '<div class="player"><div class="player-box" data-grump="' + dataVal + '">';
		h += '<div class="player-avatar"><img src="' + grumper.profile + '"></div>';
		h += '<div class="player-title"><h4>' + grumper.name + '</h4></div>';
		h += '<div class="player-health">' + grumper.health + ' Grumpies</div></div></div>';
		return h;
	}

	// Function to reset the board and create a new game
	function newGame(){
		grumpPlayer = '';
		grumpOpp = '';
		gameGrumps = randArrOrder( grumpies.slice(0) );
		
		gameGrumps.forEach(function(item, ind){
			item.probIncrease = 0;
			item.health = regenerate();
			$("#staged-players").append( makePlayer(item, ind) );
		});

		$('.player-user').remove();
		$('.game-board-wins .row, .game-board-loses .row').empty();
		$("#player-choice-instructions").html("Choose your player. Pick an opponent. <br>Battle in a game of rock, paper, scissors. <br>Try to keep your grumpiness in spite of  the <span alt='party fun'>&#127881;</span>.");

		changeStage('.stage-deck', '.stage-playing, .stage-over');

	}

	// Function to change between elements on the screen based on passed selectors
	function changeStage(showSelect, hideSelect){
		$( showSelect ).show();
		$( hideSelect + ', .roll-outcome' ).hide();
	}

	// Function to determine if a user won given a probability of winning
	function didWin(prob){
		var x = Math.random();
		return( prob >= x );
	}

	// Function to execute a game roll 
	function gameRoll(userMove, userWins){
		var oppMove = getOpp(userMove, userWins);

		if(userWins){
			grumpOpp.health = Math.max(0, grumpOpp.health - grumpPlayer.power);
			$('#result').html('you won');
			$('.player-opp .player-health').html( grumpOpp.health + ' Grumpies');
			$('#roll-outcome > p:nth-child(6)').html( grumpOpp.name + ' lost ' + grumpPlayer.power + ' grumpies');
			(grumpOpp.health === 0) ? gameOver() : showOutcome();
		
		} else{
			grumpPlayer.health = Math.max(0, grumpPlayer.health - grumpOpp.power);
			$('#result').html('you lost');
			$('.player-user .player-health').html( grumpPlayer.health + ' Grumpies');
			$('#roll-outcome > p:nth-child(6)').html( 'You lost ' + grumpOpp.power + ' grumpies');
			(grumpPlayer.health === 0) ? gameOver() : showOutcome();
		}

		// Function to get an opponent's roll given a player's roll and gave outcome
		function getOpp(u, w){

			var o = "rock"; // default 
			switch(u){
				case "rock":
					w ? o = "scissors" : o = "paper";
					break;
				case "scissors":
					w ? o = "paper" : o = "rock";
					break;
				case "paper":
					w ? o = "rock" : o = "scissors";
					break;
			}
			return o;
		}

		// Function to display the outcome on the board
		function showOutcome(){

			$('#roll-outcome').hide(function(){
				$('#roll-outcome > p:nth-child(2)').html('You rolled ' + userMove);
				$('#roll-outcome > p:nth-child(3)').html(grumpOpp.name + ' rolled ' + oppMove);

				$('#roll-outcome-user').attr('src', 'assets/images/'+ userMove + '.svg');
				$('#roll-outcome-opp').attr('src', 'assets/images/'+ oppMove + '.svg');
			}).fadeIn('slow');

		}

		// Function to update board when rock, paper, scissors ends
		function gameOver(){

			var l = $('.player-opp').remove();
			l.removeClass('player-opp');
			l.find('h2').remove();

			var j = userWins ? '.game-board-wins .row' : '.game-board-loses .row';
			$( j ).append( l );

			if( $('#staged-players').children().length > 0 ){
				$('.game-over-rps').show();
				$('.game-over-grump').hide();
			}else{
				$('.game-over-rps').hide();
				$('.game-over-grump').show();
			}

			changeStage('.stage-over', '.stage-deck, .stage-playing');
		}
	}


});


// Initialize 
var grump0 = new Grumpy(0, 'Ghosty Grumpy', 'assets/images/gcghost.png');
var grump1 = new Grumpy(1, 'Party Grumpy', 'assets/images/gcparty.png');
var grump2 = new Grumpy(2, 'Selfie Grumpy', 'assets/images/gcphone.png');
var grump3 = new Grumpy(3, 'Pie Grumpy', 'assets/images/gcpie.png');
var grump4 = new Grumpy(4, 'Floatie Grumpy', 'assets/images/gcpool.png');
var grump5 = new Grumpy(5, 'Merica Grumpy', 'assets/images/gcusa.png');

var grumpies = [grump0, grump1, grump2, grump3, grump4, grump5];


// Function to create a grumpy object
function Grumpy(id, name, profile, power){
	this.id = id;
	this.name = name;
	this.profile = profile;
	this.power = Math.floor( (Math.random()*10) + 30 );
	this.health = regenerate();
	this.prob = .5;
	this.probIncrease = 0;
}

// Function to randomly sort an array
// Used to sort game grumpies on new game
function randArrOrder(arr){
	arr.sort(function(a,b){return 0.5 - Math.random()});
	return arr;
}

// Function to regenerate health (random multiple of 5 between 110 and 140)
function regenerate(){
	return Math.floor((Math.random() * 40) + 100 );
}


