import React, { useRef } from 'react';
import Piece from './Piece';

const Square = ({
  boardMatrix,
  changePosition,
  ID,
  onDragStart,
  squarePosition,
  tileColor
}) => {
  var squareRef = useRef();
  
  const movePiece = (id) => {
    boardMatrix.filter(piece => piece.id === id)
      .forEach(p => {
        changePosition([...(boardMatrix.filter(piece => piece.id !== id)), {id: p.id, title: p.title, value: squarePosition}]);
      })
  }

  const handleDrop = (e) => {
    e.preventDefault();

    const id = e.dataTransfer.getData('text');
    const elements = document.getElementsByClassName("highlightedMove")
    const killMove = document.getElementsByClassName("killMove")

    const dropIndicator = squareRef.current.children[0];
    if (dropIndicator
      && dropIndicator.className
      && dropIndicator.className === "highlightedMove"){
        movePiece(id);
    } 
    
    if(dropIndicator && killMove.length > 0){

      if (squareRef.current.getAttribute("class") === "killMove"){

        while(killMove.length > 0){

          if(killMove[0].getAttribute("ID") === squareRef.current.getAttribute("ID")){
            killMove[0].removeChild(killMove[0].children[0]);
          }
          killMove[0].removeAttribute("class");
        }
        movePiece(id);
      }
    }

    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
    while(killMove.length > 0){
      killMove[0].removeAttribute("class", "killMove");
    }
    
    e.dataTransfer.clearData();
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  return (
    <div
      id={ID}
      ref={squareRef}
      style={{
        width: "12.5%",
        height: "12.5%",
        display: "inline-block",
        // marginBottom: "-4px",
        backgroundColor: tileColor,
      }}
      // onDragStart={onDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      position={squarePosition}
    >
      {boardMatrix.filter(pos => (JSON.stringify(squarePosition) === JSON.stringify(pos.value)))
        .map(p => {
            return(<Piece
              color={(p.id.includes("w")) ? "white" : "black"} 
              ID={p.id} 
              name={p.title} 
              key={p.id}
              onDragStart={onDragStart}
              position={p.value}
            />)
          }
        )
      }
    </div>
  )
}

export default Square

// style={{width: {width}, height: {height}, background: {color}, display: "inline"}}