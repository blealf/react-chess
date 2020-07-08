import React from 'react'
import king from '../images/king.svg';
import ChessPieceImage from './ChessPieceImage';

const King = ({ onDragStart, keyId }) => {
  return (
    <div draggable="true" onDragStart={onDragStart}>
      <ChessPieceImage image={king} imageId={keyId} />
    </div>
  )
}

export default King
