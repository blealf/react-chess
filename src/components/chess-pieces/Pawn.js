import React from 'react'
import pawn from '../images/pawn.svg';
import ChessPieceImage from './ChessPieceImage';

const Pawn = ({ onDragStart, keyId }) => {
  return (
    <div draggable="true" onDragStart={onDragStart}>
      <ChessPieceImage image={pawn} imageId={keyId} />
    </div>
  )
}

export default Pawn
