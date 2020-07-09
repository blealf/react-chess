
const moveUp = (value) => {
  let x = value[1]
  let y = value[0]
  // let newPoints = []
  // while(y >= 0) {
  //   newPoints.push([ x, y+1]);
  //   y = y+1;
  // }
  return [x,y]
}

const moveDown = (value) => {
  let x = value[1]
  let y = value[0]
  let newPoints = []
  while(y <= 7) {
    newPoints.push([ x, y-1])
    y--
  }
  return newPoints;
}

const moveRight = (value) => {
  let x = value[1]
  let y = value[0]
  let newPoints = []
  while(x <= 7) {
    newPoints.push([ x+1, y])
    x++
  }
  return newPoints;
}

const moveLeft = (value) => {
  let x = value[1]
  let y = value[0]
  let newPoints = []
  while(x >= 0) {
    newPoints.push([ x-1, ])
    x--
  }
  return newPoints;
}




const reversePositions = (positionsArray) => {
  positionsArray.forEach(position => {
    position.reverse();
  })
  return positionsArray;
}

const kingMove = (currentPosition) => {
  let x = currentPosition[1]
  let y = currentPosition[0]
  // console.log("x = " + x);
  // console.log("y = " + y);

  let newPositions = [
    [x, ((y+1 < 8) ? y+1 : null)],
    [x, ((y-1 > 0) ? y-1 : null)],
    [((x+1 <= 7) ? x+1 : null), y],
    [((x-1 > 0) ? x-1 : null), y],
    [((x+1 <= 7) ? x+1 : null), ((y-1 > 0) ? y-1 : null)],
    [((x+1 <= 7) ? x+1 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x-1 > 0) ? x-1 : null), ((y-1 > 0) ? y-1 : null)],
    [((x-1 > 0) ? x-1 : null), ((y+1 <= 7) ? y+1 : null)],
  ];
  
  return reversePositions(newPositions);
}

const queenMove = (currentPosition) => {
  let x = currentPosition[1]
  let y = currentPosition[0]
  let newPositions = [];
  if(JSON.stringify(currentPosition) !== []){

  }
}

const bishopMove = (currentPosition) => {
  let x = currentPosition[1]
  let y = currentPosition[0]
  let newPositions = [];
  if(JSON.stringify(currentPosition) !== []){

  }
}

const knightMove = (currentPosition) => {
  let x = currentPosition[1]
  let y = currentPosition[0]
  let newPositions = [
    [((x-2 >= 0) ? x-2 : null), ((y-1 >= 0) ? y-1 : null)],
    [((x-2 >= 0) ? x-2 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y-2 >= 0) ? y-2 : null)],
    [((x+1 <= 7) ? x+1 : null), ((y-2 >= 0) ? y-2 : null)],
    [((x+2 <= 7) ? x+2 : null), ((y-1 >= 0) ? y-1 : null)],
    [((x+2 <= 7) ? x+2 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y+2 <= 7) ? y+2 : null)],
    [((x+1 <= 7) ? x+1 : null), ((y+2 <= 7) ? y+2 : null)],
  ];
  console.log("here ----- " + (y+2 <= 7));
  return reversePositions(newPositions);  
}

const rookMove = (currentPosition) => {
  let x = currentPosition[1]
  let y = currentPosition[0]
  let newPositions = [];
  console.log(moveUp([3,3]))
  // return reversePositions(currentPosition);
  return currentPosition;
}

const pawnMove = (currentPosition, moved, fromTop) => {
  let x = currentPosition[1]
  let y = currentPosition[0]
  let newPositions = (moved) ? 
    ((fromTop) ? 
      [[x, ((y+1 <= 7) ? y+1 : null)]] : 
      [[x, ((y-1 >= 0) ? y-1 : null)]]): 
    ((fromTop) ? 
      [[x, ((y+1 <= 7) ? y+1 : null)], [x, ((y+2 <= 7) ? y+2 : null)]] : 
      [[x, ((y-1 >= 0) ? y-1 : null)], [x, ((y-2 >= 0) ? y-2 : null)]]);

  return reversePositions(newPositions);
}

const pawnKill = (currentPosition, fromTop) => {
  let x = currentPosition[1]
  let y = currentPosition[0]
  
  let newPositions = (fromTop) ? 
    [[((x+1 <= 7) ? x+1 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y+1 <= 7) ? y+1 : null)]] 
    :
    [[((x+1 <= 7) ? x+1 : null), ((y-1 >= 0) ? y-1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y-1 >= 0) ? y-1 : null)]]
    
  return reversePositions(newPositions);
}



export {
  kingMove, 
  queenMove, 
  bishopMove, 
  knightMove, 
  rookMove, 
  pawnMove, 
  pawnKill
}