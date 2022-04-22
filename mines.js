let board = {
  domBoard: document.querySelector(".board"),
  width: 25,
  height: 15,
  
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
  //adding number of mines around
  if(foundMines > 0){
    clickedTile.innerText = foundMines;
    let colors = ["blue","green","red","darkblue",
      "darkred","darkgreen","gray","gray"];
    clickedTile.style.color = colors[foundMines-1];
  };
};