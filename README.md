# Project Platformer

![Platformer](http://olehkazban.github.io/Project-Platformer/images/screen.png)

## Running the game

You should not install any plugins or additional software, you need only browser with JScript support.
In order to run the game you can run it directly from [repository](http://olehkazban.github.io/Project-Platformer) or
download to your computer as master package (or clone repo) and simple run index.html

## Playing the game

The main target in this game - to collect all coins. At the upper-left corner you should see your stats and be sure how
many lives you have and how many coins you should to collect. A level is completed when all coins 
have been collected.The player can walk around with the left and right arrow 
keys and jump with the up arrow. Jumping is a specialty of this game character. It can reach several
times its own height and is able to change direction in midair. This may not
be entirely realistic, but it helps give the player the feeling of being in
direct control of the onscreen avatar.


The game consists of a fixed background, laid out like a grid, with the moving
elements overlaid on that background. Each field on the grid is either empty (air),
solid (walls), or lava. The moving elements are the player, coins, and certain pieces
of lava. Unlike the artificial life simulation, the positions
of these elements are not constrained to the grid - their coordinates may be
fractional, allowing smooth motion.

## About

The Game is done as a example project of [Eloquent JavaScript](http://eloquentjavascript.net/) and is roughly based on
[Dark Blue](http://www.lessmilk.com/games/10) by Thomas Palef. This game is choosed because it is both entertaining and minimalist, and
because it can be built without too much code. It looks like this:

![Platformer](http://eloquentjavascript.net/img/darkblue.png)