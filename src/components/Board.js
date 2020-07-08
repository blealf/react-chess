import React, { useState } from 'react';
import styled from 'styled-components';
import Square from './Square';
import chessPieces from '../data';

import ChessPiece from './ChessPiece';


const BoardWrapper = styled.div`
  margin: 0 auto;
  width: 700px;
  height: 700px;
  border: 1px solid black;
  transform: rotateY(0deg) rotateX(20deg);
  -webkit-transform: rotateY(0deg) rotateX(25deg);
  box-shadow: 50px 50px 205px #1a202c, 0 1px 40px teal;
  // background: #1a202c;
`;

const Board = () => {

  const initialPosition = chessPieces;
  const [position, setPosition] = useState(initialPosition);

  const onDragStart = (e) => {
    e.dataTransfer.setData('text', e.target.id);
    e.currentTarget.style.backgroundColor = "red";
    // console.log(e.target.id)
  }

  var checkedPattern = [];
  var swap = false;

  const createPattern = (color, currentPos) => {
    checkedPattern.push(<Square 
      tileColor={color} 
      key={JSON.stringify(currentPos)} 
      position={currentPos}
      allPositions={position}
      piece={
        position.filter(pos => (JSON.stringify(currentPos) === JSON.stringify(pos.value)))
        .map(p => {
            return(<ChessPiece
              onDragStart={onDragStart}
              color={(p.id.includes("w")) ? "white" : "black"} 
              ID={p.id} 
              name={p.title} 
              key={p.id}
              position={p.value}/>)
              
        })
      }
      changePosition={setPosition}
      />)
  }

  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      (swap) ? createPattern("white", [i,j]) : createPattern("non-white", [i,j]);
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