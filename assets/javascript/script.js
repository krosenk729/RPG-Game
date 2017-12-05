/** Things that are true **/


// Grumpy objects
var grump0 = new Grumpy(0, 'Ghosty Grumpy', 'assets/images/gcghost.jpg', 35);
var grump1 = new Grumpy(1, 'Party Grumpy', 'assets/images/gcparty.jpg', 35);
var grump2 = new Grumpy(2, 'Selfie Grumpy', 'assets/images/gcphone.jpg', 35);
var grump3 = new Grumpy(3, 'Pie Grumpy', 'assets/images/gcpie.jpg', 35);
var grump4 = new Grumpy(4, 'Floatie Grumpy', 'assets/images/gcpool.jpg', 35);
var grump5 = new Grumpy(5, 'Merica Grumpy', 'assets/images/gcusa.jpg', 35);

var grumpies = [grump0, grump1, grump2, grump3, grump4, grump5]


/** Game **/
$(document).ready(function(){
	var gameGrumpies = grumpies.slice(0);
	var uPlayer = '';
	var oppPlayer = '';

	// set up all grumps on stage
	for(i = 0; i < gameGrumpies.length; i++){
		var g = makePlayer(gameGrumpies[i]);
		$('.stage-deck.stage-open').append(g);
	}

	// when clicking on an open-stage player, set it to be user or 
	// opponent character. once both are selected, close the stage	
	$('.stage-deck.stage-open .player').click(function(){
		var clicked = grumpies[ $(this).attr('id') ] ;
		console.log(uPlayer.length);

		if( uPlayer === '' ){
			uPlayer = clicked; //object with a name same as id clicked 
			var u = $(this).remove();
			$('.stage-playing .user-player > h2').after(u);

		}else if( oppPlayer === '' ){
			oppPlayer = clicked; //object with a name same as id clicked 
			var u = $(this).remove();
			$('.stage-playing .opp-player > h2').after(u);

			// set up game for play
			$('.stage-deck').toggleClass('stage-open').toggleClass('stage-closed');
			$('.stage-playing .game-controls').show();
		}
	});

	// when clicking on game control buttons, play RPS
	$('.game-controls button').click(function(){
		var w = didWin( uPlayer.prob + uPlayer.probIncrease );
		console.log(  $(this).data('roll') );
		var userChoice =  $(this).data('roll');
		var oppChoice = getOpp( userChoice , w);
		console.log( oppChoice );

		$('#user-rolled').html('You rolled '+ userChoice);
		$('#opp-rolled').html(oppPlayer.name + ' rolled ' + oppChoice);
		$('#user-game-roll').attr('src', 'assets/images/'+ userChoice + '.svg');
		$('#opp-game-roll').attr('src', 'assets/images/'+ oppChoice + '.svg');
	
		if( w ){
			oppPlayer.health = Math.max(0, oppPlayer.health - uPlayer.power);
			$('.opp-player .health').html('Grumpy: ' + oppPlayer.health);
			$('#health-change').html(oppPlayer.name + ' lost ' + uPlayer.power + ' grumpiness');
		}else{
			uPlayer.health = Math.max(0, uPlayer.health - oppPlayer.power);
			$('.user-player .health').html('Grumpy: ' + uPlayer.health);
			$('#health-change').html('You just took a hit of ' + oppPlayer.power + ' grumpiness');
		}

		if( uPlayer.health === 0 ){


		}else if( oppPlayer.health == 0){

		}
	});


});

/** Utitlities **/ 

// function to reset game
function newGrumpGame(){
	// for each = new health 
	// for each = add to staging / remove any in grump graveyard 
	// #user-rolled = "no rolls"
}

// function to construct grumpies
function Grumpy(id, name, profile, power){
	this.id = id;
	this.name = name;
	this.profile = profile;
	this.power = power;
	this.health = regenerate();
	this.prob = .5;
	this.probIncrease = 0;
}

// function to make a HTML grumpy 
function makePlayer(grumper){
	var h = '<div class="player" id="'+ grumper.id +'"><div class="player-wrap"><h3>' + grumper.name +'</h3><img src="'+ grumper.profile + '"><div class="health">Grumpy: '+ grumper.health + '</div></div></div>';
	return h;	
}


// function to randomly determines if a user won based on probability of winning
function didWin(prob){
	var x = Math.random();
	return( prob >= x );
}

// function to get an opponent's roll given player's roll and desired outcome
function getOpp(userMove, userWins){
	var o = "rock"; // default 
	switch(userMove){
		case "rock":
			userWins ? o = "scissors" : o = "paper";
			break;
		case "scissors":
			userWins ? o = "paper" : o = "rock";
			break;
		case "paper":
			userWins ? o = "rock" : o = "scissors";
			break;
	}
	return o;
}


// function to create a new health score between 100 and 140
function regenerate(){
	return Math.floor((Math.random() * 40) + 100 );
}

