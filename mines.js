let gameOver = false;

let board = {
  domBoard: document.querySelector(".board"),
  width: 20,
  height: 10,
  
  draw(){
    gameOver = false;
    //removing board to allow redrawing
    while(this.domBoard.hasChildNodes()){
      this.domBoard.removeChild(this.domBoard.firstChild);
    };

    for(let i = 0; i < this.height; i++){
      let row = document.createElement("div");
      this.domBoard.appendChild(row);
      for(let j = 0; j < this.width; j++){
        let tile = document.createElement("div");
        tile.classList = "tile";
        tile.setAttribute("x",`${j}`);
        tile.setAttribute("y",`${i}`);
        tile.style.aspectRatio = "1/1"; //prevent tile reescaling with number

        tile.addEventListener("click", () => {
          if(!gameOver){
            checkForMines(j,i);
          };
        });
        row.appendChild(tile);
      };
    };
    this.domBoard.style.aspectRatio = `${this.width}/${this.height}`;
  },
};

let mines = {
  quantity: 30,
  positions: [],
  
  placeMines(){
    this.positions = []; //clearing array before placing mines
    for (let i = 0; i < this.quantity; i++) {
      let x = this.rand(board.width);
      let y = this.rand(board.height);
      let posToString = mines.positions.map(m => m.toString());

      while (posToString.includes([x,y].toString())){
        // console.log("tile occupied, retrying...");
        x = this.rand(board.width);
        y = this.rand(board.height);
      };

      this.positions.push([x,y]);
    };
  },

  rand(n){
    return Math.floor(Math.random()*n);
  },
};

//on click
function checkForMines(x,y){
    let posToString = mines.positions.map(m => m.toString());
    if(posToString.includes([x,y].toString())){
      alert("mine");
      devTools.revealMines();
      gameOver = true;
    } else {
      showSurroundingMines(x,y);
    };
    winCondition();/////// testing
};

function winCondition(){
  let allTheTiles = document.querySelectorAll(".tile");
  let remainingTiles = board.width*board.height-mines.quantity;
  allTheTiles.forEach(t => {
    if(t.className.includes("selected")){
      remainingTiles--;
    }
  });
  if (remainingTiles == 0){
    devTools.revealMines();
    alert("win");
    gameOver = true;
  };
};

function showSurroundingMines(x,y){
  let surrounding = [];
  let minesAround = 0;
  validPosition(x,y-1,surrounding); //N
  validPosition(x+1,y-1,surrounding); //NE
  validPosition(x+1,y,surrounding); //E
  validPosition(x+1,y+1,surrounding); //SE
  validPosition(x,y+1,surrounding); //S
  validPosition(x-1,y+1,surrounding); //SW
  validPosition(x-1,y,surrounding); //W
  validPosition(x-1,y-1,surrounding); //NW

  let empty = [];//for recursion

  surrounding.forEach(t => {
    let minesFound = false;
    mines.positions.forEach(m =>{
      if(t.toString() == m.toString()){
        minesAround++;
        minesFound = true;
      };
    });
    const thisTile = document.querySelector(`[x="${t[0]}"][y="${t[1]}"]`);
    if(minesFound == false
      && !thisTile.className.includes("selected")){
      empty.push(t);
    };
  });

  const showTile = document.querySelector(`[x="${x}"][y="${y}"]`);
  showTile.classList.add("selected");
  //adding number of mines around
  if(minesAround > 0){
    showTile.innerText = minesAround;
    let colors = ["blue","green","red","darkblue",
      "darkred","darkgreen","gray","gray"];
    showTile.style.color = colors[minesAround-1];
  };

  //conditions for recursion
  empty.forEach(e => {
    const thisTile = document.querySelector(`[x="${x}"][y="${y}"]`);
    
    if(thisTile.innerText.length == 0){
      showSurroundingMines(e[0],e[1]);
    };
  });
};

function validPosition(x,y,arr){
  if(x >= 0 && x < board.width && y >=0 && y < board.height){
    arr.push([x,y]);
  };
};

let devTools = {
  revealMines(){
    mines.positions.forEach(mine => {
      document.querySelector(`[x="${mine[0]}"][y="${mine[1]}"]`)
      .classList.add("reveal");
    });
  },
};

let minesCounter = document.querySelector(".mines-counter");
minesCounter.innerText = mines.quantity;

let menu = document.querySelector(".menu");
let btnOptions = document.querySelector(".options-button");
btnOptions.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

let sliderX = document.querySelector("#scale-x");
let sliderXOutput = document.querySelector(".scale-x-output");
sliderX.addEventListener("input", () => {
  sliderXOutput.innerText = parseInt(sliderX.value);
  board.width = parseInt(sliderX.value);
  maxMines();
});

let sliderY = document.querySelector("#scale-y");
let sliderYOutput = document.querySelector(".scale-y-output");
sliderY.addEventListener("input", () => {
  sliderYOutput.innerText = parseInt(sliderY.value);
  board.height = parseInt(sliderY.value);
  maxMines();
});

let sliderMines = document.querySelector("#mines");
let sliderMinesOutput = document.querySelector(".mines-output");
sliderMines.addEventListener("input", () => {
  sliderMinesOutput.innerText = parseInt(sliderMines.value);
  mines.quantity = parseInt(sliderMines.value);
});

function maxMines(){ //prevent more mines tan tiles
  sliderMines.max = board.width*board.height;
  if(parseInt(mines.quantity) > parseInt(sliderMines.max)){
    mines.quantity = parseInt(sliderMines.max);
    sliderMines.value = parseInt(sliderMines.max);
    sliderMinesOutput.innerText = sliderMines.value;
    sliderMinesOutput.innerText = parseInt(sliderMines.max);
  };
};

let btnApply = document.querySelector(".settings-apply");
btnApply.addEventListener("click", () => {
  board.draw();
  mines.placeMines();
});

//starting game
board.draw();
mines.placeMines();