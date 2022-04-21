let board = {
  domBoard: document.querySelector(".board"),
  domTiles: undefined,
  width: 20,
  height: 10,
  
  draw(){
    for(let i = 0; i < this.height; i++){
      let row = document.createElement("div")
      this.domBoard.appendChild(row)
      for(let j = 0; j < board.width; j++){
        let tile = document.createElement("div")
        tile.classList = "tile"
        tile.setAttribute("x",`${j}`)
        tile.setAttribute("y",`${i}`)
  
        tile.addEventListener("click", () => {
          console.log(tile)
        })
  
        row.appendChild(tile)
      }
    }
    this.domBoard.style.aspectRatio = `${board.width}/${board.height}`
    this.domTiles = document.querySelectorAll(".tile")
  }
}

let mines = {
  quantity: 20,
  positions: [],
  
  placeMines(){
    for (let i = 0; i < this.quantity; i++) {
      let x = rand(board.width)
      let y = rand(board.height)
      let mined = document.querySelector(`[x="${x}"][y="${y}"]`)
      mined.classList.add("selected")
    }
  }
}

board.draw()
mines.placeMines()

function rand(n){
  return Math.floor(Math.random()*n)
}