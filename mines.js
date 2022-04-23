let board = {
  domBoard: document.querySelector(".board"),
  width: 30,
  height: 20,
  
  draw(){
    for(let i = 0; i < this.height; i++){
      let row = document.createElement("div");
      this.domBoard.appendChild(row);
      for(let j = 0; j < board.width; j++){
        let tile = document.createElement("div");
        tile.classList = "tile";
        tile.setAttribute("x",`${j}`);
        tile.setAttribute("y",`${i}`);
        tile.style.aspectRatio = "1/1"; //prevent tile reescaling with number

        tile.addEventListener("click", () => {
          checkForMines(j,i);
        });
        row.appendChild(tile);
      };
    };
    this.domBoard.style.aspectRatio = `${board.width}/${board.height}`;
  },
}

let mines = {
  quantity: 50,
  positions: [],
  
  placeMines(){
    for (let i = 0; i < this.quantity; i++) {
      let x = this.rand(board.width);
      let y = this.rand(board.height);
      //coordinates to string for comparison
      let posToString = [];
      mines.positions.forEach(pos => posToString.push(pos.toString()));

      while (posToString.includes([x,y].toString())){
        console.log("tile occupied, retrying...");
        x = this.rand(board.width);
        y = this.rand(board.height);
      };

      this.positions.push([x,y]);
      //test, show mines on board
      const test = document.querySelector(`[x="${x}"][y="${y}"]`)
      test.classList.add("testing")
      ///////////////////////////
    };
  },

  rand(n){
    return Math.floor(Math.random()*n)
  },
};

board.draw();
mines.placeMines();

//on click
function checkForMines(x,y){
  let surrounding = [];
  let foundMines = 0;
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
    let minesFound = 0;
    mines.positions.forEach(m =>{
      if(t.toString() == m.toString()){
        foundMines++;
        minesFound++;
      };
    });
    const thisTile = document.querySelector(`[x="${t[0]}"][y="${t[1]}"]`);
    if(minesFound == 0
      && !thisTile.className.includes("selected")){
      empty.push(t);
    };
  });

  const showTile = document.querySelector(`[x="${x}"][y="${y}"]`);
  showTile.classList.add("selected");
  //adding number of mines around
  if(foundMines > 0){
    showTile.innerText = foundMines;
    let colors = ["blue","green","red","darkblue",
      "darkred","darkgreen","gray","gray"];
    showTile.style.color = colors[foundMines-1];
  };

  //conditions for recursion
  empty.forEach(e => {
    const thisTile = document.querySelector(`[x="${x}"][y="${y}"]`);
    
    if(thisTile.innerText.length == 0){
      checkForMines(e[0],e[1]);
    };
  });
};

function validPosition(x,y,arr){
  if(x >= 0 && x < board.width && y >=0 && y < board.height){
    arr.push([x,y]);
  };
};