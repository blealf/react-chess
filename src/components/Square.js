import React from 'react';

const Square = ({tileColor, piece, allPositions, changePosition, position}) => {
  var squareRef = React.useRef();
  

  const handleDrop = (e) => {

    e.preventDefault();
    e.stopPropagation();
    const id = e.dataTransfer.getData('text')
    // console.log(document.getElementById(id))
    const piece = document.getElementById(id);
    if(!(squareRef.current.children.children > 0)){
      squareRef.current.appendChild(piece)
    } 
    // console.log(position)
    // changePosition(allPositions.map(pos => (pos.value === piece.id ? pos.value: position)))
    e.dataTransfer.clearData();
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(squareRef)
    
  }

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.background = "green";
  }

  return (
    <div 
      ref={squareRef}
      style={{
        width: "12.5%",
        height: "12.5%",
        display: "inline-block",
        marginBottom: "-4px",
        backgroundColor: (tileColor === "white") ? "white" : "brown"
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {piece}
    </div>
  )
}

export default Square

// style={{width: {width}, height: {height}, background: {color}, display: "inline"}}