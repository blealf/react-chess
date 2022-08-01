import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './style.css'
import Square from './Square';
import chessPieces from '../data';
import {
  kingMove,
  queenMove,
  bishopMove,
  knightMove,
  rookMove,
  pawnMove,
} from './Movements';

const BoardWrapper = styled.div`
  margin: 0 auto;
  width: 700px;
  height: 700px;
  border: 1px solid black;
  transform: rotateY(-10deg) rotateX(20deg);
  -webkit-transform: rotateY(-10deg) rotateX(25deg);
  box-shadow: 50px 50px 205px #1a202c, 0 1px 40px teal;
  // background: #1a202c;
`;

// console.log(kingMove([0,3]))
// console.log(pawnMove([1,3], false, true))
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


  useEffect(() => {
    setOccupied(position.map((p) => JSON.stringify(p.value)))
    // position.forEach(p => {
    //   occupied.push(JSON.stringify(p.value))
    // })
    console.log(blackKilled, whiteKilled)

  }, [position, blackKilled, whiteKilled, reset]);

  const onDragStart = (e) => {
    e.dataTransfer.setData('text', e.target.id);
    playPiece(e.target);
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
    ).forEach(color => {
      setMoveColor([...moveColor, { id: id, color: "green" }])
    })
  }

  const playPiece = (liftedPiece) => {

    let canPlay = []
    let piecePosition = []
    let piece = liftedPiece.getAttribute("name")
    let pieceColor = liftedPiece.getAttribute("id").charAt(0);
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
        canPlay = (pieceColor === "b") ? pawnMove(piecePosition, moved, true, occupied) : pawnMove(piecePosition, moved, false, occupied)
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
            if(liftedPiece.getAttribute("id").charAt(0) !== square.children[0].getAttribute("id").charAt(0)){
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
  }



  return (
    <BoardWrapper
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
  )
}

export default Board

