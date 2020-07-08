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


const ChessPiece = ({ ID, name, color, onDragStart, position }) => {

  const chosenPiece = (whitePiece, blackPiece) => {
    const chosenPiece = (color === "white") ? 
      (<img
        src={whitePiece} 
        id={ID} 
        position={position}
        style={{
          height: "90%",
          width: "90%",
          marginBottom: "10px"
        }}
        />) : 
      (<img 
        src={blackPiece} 
        id={ID} 
        position={position}
        style={{
          margin: "0 auto",
          height: "85%",
          width: "85%",
          marginBottom: "5px"
        }}
        />);

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
  return (
      <div onDragStart={onDragStart} draggable="true" >
        {image}
      </div>
  )
}

export default ChessPiece;