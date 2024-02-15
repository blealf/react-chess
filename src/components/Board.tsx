import { useEffect, useCallback, useRef, useLayoutEffect, useReducer, DragEvent } from 'react';
import styled from 'styled-components';
import './style.css';
import Square from './Square';
import { chessPieces } from '../data';
import {
  kingMove,
  queenMove,
  bishopMove,
  knightMove,
  rookMove,
  pawnMove,
} from '../utils/Movements';
import { useDispatch } from 'react-redux';
import { updateKilled } from '../features/GameSlice';
import { simulate } from '../utils/simulate';
import { BoardStatePayload, BoardStateType, ChessPieceArray, MovesReturnType, NumberArray } from '../types/types';

const BoardWrapper = styled.div`
  margin: 0 auto;
  width: 700px;
  height: 700px;
  margin-bottom: -10px;
  border: 1px solid teal;
  transform: rotateY(-10deg) rotateX(20deg);
  -webkit-transform: rotateY(-10deg) rotateX(25deg);
  box-shadow: 10px 10px 50px #1a202c, 0 1px 40px teal;
  transition: transform 1s ease-in-out;
  // background: #1a202c;
`;

// console.log(kingMove([0,3]))
// console.log(pawnMove([1,3], false, true, ["[1,2]"]))
// console.log(pawnKill([0,1], true))
// console.log(knightMove([2,3]))
// console.log(rookMove([3,3]));
// console.log(bishopMove([3,3]));
// console.log(queenMove([3,3]));
// console.log(testMoves([3,3]));
const initialPosition: ChessPieceArray = chessPieces;
const initialState: BoardStateType = {
  occupied: [],
  position: initialPosition,
  moveColor: [{
    id: '',
    color: ''
  }],
  whiteKilled: [],
  blackKilled: [],
  whiteMoved: false,
  kingPosition: {
    white: initialPosition.find((piece) => piece.id === 'wk1')?.value,
    black: initialPosition.find((piece) => piece.id === 'wk1')?.value
  },
  firstUpdate: true
};

const boardReducer = (state:BoardStateType , action: { type: string, payload: BoardStatePayload}) => {
  switch (action.type) {
    case 'SET_OCCUPIED':
      return { ...state, occupied: action.payload };
    case 'SET_POSITION':
      return { ...state, position: action.payload };
    case 'SET_MOVE_COLOR':
      return { ...state, moveColor: action.payload };
    case 'SET_BLACK_KILLED':
      return { ...state, blackKilled: action.payload };
    case 'SET_WHITE_KILLED':
      return { ...state, whiteKilled: action.payload };
    case 'SET_WHITE_MOVED':
      return { ...state, whiteMoved: action.payload };
    case 'SET_KING_POSITION':
      return { ...state, kingPosition: action.payload };
    case 'SET_FIRST_UPDATE':
      return { ...state, firstUpdate: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const Board = () => {

  const checkedPattern = [];
  let swap = false;

  const [{
    occupied,
    position,
    moveColor,
    whiteKilled,
    blackKilled,
    whiteMoved,
    firstUpdate,
  }, dispatch] = useReducer(boardReducer, initialState);

  const storeDispatch = useDispatch();
  const boardRef = useRef(null);
  const updateKilledPieces = useCallback(() => {
    // console.log(blackKilled, whiteKilled)
    storeDispatch(updateKilled({ blackKilled: blackKilled, whiteKilled: whiteKilled}));
  }, [blackKilled, whiteKilled, storeDispatch]);


  useLayoutEffect(() => {
    // console.log(firstUpdate, whiteMoved)
    if (firstUpdate && whiteMoved === false) {
      dispatch({
        type: 'SET_FIRST_UPDATE',
        payload: false,
      });
      return;
    }
    setTimeout(() => {
      flipBoard(whiteMoved ? 'black' : 'white');
    }, 100);
  }, [whiteMoved, firstUpdate]);

  useEffect(() => {
    dispatch({
      type: 'SET_OCCUPIED',
      payload: position.map((p) => JSON.stringify(p.value))
    });
    updateKilledPieces();

  }, [position, updateKilledPieces]);

  const onDragStart = (e: DragEvent) => {
    e.dataTransfer.setData('text', e.target.id);
    playPiece(e);
  };

  const setColor = (id: string, color: string): string => {
    let selectedColor = '';
    moveColor.forEach((c: { id: string, color: string }) => {
      if (c.id === id) {
        selectedColor = c.color;
      } else { selectedColor = color; }
    });
    return selectedColor;
  };

  
  const createPattern = (color: string, currentPos: NumberArray) => {
    checkedPattern.push(<Square
      tileColor={setColor(JSON.stringify(currentPos), color)}
      key={JSON.stringify(currentPos)}
      uniqueId={JSON.stringify(currentPos)}
      squarePosition={currentPos}
      boardMatrix={position}
      onDragStart={onDragStart}
      updateBlackKill={(val) => dispatch({ type: 'SET_BLACK_KILLED', payload: [...blackKilled, val]})}
      updateWhiteKill={(val) => dispatch({ type: 'SET_WHITE_KILLED', payload: [...whiteKilled, val]})}
      setWhiteMoved={() => dispatch({ type: 'SET_WHITE_MOVED', payload: !whiteMoved})}
      changePosition={(val) => dispatch({ type: 'SET_POSITION', payload: val})}
      simulate={() => simulate({ position, whiteMoved, occupied })}
      onChangeColor={() => changeColor(JSON.stringify(currentPos))}
    />);
  };

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      (swap) ? createPattern('white', [i, j]) : createPattern('brown', [i, j]);
      swap = (j < 7) ? !swap : swap;
    }
  }

  const changeColor = (id) => {
    checkedPattern.filter(square =>
      id === square.props.position
    ).forEach(() => {
      dispatch({ 
        type: 'SET_MOVE_COLOR', 
        payload: [...moveColor, { id: id, color: 'green' }]
      });
    });
  };

  const playPiece = (e: DragEvent) => {

    let canPlay: MovesReturnType = [];
    const liftedPiece = e.target;
    const piecePosition: NumberArray = [];
    const piece = liftedPiece.getAttribute('name');
    const pieceColor = liftedPiece.getAttribute('id').charAt(0);
    let moved = false;
    const canMove =
      (whiteMoved === false && pieceColor === 'w') ||
      (whiteMoved === true && pieceColor === 'b');
      
    if (!canMove) return; 
    liftedPiece.getAttribute('position').split(',').forEach(num => {
      piecePosition.push(parseInt(num));
    });

    if (((piecePosition[0] > 1) && pieceColor === 'b') ||
      ((piecePosition[0] < 6) && pieceColor === 'w')) {
      moved = true;
    }

    switch (piece) {
      case 'king':
        canPlay = kingMove(piecePosition);
        break;
      case 'queen':
        canPlay = queenMove(piecePosition, occupied);
        break;
      case 'bishop':
        canPlay = bishopMove(piecePosition, occupied);
        break;
      case 'knight':
        canPlay = knightMove(piecePosition);
        break;
      case 'rook':
        canPlay = rookMove(piecePosition, occupied);
        break;
      case 'pawn':
        canPlay = (pieceColor === 'b') ?
          pawnMove(piecePosition, moved, true, occupied) :
          pawnMove(piecePosition, moved, false, occupied);
        break;
      default:
    }

    determineDropLocation(canPlay, liftedPiece);
  };

  const determineDropLocation = (play, liftedPiece) => {
    play.forEach(move => {
      const square = document.getElementById(JSON.stringify(move));
      if (square && square.children.length < 1) {
        const element = document.createElement('div');
        element.setAttribute('class', 'highlightedMove');
        Object.assign(element.style, {
          margin: '0 auto',
          marginTop: '30px',
          height: '20px',
          width: '20px',
          borderRadius: '5px',
          backgroundColor: 'green',
        });
        square.appendChild(element);
      }
      else {
        if (square && square.children.length > 0) {
          if(liftedPiece){
            if(liftedPiece.getAttribute('id')?.charAt(0) !== square.children[0].getAttribute('id')?.charAt(0)){
              square.setAttribute('class', 'killMove');
            }
          }
        }
      }
    });
  };

  const resetBoard = () => {
    dispatch({ type: 'RESET' });
    flipBoard('white');
  };

  const flipBoard = (color) => {
    if (color === 'white' || boardRef.current.style.transform.includes('170')) {
      boardRef.current.style.transform = 'rotateY(-10deg) rotateX(20deg)';
      boardRef.current.childNodes.forEach((child) => {
        if (child.children[0]) {
          child.children[0].style.transform = 'rotate(0deg)';
        }
      });
    } else {
      boardRef.current.style.transform = 'rotateY(170deg) rotateX(160deg)';
      boardRef.current.childNodes.forEach((child) => {
        if (child.children[0]) {
          child.children[0].style.transform = 'rotate(180deg)';
        }
      });
    }
    // setPosition(position.map(pos => ({ ...pos, value: [7 - pos.value[0], 7 - pos.value[1]] })))
  };

  const handleBoardUpdate = () => {
    const elements = document.getElementsByClassName('highlightedMove');
    const killMove = document.getElementsByClassName('killMove');
    try {
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
      while (killMove.length > 0) {
        killMove[0].removeAttribute('class');
      }
    // eslint-disable-next-line no-empty
    } catch(err) {}
  };

  return (
    <>
      <div className="board">
        <button onClick={() => simulate({ position, whiteMoved, occupied })}>Simulate</button>
        <button onClick={resetBoard}>Reset</button>
        <button onClick={flipBoard}>Flip</button>
      </div>
      <BoardWrapper
        ref={boardRef}
        onMouseLeave={handleBoardUpdate}
      >
        {checkedPattern}
      </BoardWrapper>
    </>
  );
};

export default Board;
