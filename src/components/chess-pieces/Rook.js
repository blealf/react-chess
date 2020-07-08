import React from 'react';
import rook from '../images/rook.svg';
import ChessPieceImage from './ChessPieceImage';

const Rook = ({ onDragStart, keyId }) => {
  return (
    <div draggable="true" onDragStart={onDragStart}>
      <ChessPieceImage image={rook} imageId={keyId}/>
    </div>
  )
}

export default Rook
