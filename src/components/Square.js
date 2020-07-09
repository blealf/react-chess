import React from 'react';
import Piece from './Piece';

const Square = ({
  boardMatrix,
  changePosition,
  ID,
  onDragStart,
  squarePosition,
  tileColor
}) => {
  var squareRef = React.useRef();
  
  const movePiece = (id) => {
    boardMatrix.filter(piece => piece.id === id)
      .forEach(p => {
        changePosition([...(boardMatrix.filter(piece => piece.id !== id)), {id: p.id, title: p.title, value: squarePosition}]);
      })
  }

  const handleDrop = (e) => {
    e.preventDefault();

    const id = e.dataTransfer.getData('text');

    // if((squareRef.current.children.length < 1)){
    //   movePiece(id);
    // } else {
    //   if((JSON.stringify(squareRef.current.children[0].tagName).includes("DIV"))
    //     && !(squareRef.current.children[0].children.length < 1)) {
    //       movePiece(id);
    //   } else {
    //     return null;
    // }}
    // console.log(squareRef.current.children[0].className)

    const dropIndicator = squareRef.current.children[0];
    if (dropIndicator
      && dropIndicator.className
      && dropIndicator.className === "highlightedMove"){
        movePiece(id);
    } else {
      // alert("cannot drop here")
    }
    

    const elements = document.getElementsByClassName("highlightedMove")
    console.log(elements)

    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }

    // console.log(squareRef.current)
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