# RPG-Game

[https://krosenk729.github.io/RPG-Game/](https://krosenk729.github.io/RPG-Game/)


## The rules are:

There are no rules

## JK. Here is the homework...

* You pick a character. This is your avatar
* You pick another character. This is who you are fighting
* You click an "attack" button
	* When you attack, your opponent loses points. You also lose points (because they also counter-attacked?)
	* Literally the only thing you can do is keep pressing attack. So keep pressing it
* Eventually you defeat this opponent
* You pick another character. Now this is who you are fighting.
	* You win once you've defeated all characters
	* You lose if your points run out
	* You have basically no control if you win or lose. That's life kid. 



##### Option 2 Game design notes

* Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.
* Each time the player attacks, their character's Attack Power increases by its base Attack Power. 
	* For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on).
* The enemy character only has `Counter Attack Power`. 
* Unlike the player's `Attack Points`, `Counter Attack Power` never changes.
* The `Health Points`, `Attack Power` and `Counter Attack Power` of each character must differ.
	* No characters in the game can heal or recover Health Points. 
	  * A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to grind `Attack Power` and to take on enemies before they lose all of their `Health Points`. Healing options would mess with this dynamic.
* Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.