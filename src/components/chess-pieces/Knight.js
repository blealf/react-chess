import React from 'react';
import knight from '../images/knight.svg';
import ChessPieceImage from './ChessPieceImage';

const Knight = ({ onDragStart, keyId }) => {
  return (
    <div draggable="true" onDragStart={onDragStart}>
      <ChessPieceImage image={knight} imageId={keyId}/>
    </div>
  )
}

export default Knight
