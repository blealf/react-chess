import { DragEvent, useRef } from 'react';
import Piece from './Piece';
import { ChessPieceType, SquarePropsType } from '../types/types';


const Square = ({
  boardMatrix,
  changePosition,
  uniqueId,
  onDragStart,
  squarePosition,
  tileColor,
  updateBlackKill,
  updateWhiteKill,
  setWhiteMoved,
  simulate,
}: SquarePropsType) => {
  const squareRef = useRef<HTMLDivElement | null>(null);
  
  const movePiece = async (id: string | undefined) => {
    boardMatrix.filter((piece: { id: string}) => piece.id === id)
      .forEach((p: ChessPieceType) => {
        changePosition([...(boardMatrix.filter(piece => piece.id !== id)), {id: p.id, title: p.title, value: squarePosition}]);
      });
    await setWhiteMoved();
    simulate();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();

    const id = e.dataTransfer?.getData('text');
    const elements = document.getElementsByClassName('highlightedMove');
    const killMove = document.getElementsByClassName('killMove');
    const currentSquareRef = squareRef.current?.children;
    const dropIndicator = currentSquareRef && currentSquareRef[0];

    if (dropIndicator
      && dropIndicator.className
      && dropIndicator.className === 'highlightedMove'){
        movePiece(id);
    } 
    
    if (dropIndicator && killMove.length > 0) {
      const isKillMove = squareRef.current?.getAttribute('class') === 'killMove';
      if (isKillMove){
        while(killMove.length > 0){
          if (killMove[0].getAttribute('uniqueId') === squareRef.current?.getAttribute('uniqueId')) {
            const piece = killMove[0].children[0].getAttribute('data-piece');
            if (piece && piece.charAt(piece.length - 1) === 'W') {
              updateWhiteKill(piece);
            } else {
              updateBlackKill(piece);
            }     
            killMove[0].removeChild(killMove[0].children[0]);
          }
          killMove[0].removeAttribute('class');
        }
        movePiece(id);
      }
    }

    while(elements.length > 0){
      elements[0].parentNode?.removeChild(elements[0]);
    }
    while(killMove.length > 0){
      killMove[0].removeAttribute('class');
    }
    
    e.dataTransfer?.clearData();
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      id={uniqueId}
      ref={squareRef}
      style={{
        width: '12.5%',
        height: '12.15%',
        display: 'inline-block',
        backgroundColor: tileColor,
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      data-position={squarePosition}
    >
      {boardMatrix.filter(pos => (JSON.stringify(squarePosition) === JSON.stringify(pos.value)))
        .map(p => {
          return(<Piece
            color={(p.id.includes('w')) ? 'white' : 'black'} 
            uniqueId={p.id} 
            name={p.title} 
            info={p.title + p.id.includes('w') ? 'W' : 'B' }
            key={p.id}
            onDragStart={onDragStart}
            position={p.value}
          />);
          }
        )
      }
    </div>
  );
};

export default Square;
