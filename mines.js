let board = {
  dom: document.querySelector(".board"),
  width: 20,
  height: 10,
  draw(){
    for(let i = 0; i < this.height; i++){
      let row = document.createElement("div")
      this.dom.appendChild(row)
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
    this.dom.style.aspectRatio = `${board.width}/${board.height}`
  }
}

board.draw()