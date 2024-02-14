import { useRef } from 'react';
import kingB from 'assets/images/kingB.svg';
import queenB from 'assets/images/queenB.svg';
import bishopB from 'assets/images/bishopB.svg';
import knightB from 'assets/images/knightB.svg';
import rookB from 'assets/images/rookB.svg';
import pawnB from 'assets/images/pawnB.svg';
import kingW from 'assets/images/kingW.svg';
import queenW from 'assets/images/queenW.svg';
import bishopW from 'assets/images/bishopW.svg';
import knightW from 'assets/images/knightW.svg';
import rookW from 'assets/images/rookW.svg';
import pawnW from 'assets/images/pawnW.svg';
import { PieceProps } from '../types/types';

const Piece = ({ ID, name, color, onDragStart, position }: PieceProps) => {
  const pieceRef = useRef<HTMLImageElement | null>(null);

  const chosenPiece = (whitePiece: string, blackPiece: string) => {
    const chosenPiece = (color === "white") ? 
      (<img
        ref={pieceRef}
        draggable
        onDragStart={onDragStart}
        id={ID} 
        src={whitePiece}
        alt={whitePiece}
        data-position={position}
        data-name={name}
        data-piece={name+'W'}
        style={{
          height: "100%",
          width: "100%",
          padding: "0px",
          transition: "all 0.5s ease-in-out"
        }}/>) : 
      (<img
        ref={pieceRef}
        draggable
        onDragStart={onDragStart}
        id={ID}
        src={blackPiece}
        alt={blackPiece}
        data-position={position}
        data-name={name}
        data-piece={name+'B'}
        style={{
          height: "100%",
          width: "100%",
          padding: "0px",
          transition: "all 0.5s ease-in-out"
        }}/>);
    return chosenPiece;
  }

  let image = null
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