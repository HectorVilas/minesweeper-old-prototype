let board = {
  domBoard: document.querySelector(".board"),
  width: 3,
  height: 3,
  
  draw(){
    for(let i = 0; i < this.height; i++){
      let row = document.createElement("div");
      this.domBoard.appendChild(row);
      for(let j = 0; j < board.width; j++){
        let tile = document.createElement("div");
        tile.classList = "tile";
        tile.setAttribute("x",`${j}`);
        tile.setAttribute("y",`${i}`);
        tile.style.aspectRatio = "1/1";

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
  quantity: 1,
  positions: [],
  
  placeMines(){
    for (let i = 0; i < this.quantity; i++) {
      let x = rand(board.width);
      let y = rand(board.height);
      //coordinates to string for comparison
      let posToString = [];
      mines.positions.forEach(pos => posToString.push(pos.toString()));

      while (posToString.includes([x,y].toString())){
        console.log("tile occupied, retrying...");
        x = rand(board.width);
        y = rand(board.height);
      };

      this.positions.push([x,y]);
      //test, show mines on board
      const test = document.querySelector(`[x="${x}"][y="${y}"]`)
      test.classList.add("testing")
      ///////////////////////////
    };
    
  },
};

board.draw();
mines.placeMines();

function rand(n){
  return Math.floor(Math.random()*n)
};

function checkForMines(x,y){
  let surrounding = [];
  let foundMines = 0;
  surrounding.push([x,y-1]); //N
  surrounding.push([x+1,y-1]); //NE
  surrounding.push([x+1,y]); //E
  surrounding.push([x+1,y+1]); //SE
  surrounding.push([x,y+1]); //S
  surrounding.push([x-1,y+1]); //SW
  surrounding.push([x-1,y]); //W
  surrounding.push([x-1,y-1]); //NW

  surrounding.forEach(t => {
    mines.positions.forEach(m =>{
      if(t.toString() == m.toString()){
        foundMines++;
      };
    });
  });
  const clickedTile = document.querySelector(`[x="${x}"][y="${y}"]`);
  clickedTile.classList.add("selected");
  clickedTile.innerText = foundMines;
  let colors = ["gray","blue","green","red","darkblue","darkred","darkgreen","gray","gray"];
  clickedTile.style.color = colors[foundMines];
};


//unused
function checkSurroundings(x,y){
  let tileC = document.querySelector(`[x="${x}"][y="${y}"]`);
  let tileN = document.querySelector(`[x="${x}"][y="${y-1}"]`);
  let tileNE = document.querySelector(`[x="${x+1}"][y="${y-1}"]`);
  let tileE = document.querySelector(`[x="${x+1}"][y="${y}"]`);
  let tileSE = document.querySelector(`[x="${x+1}"][y="${y+1}"]`);
  let tileS = document.querySelector(`[x="${x}"][y="${y+1}"]`);
  let tileSW = document.querySelector(`[x="${x-1}"][y="${y+1}"]`);
  let tileW = document.querySelector(`[x="${x-1}"][y="${y}"]`);
  let tileNW = document.querySelector(`[x="${x-1}"][y="${y-1}"]`);
  
  [tileC,tileN,tileNE,tileE,tileSE,tileS,tileSW,tileW,tileNW].forEach(t => {
    t.classList.add("selected");
  });
};