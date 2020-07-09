import React, { useState } from 'react';
import styled from 'styled-components';
import Square from './Square';
import chessPieces from '../data';
import {
  kingMove, 
  // queenMove, 
  // bishopMove, 
  knightMove, 
  rookMove, 
  pawnMove, 
  pawnKill
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

const highlightMove = styled.div`
  margin: 0 auto;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: "green";
`;

// console.log(kingMove([0,3]))
// console.log(pawnMove([1,3], false, true))
// console.log(pawnKill([1,3], true))
// console.log(knightMove([2,3]))
console.log(rookMove([3,3]));


const Board = () => {

  const initialPosition = chessPieces;
  const [ position, setPosition ] = useState(initialPosition);
  const [ moveColor, setMoveColor ] = useState([
    { id: "",
      color: ""
    }
  ]);

  const diagonal = (position) => {
    let x = position[0]
    let y = position[1]
    let canMove = []
    if (JSON.stringify(position) !== [0,0]||[0,7]||[7,0]||[7,7]){
      
      canMove = [[x+1, y+1],[x+1, y-1],[x-1, y+1],[x-1,y-1]]
      // console.log(canMove)
    }
    // if (x === 0){

    // }
    return canMove;
  }
  
  // const vertical = (position) => {
  //   let x = position[0]
  //   let y = position[1]
  //   let canMove = []
  //   if (JSON.stringify(position) !== [0,0]||[0,7]||[7,0]||[7,7]){
  //     canMove = [[x++, y],[x, y++],[x--, y],[x, y--]]
  //   }
  //   return canMove;
  // }
  
  // const horizontal = (position) => {
  //   let x = position[0]
  //   let y = position[1]
  //   let canMove = []
  //   if (JSON.stringify(position) !== [0,0]||[0,7]||[7,0]||[7,7]){
  //     canMove = [[x++, y],[x, y++],[x--, y],[x, y--]]
  //   }
  //   return canMove;
  // }

  const onDragStart = (e) => {
    e.dataTransfer.setData('text', e.target.id);
    var piecePosition = []
    e.target.getAttribute("position").split(",").forEach(num => {
      piecePosition.push(parseInt(num))
    })

    // console.log(piecePosition)

    determineDropLocation(piecePosition, e.currentTarget);
    // console.log(piecePosition);

  }

  const setColor = (id, color) => {
    let selectedColor = ""
    moveColor.forEach(c => {
      if(c.id === id){
        selectedColor = c.color
      } else { selectedColor =  color }
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
      changePosition={setPosition}
      onChangeColor={(e) => changeColor(JSON.stringify(currentPos))}
      />)
  }

  const changeColor = (id) => {
    checkedPattern.filter(square => 
      id === square.props.position
    ).forEach(color => {
      setMoveColor([...moveColor, {id: id, color: "green"}])
      // console.log(color);
    })
  }

  const determineDropLocation = (getPos, square) => {
   knightMove(getPos).forEach(move => {
        let square = document.getElementById(JSON.stringify(move))
        if(square && square.children.length < 1) {
            // square.style.backgroundColor = "blue";
            let element = document.createElement("div")
            element.setAttribute("class", "highlightedMove")
            // element.style.cssText = "margin: 0 auto; height: 10px; width: 10px; border-radius: 5px background-color: green;"
            Object.assign(element.style, {
              margin: "0 auto",
              marginTop: "30px",
              height: "20px",
              width: "20px",
              borderRadius: "5px",
              backgroundColor: "green",
            })

            square.appendChild(element);



            // console.log(highlightMove);
            // console.log(element)
          }
      })
      // square.style.backgroundColor = "green";
  }

  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      (swap) ? createPattern("white", [i,j]) : createPattern("brown", [i,j]);
      swap = (j<7) ? !swap : swap;
    }
  }
  
  return (
    <BoardWrapper>
    {checkedPattern}
    </BoardWrapper>
  )
}

export default Board









// const [position, setPosition] = useState([
//   {piece: (<King onDragStart={onDragStart} keyId={"blackKing"} />),
//     value: [0,4]},
//   {piece: (<Queen onDragStart={onDragStart} keyId={"blackQueen"} />),
//     value: [0,3]},
//   {piece: (<Knight onDragStart={onDragStart} keyId={"blackKnight1"} />),
//     value: [0,1]},
//   {piece: (<Knight onDragStart={onDragStart} keyId={"blackKnight2"} />),
//     value: [0,6]},
//   {piece: (<Bishop onDragStart={onDragStart} keyId={"blackBishop1"} />),
//     value: [0,2]},
//   {piece: (<Bishop onDragStart={onDragStart} keyId={"blackKBishop2"} />),
//     value: [0,5]},
//   {piece: (<Rook onDragStart={onDragStart} keyId={"blackRook1"} />),
//     value: [0,0]},
//   {piece: (<Rook onDragStart={onDragStart} keyId={"blackRook2"} />),
//     value: [0,7]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"blackPawn1"} />),
//     value: [1,0]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"blackPawn2"} />),
//     value: [1,1]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"blackPawn3"} />),
//     value: [1,2]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"blackPawn4"} />),
//     value: [1,3]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"blackPawn5"} />),
//     value: [1,4]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"blackPawn6"} />),
//     value: [1,5]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"blackPawn7"} />),
//     value: [1,6]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"blackPawn8"} />),
//     value: [1,7]},
// ])

// const [whitePosition, setWhitePosition] = useState([
//   {piece: (<King onDragStart={onDragStart} keyId={"whiteKing"} />),
//     value: [7,3]},
//   {piece: (<Queen onDragStart={onDragStart} keyId={"whiteQueen"} />),
//     value: [7,4]},
//   {piece: (<Knight onDragStart={onDragStart} keyId={"whiteKnight1"} />),
//     value: [7,1]},
//   {piece: (<Knight onDragStart={onDragStart} keyId={"whiteKnight2"} />),
//     value: [7,6]},
//   {piece: (<Bishop onDragStart={onDragStart} keyId={"whiteBishop1"} />),
//     value: [7,2]},
//   {piece: (<Bishop onDragStart={onDragStart} keyId={"whiteKBishop2"} />),
//     value: [7,5]},
//   {piece: (<Rook onDragStart={onDragStart} keyId={"whiteRook1"} />),
//     value: [7,0]},
//   {piece: (<Rook onDragStart={onDragStart} keyId={"whiteRook2"} />),
//     value: [7,7]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"whitePawn1"} />),
//     value: [6,0]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"whitePawn2"} />),
//     value: [6,1]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"whitePawn3"} />),
//     value: [6,2]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"whitePawn4"} />),
//     value: [6,3]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"whitePawn5"} />),
//     value: [6,4]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"whitePawn6"} />),
//     value: [6,5]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"whitePawn7"} />),
//     value: [6,6]},
//   {piece: (<Pawn onDragStart={onDragStart} keyId={"whitePawn8"} />),
//     value: [6,7]},
// ])


  // for(let i = 0; i < 64; i++){
  //   if(Math.floor((i/8)%2) === 0){
  //     if(Math.floor(i%2) === 0){
  //       checkedPattern.push(<Square tileColor={"white"} key={i} piece={<Knight dragStart={onDragStart} />}/>)
  //     } else {
  //       checkedPattern.push(<Square tileColor={"brown"} key={i} />)
  //     }
  //   }else{
  //       if(Math.floor(i%2) === 0){
  //         checkedPattern.push(<Square tileColor={"brown"} key={i}/>)
  //       } else {
  //         checkedPattern.push(<Square tileColor={"white"} key={i} />)
  //       }
  //     }
  // }
  
  // for(let i = 0; i < 8; i++){
  //   for(let j = 0; j < 8; j++){
  //     if(Math.floor(i%2) === 0){
  //       if(Math.floor(j%2) === 0){
  //         checkedPattern.push(<Square tileColor={"white"} key={[i][j]} piece={<Knight dragStart={onDragStart} />}/>)
  //       } else {
  //         checkedPattern.push(<Square tileColor={"brown"} key={[i][j]} />)
  //       }
  //     }else{
  //       if(Math.floor(j%2) === 0){
  //         checkedPattern.push(<Square tileColor={"brown"} key={[i][j]}/>)
  //       } else {
  //         checkedPattern.push(<Square tileColor={"white"} key={[i][j]} />)
  //       }
  //     }
  //   }
  // }