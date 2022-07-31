// import React from 'react';


const moveUp = (value, occupied) => {
  let x = value[1], y = value[0], newPoints = []
  while(y < 7) {
    if(occupied.indexOf(JSON.stringify([y+1,x])) >= 0) { 
      newPoints.push([ x, y+1]);
      break;
    }
    newPoints.push([ x, y+1]);
    y++;
  }
  // console.log(newPoints);
  return newPoints;
}

const moveDown = (value, occupied) => {
  let x = value[1], y = value[0], newPoints = []
  while(y > 0) {
    if(occupied.indexOf(JSON.stringify([y-1,x])) >= 0) { 
      // newPoints.push([ x, y-1])
      break;
    }
    newPoints.push([ x, y-1])
    y--;
  }
  return newPoints;
}

const moveRight = (value, occupied) => {
  let x = value[1], y = value[0], newPoints = []
  while(x < 7) {
    if(occupied.indexOf(JSON.stringify([y,x+1])) >= 0) { 
      // newPoints.push([ x+1, y])
      break;
    }
    newPoints.push([ x+1, y])
    x++;
  }
  return newPoints;
}

const moveLeft = (value, occupied) => {
  let x = value[1], y = value[0], newPoints = []
  while(x > 0) {
    if(occupied.indexOf(JSON.stringify([y,x-1])) >= 0) { 
      // newPoints.push([ x-1, y])
      break;
    }
    newPoints.push([ x-1, y])
    x--;
  }
  return newPoints;
}

const moveLeftUp = (value, occupied) => {
  var x = value[1]
  var y = value[0]
  let newPoints = []
  while((x > 0) & (y > 0)) {
    if(occupied.indexOf(JSON.stringify([y-1,x-1])) >= 0) { break;}
    newPoints.push([ x-1, y-1]);
    x--; y--;
  }
  return newPoints;
}

const moveRightUp = (value, occupied) => {
  var x = value[1]
  var y = value[0]
  let newPoints = []
  while((x < 7) & (y > 0)) {
    if(occupied.indexOf(JSON.stringify([y-1,x+1])) >= 0) { break;}
    newPoints.push([ x+1, y-1]);
    x++; y--;
  }
  return newPoints;
}

const moveRightDown = (value, occupied) => {
  var x = value[1]
  var y = value[0]
  let newPoints = []
  while((x < 7) & (y < 7)) {
    if(occupied.indexOf(JSON.stringify([y+1,x+1])) >= 0) { break;}
    newPoints.push([ x+1, y+1]);
    x++; y++;
  }
  return newPoints;
}

const moveLeftDown = (value, occupied) => {
  var x = value[1]
  var y = value[0]
  let newPoints = []
  while((x > 0) & (y < 7)) {
    if(occupied.indexOf(JSON.stringify([y+1,x-1])) >= 0) { break;}
    newPoints.push([ x-1, y+1]);
    x--; y++;
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

const queenMove = (currentPosition, occupied) => {
  let newPositions = [];
  bishopMove(currentPosition, occupied).forEach(position => {
    newPositions.push(position)})
  rookMove(currentPosition, occupied).forEach(position => {
    newPositions.push(position)})

  return newPositions
}

const bishopMove = (currentPosition, occupied) => {
  let newPositions = [];
  moveLeftUp(currentPosition, occupied).forEach(position => {
    newPositions.push(position)})
  moveRightUp(currentPosition, occupied).forEach(position => {
    newPositions.push(position)})
  moveRightDown(currentPosition, occupied).forEach(position => {
    newPositions.push(position)})
  moveLeftDown(currentPosition, occupied).forEach(position => {
    newPositions.push(position)})

  return reversePositions(newPositions);
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
  
  return reversePositions(newPositions);  
}

const rookMove = (currentPosition, occupied) => {
  let newPositions = [];
  moveUp(currentPosition, occupied).forEach(position => {
      newPositions.push(position);})
  moveDown(currentPosition, occupied).forEach(position => {
    newPositions.push(position);})
  moveRight(currentPosition, occupied).forEach(position => {
    newPositions.push(position);})
  moveLeft(currentPosition, occupied).forEach(position => {
    newPositions.push(position);})

  return reversePositions(newPositions);
}

const pawnMove = (currentPosition, moved, fromTop, occupied) => {
  let x = currentPosition[1]
  let y = currentPosition[0]
  let newPositions = (moved) ? 
    ((fromTop) ? 
      [[x, ((y+1 <= 7) ? y+1 : null)]] : 
      [[x, ((y-1 >= 0) ? y-1 : null)]]) : 
    ((fromTop) ? 
      [[x, ((y+1 <= 7) ? y+1 : null)], [x, ((y+2 <= 7) ? y+2 : null)]] : 
      [[x, ((y-1 >= 0) ? y-1 : null)], [x, ((y-2 >= 0) ? y-2 : null)]]);
      // console.log("before : " + newPositions)
  newPositions = newPositions.filter(position => {
    // console.log(position)
    return !occupied.includes(JSON.stringify([position[1], position[0]]))
  })
  pawnKill([x, y], fromTop).forEach((point) => {
    if (occupied.includes(JSON.stringify([point[1], point[0]]))) {
      // console.log(point)
      newPositions.push(point);
    }
  })
  // console.log(JSON.stringify(newPositions))
  // console.log("after : " + newPositions)
  return reversePositions(newPositions);
}

const pawnKill = (currentPosition, fromTop) => {
  // console.log('currentPosition', currentPosition)
  let x = currentPosition[1]
  let y = currentPosition[0]
  // console.log('x, y', x, y)
  
  let newPositions = (fromTop) ? 
    [[((x+1 <= 7) ? x+1 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x+1 <= 7) ? x+1 : null), ((y-1 >= 0) ? y-1 : null)]]
    :
    [[((x-1 >= 0) ? x-1 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y-1 >= 0) ? y - 1 : null)]]
      
  return reversePositions(newPositions);
}



export {
  kingMove, 
  queenMove, 
  bishopMove, 
  knightMove, 
  rookMove, 
  pawnMove, 
  pawnKill,
}