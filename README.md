# minesweeper
Welcome to this new project! This time I'm ~~procrastinating the HTML forms course~~ making another game: the classic Minesweeper.

The objective of this project is just to keep practicing, but having fun at the same time. This time I want to make use of `JS`'s objects. My previous project, [Lights Out](https://github.com/HectorVilas/lights-out), was made with primitives and a lot of code got mixed and hard to read, so I better start using some objects for a tidy code.

## play the game
# https://hectorvilas.github.io/minesweeper/

## roadmap:
This is just a to-do a list to keep track of the progress. More will be added while the project keeps evolving.

- ✅ write down the README file

### design:
- ✅ height must be same as window size to prevent scrolling
- ✅ board must scale with window
- ✅ board must keep aspect ratio

### things to display on screen:
- ✅ the board
- ❌ counters
- - ❌ remaining mines
- - ❌ time played
- ❌ classic smiley face
- ❌ menu buttons

### game options and buttons:
- ❌ how to play
- ❌ settings
- - ❌ number of mines
- - ❌ board size (X and Y)
- ❌ about
- - ❌ link to my Github profile
- - ❌ credits for any media I may use

### board generation:
- ✅ the board must be generated
- - ❌ width and height defined by option settings
- ❌ mines will be hidden in the board
- - ❌ quantity defined by option settings
- - ❌ the position will be randomized

### game logic:
- ❌ when a tile is clicked
- - ❌ if there's a mine
- - - ❌ show it and reveal the rest of the mines
- - - ❌ the game is over
- - - ❌ the player can't keep clicking on the board without starting again
- - ❌ else, show the number of mines surrounding the tile
- - - ❌ if there's no mines, nothing will be shown
- - - ❌ the surrounding tiles will auto-reveal until there's a mine around
- ❌ right click must add a flag to mark a mine
- - ❌ every flag must reduce the mine counter by one
- - ❌ player can't put more flag than the number of mines
- - ❌ in case of a present flag, it will be removed
- ❌ when all mines has been discovered and tiles without mines revealed
- - ❌ the game ends, announcing it
- - ❌ remaining flags will be placed over the mines
- - ❌ the timer must stop

### other ideas:
- ❌ a graphic minefield
- ❌ non-rectangular board shapes
- ❌ num type input items changes board size in real time
- ❌ sounds
- - ❌ sound toggle button in options
- ❌ show the README.md in the page

## update 1
I just made a simple page with some style to start with the game. I wasn't sure how to make it, so I went again for a really simple aestetic, I can change it later.

The board is being generated with `JS` and all the board related attributes are held as an object. This is the first time I make something like this.

I still have some problems with the board scaling. I can make it shrink with the navigator window horizontally or vertically, but not both ways. I can't figure it out. Another problem is how it looks with too much or too little tiles on screen. May adjust the scaling depending on the total tiles so these don't look too big or too small. In this case I may remove the dynamic scaling.

Now I've been thinking: how should I proceed? Should I make a 2D array to store the bombs, clicked tiles with it's number of mines around it and flags and then update the board? Or should I just make some array with the mines position and don't redraw too much in the screen? The former sounds easier to make, but I think the latter is the best way to proceed.

## update 2
I just wrote the basic object for the mines. Just for testing, 20 mines will be randomly placed and shown in red on the board. Now I need to store those coordinates instead of making those visible to the player.

Thoughts: creating and using objects is so easy, I don't know why I didn't used them before. The code is much easier to read. I'm also avoiding using semicolons because the code looks really clean. I was using them just because I got the habit from `C++` and `C#` (I just know the basics, the most advanced thing I made in those two was a Battleship game for the console). And the objects? Same case: I got some basic experience from those two languages while learning them just for fun.

**Note:** after finding an error, I just noticed semicolons are still important. What do I mean? This is an example:
```javascript
function test(){
  let a = 0
  let b = 1
  ; //semicolon after last variable declaration
  [a,b].forEach(x => console.log(x))
}
```
Without that semicolon, the `forEach` won't work, because:
>Uncaught ReferenceError: can't access lexical declaration 'b' before initialization

To prevent future errors, I'm going back to "semicolonize" everything. Maybe it's for the good, I want to go back to `C++` and `C#` in the future, so I better don't lose the habit.

## update 3
The tiles now have actions. Once the player clicks on one, if there's a mine in any of the eight surrounding tiles, the total number of mines will be displayed on it.

Playing a little I just noticed something: the randomizer can place another mine in the same occupied space, and it will show in the number revealing the surrounding mined tiles. I need a condition to check if there's a mine first and keep trying until it finds an empty space.

Something that worries me is: What if there's only a few available spaces? The `while` loop will go crazy generating thousand of coordinates until it hits the empty spot.

If I keep the mines number not too high (making the game less challenging), it won't be a problem, but I can try something in case I want to place 99 mines in a 10x10 board: make an array representing each tile, and the randomizer just removes an element for each mine, so it will never be selected twice.