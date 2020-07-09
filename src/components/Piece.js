import React from 'react';
// import styled from 'styled-components';
import kingB from './images/kingB.svg';
import queenB from './images/queenB.svg';
import bishopB from './images/bishopB.svg';
import knightB from './images/knightB.svg';
import rookB from './images/rookB.svg';
import pawnB from './images/pawnB.svg';
import kingW from './images/kingW.svg';
import queenW from './images/queenW.svg';
import bishopW from './images/bishopW.svg';
import knightW from './images/knightW.svg';
import rookW from './images/rookW.svg';
import pawnW from './images/pawnW.svg';


const Piece = ({ ID, name, color, onDragStart, position }) => {

  const chosenPiece = (whitePiece, blackPiece) => {
    const chosenPiece = (color === "white") ? 
      (<img
        draggable
        onDragStart={onDragStart}
        id={ID} 
        src={whitePiece}
        alt={whitePiece}
        position={position}
        style={{
          height: "100%",
          width: "100%",
          padding: "0px"
        }}/>) : 
      (<img 
        draggable
        onDragStart={onDragStart}
        id={ID}
        src={blackPiece}
        alt={blackPiece}
        position={position}
        style={{
          height: "100%",
          width: "100%",
          padding: "0px",
          // border: "2px solid black"
        }}/>);
    return chosenPiece;
  }

  var image = null
  switch(name){
    case "king":
      image = chosenPiece(kingW, kingB)
      break;
    case "queen":
      image = chosenPiece(queenW, queenB)
      break;
    case "bishop":
      image = chosenPiece(bishopW, bishopB)
      break;
    case "knight":
      image = chosenPiece(knightW, knightB)
      break;
    case "rook":
      image = chosenPiece(rookW, rookB)
      break;
    case "pawn":
      image = chosenPiece(pawnW, pawnB)
      break;
    default:
  }

  return (image)
}

export default Piece;