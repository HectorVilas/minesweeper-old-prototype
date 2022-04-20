# minesweeper
Welcome to this new project! This time I'm ~~procrastinating the HTML forms course~~ making another game: the classic Minesweeper.

The objective of this project is just to keep practicing, but having fun at the same time. This time I want to make use of `JS`'s objects. My previous project, [Lights Out](https://github.com/HectorVilas/lights-out), was made with primitives and a lot of code got mixed and hard to read, so I better start using some objects for a tidy code.

## play the game
# https://hectorvilas.github.io/minesweeper/

## roadmap:
This is just a to-do a list to keep track of the progress. More will be added while the project keeps evolving.

- ✅ write down the README file

### design:
- ❌ height must be same as window size to prevent scrolling
- ❌ board must scale with window
- ❌ board must keep aspect ratio

### things to display on screen:
- ❌ the board
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
- ❌ the board must be generated
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