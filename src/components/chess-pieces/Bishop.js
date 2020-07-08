import React from 'react'
import bishop from '../images/bishop.svg';
import ChessPieceImage from './ChessPieceImage';

const Bishop = ({ onDragStart, keyId }) => {
  return (
    <div draggable="true" onDragStart={(e) => onDragStart(e)}>
      <ChessPieceImage image={bishop} imageId={keyId}/>
    </div>
  )
}

export default Bishop
