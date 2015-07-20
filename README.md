# Project Platformer

## About

Game is roughly based on [Dark Blue](http://www.lessmilk.com/games/10) by Thomas
Palef. This game is choosed because it is both entertaining and minimalist, and
because it can be built without too much code. It looks like this:

![Platformer](http://eloquentjavascript.net/img/darkblue.png)

## World and Symbols

The dark box represents the player, whose task is to collect the yellow boxes
coins) while avoiding the red stuff (lava?). A level is completed when all coins
have been collected.

## Playing the game

The player can walk around with the left and right arrow keys and jump with the
up arrow. Jumping is a specialty of this game character. It can reach several
times its own height and is able to change direction in midair. This may not
be entirely realistic, but it helps give the player the feeling of being in
direct control of the onscreen avatar.


The game consists of a fixed background, laid out like a grid, with the moving
elements overlaid on that background. Each field on the grid is either empty,
solid, or lava. The moving elements are the player, coins, and certain pieces
of lava. Unlike the artificial life simulation from Chapter 7, the positions
of these elements are not constrained to the grid—their coordinates may be
fractional, allowing smooth motion.
