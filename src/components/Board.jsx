import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import './style.css'
import Square from './Square';
import chessPieces from '../data';
import moves, {
  kingMove,
  queenMove,
  bishopMove,
  knightMove,
  rookMove,
  pawnMove,
} from 'utils/Movements';
import { useDispatch } from 'react-redux'
import { updateKilled } from 'features/GameSlice'

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


const Board = ({ reset }) => {

  const initialPosition = chessPieces;
  const [occupied, setOccupied] = useState([]);
  const [position, setPosition] = useState(initialPosition);
  const [moveColor, setMoveColor] = useState([
    {
      id: "",
      color: ""
    }
  ]);
  const [blackKilled, setBlackKilled] = useState([]);
  const [whiteKilled, setWhiteKilled] = useState([]);
  const [whiteMoved, setWhiteMoved] = useState(false);
  const [kingPosition, setKingPosition] = useState({
    white: initialPosition.find((piece) => piece.id === "wk1").value,
    black: initialPosition.find((piece) => piece.id === "wk1").value
  });
  const dispatch = useDispatch()
  const boardRef = useRef(null);
  const [firstUpdate, setFirstUpdate] = useState(true);

  const updateKilledPieces = useCallback(() => {
    console.log(blackKilled, whiteKilled)
    dispatch(updateKilled({ blackKilled, whiteKilled}))
  }, [blackKilled, whiteKilled, dispatch])


  useLayoutEffect(() => {
    console.log(firstUpdate, whiteMoved)
    if (firstUpdate && whiteMoved === false) {
      setFirstUpdate(false);
      return;
    }
    setTimeout(() => {
      flipBoard(whiteMoved ? "black" : "white");
    }, 100);
  }, [whiteMoved])

  useEffect(() => {
    setOccupied(position.map((p) => JSON.stringify(p.value)))
    updateKilledPieces()

  }, [position, updateKilledPieces]);

  const onDragStart = (e) => {
    e.dataTransfer.setData('text', e.target.id);
    playPiece(e.target);
  }

  const simulate = () => {
    const allMoves = [];
    position.filter((pos) =>
      pos.title !== 'king' && pos.id.charAt(0) !== `${whiteMoved ? 'w' : 'b'}`)
      .forEach((piece) => {
        if (piece.title === 'pawn') {
          let moved = false
          if (((piece.value[0] > 1) && piece.id.charAt(0) === "b") ||
            (((piece.value[0] < 6) && piece.id.charAt(0) === "w"))) {
            moved = true
          }
          allMoves.push(...pawnMove(piece.value, moved, (piece.id.charAt(0) === "b"), occupied))
          console.log(`${piece.id}:`, pawnMove(piece.value, moved, (piece.id.charAt(0) === "b"), occupied))
        }
        else {
          allMoves.push(...moves[`${piece.title}Move`]((piece.value), occupied))
          console.log(`${piece.id}`, moves[`${piece.title}Move`]((piece.value), occupied))
        }
      }
    )
    // console.log(allMoves)
    let threatened = Array.from(position.find(pos => pos.id === `${whiteMoved ? "w" : "b"}k1`)?.value)
    threatened = !whiteMoved ? threatened.reverse() : threatened
    console.log('threatened',threatened)
    if (allMoves.find((move) => JSON.stringify(move) === JSON.stringify(threatened))) {
      console.log("FOUND")
      document.getElementById(`${whiteMoved ? 'w' : 'b'}k1`).setAttribute("class", "threatened")
      console.log(whiteMoved ? document.getElementById("wk1").style : document.getElementById("bk1").style)
    }
  }

  const setColor = (id, color) => {
    let selectedColor = ""
    moveColor.forEach(c => {
      if (c.id === id) {
        selectedColor = c.color
      } else { selectedColor = color }
    })
    return selectedColor;
  }

  var checkedPattern = [];
  var swap = false;

  const createPattern = (color, currentPos) => {
    checkedPattern.push(<Square
      tileColor={setColor(JSON.stringify(currentPos), color)}
      key={JSON.stringify(currentPos)}
      ID={JSON.stringify(currentPos)}
      squarePosition={currentPos}
      boardMatrix={position}
      onDragStart={onDragStart}
      updateBlackKill={setBlackKilled}
      updateWhiteKill={setWhiteKilled}
      setWhiteMoved={setWhiteMoved}
      changePosition={setPosition}
      simulate={simulate}
      onChangeColor={(e) => changeColor(JSON.stringify(currentPos))}
    />)
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      (swap) ? createPattern("white", [i, j]) : createPattern("brown", [i, j]);
      swap = (j < 7) ? !swap : swap;
    }
  }

  const changeColor = (id) => {
    checkedPattern.filter(square =>
      id === square.props.position
    ).forEach(() => {
      setMoveColor([...moveColor, { id: id, color: "green" }])
    })
  }

  const playPiece = (liftedPiece) => {

    let canPlay = []
    let piecePosition = []
    let piece = liftedPiece.getAttribute("name")
    let pieceColor = liftedPiece.getAttribute("id").charAt(0)
    let moved = false;
    const canMove =
      (whiteMoved === false && pieceColor === "w") ||
      (whiteMoved === true && pieceColor === "b")
      
    if (!canMove) return 
    liftedPiece.getAttribute("position").split(",").forEach(num => {
      piecePosition.push(parseInt(num))
    })

    if (((piecePosition[0] > 1) && pieceColor === "b") ||
      ((piecePosition[0] < 6) && pieceColor === "w")) {
      moved = true
    }

    switch (piece) {
      case "king":
        canPlay = kingMove(piecePosition)
        break;
      case "queen":
        canPlay = queenMove(piecePosition, occupied)
        break;
      case "bishop":
        canPlay = bishopMove(piecePosition, occupied)
        break;
      case "knight":
        canPlay = knightMove(piecePosition)
        break;
      case "rook":
        canPlay = rookMove(piecePosition, occupied)
        break;
      case "pawn":
        canPlay = (pieceColor === "b") ?
          pawnMove(piecePosition, moved, true, occupied) :
          pawnMove(piecePosition, moved, false, occupied)
        break;
      default:
    }

    determineDropLocation(canPlay, liftedPiece)
  }

  const determineDropLocation = (play, liftedPiece) => {
    play.forEach(move => {
      let square = document.getElementById(JSON.stringify(move))
      if (square && square.children.length < 1) {
        let element = document.createElement("div")
        element.setAttribute("class", "highlightedMove")
        Object.assign(element.style, {
          margin: "0 auto",
          marginTop: "30px",
          height: "20px",
          width: "20px",
          borderRadius: "5px",
          backgroundColor: "green",
        })
        square.appendChild(element);
      }
      else {
        if (square && square.children.length > 0) {
          if(liftedPiece){
            if(liftedPiece.getAttribute("id")?.charAt(0) !== square.children[0].getAttribute("id")?.charAt(0)){
              square.setAttribute('class', 'killMove');
            }
          }
        }
      }
    })
  }

  const resetBoard = () => {
    setPosition(initialPosition);
    setOccupied([]);
    setBlackKilled([]);
    setWhiteKilled([]);
    setWhiteMoved(false);
    flipBoard("white");
  }

  const flipBoard = (color) => {
    if (color === "white" || boardRef.current.style.transform.includes('170')) {
      boardRef.current.style.transform = 'rotateY(-10deg) rotateX(20deg)'
      boardRef.current.childNodes.forEach((child) => {
        if (child.children[0]) {
          child.children[0].style.transform = "rotate(0deg)"
        }
      });
    } else {
      boardRef.current.style.transform = "rotateY(170deg) rotateX(160deg)";
      boardRef.current.childNodes.forEach((child) => {
        if (child.children[0]) {
          child.children[0].style.transform = "rotate(180deg)"
        }
      });
    }
    // setPosition(position.map(pos => ({ ...pos, value: [7 - pos.value[0], 7 - pos.value[1]] })))
  }




  return (
    <>
      <div className="board">
        <button onClick={simulate}>Simulate</button>
        <button onClick={resetBoard}>Reset</button>
        <button onClick={flipBoard}>Flip</button>
      </div>
      <BoardWrapper
        ref={boardRef}
        onMouseLeave={(e) => {
          const elements = document.getElementsByClassName
            ("highlightedMove")
          const killMove = document.getElementsByClassName("killMove")
          try {
            while (elements.length > 0) {
              elements[0].parentNode.removeChild(elements[0]);
            }
            while (killMove.length > 0) {
              killMove[0].removeAttribute("class");
            }
          } catch(err) {}
        }}
      >
        {checkedPattern}
      </BoardWrapper>
    </>
  )
}

export default Board

