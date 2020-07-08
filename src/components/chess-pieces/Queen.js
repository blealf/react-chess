import React from 'react'
import queen from '../images/queen.svg';
import ChessPieceImage from './ChessPieceImage';

const Queen = ({ onDragStart, keyId }) => {
  return (
    <div draggable="true" onDragStart={onDragStart}>
      <ChessPieceImage image={queen} imageId={keyId}/>
    </div>
  )
}

export default Queen
