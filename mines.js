const board = document.querySelector(".board")
let boardWidth = 10
let boardHeight = 5

drawBoard()

function drawBoard(){
  for(let i = 0; i < boardHeight; i++){
    let row = document.createElement("div")
    board.appendChild(row)
    for(let j = 0; j < boardWidth; j++){
      let tile = document.createElement("div")
      tile.classList = "tile"
      tile.setAttribute("x",`${j}`)
      tile.setAttribute("y",`${i}`)
      row.appendChild(tile)
    }
  }
  board.style.aspectRatio = `${boardWidth}/${boardHeight}`
}