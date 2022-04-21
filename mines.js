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
          // tile.classList.add("selected")
          checkSurroundings(j,i)
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
      this.positions.push(`[${x},${y}]`)
    }
  }
}

board.draw()
mines.placeMines()

function rand(n){
  return Math.floor(Math.random()*n)
}

function checkSurroundings(x,y){
  let tileC = document.querySelector(`[x="${x}"][y="${y}"]`)
  let tileN = document.querySelector(`[x="${x}"][y="${y-1}"]`)
  ; //without this the forEach won't work
  [tileC, tileN].forEach(t => {
    t.classList.add("selected")
  })
}

function test(){
  let a = 0
  let b = 1
  [a,b].forEach(x => console.log(x))
}