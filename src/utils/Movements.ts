import { ChessPieceType, MovesType } from '../types/types';

const moveUp = (value: number[], occupied: ChessPieceType[]) => {
  let y = value[0]
  const x = value[1], newPoints = []
  const occupiedString = JSON.stringify(occupied)
  while(y < 7) {
    if(occupiedString?.includes(JSON.stringify([y+1,x]))) { 
      newPoints.push([ x, y+1]);
      break;
    }
    newPoints.push([ x, y+1]);
    y++;
  }
  return newPoints;
}

const moveDown = (value: number[], occupied: ChessPieceType[]) => {
  let y = value[0]
  const x = value[1], newPoints = []
  const occupiedString = JSON.stringify(occupied)
  while(y > 0) {
    if(occupiedString?.indexOf(JSON.stringify([y-1,x])) >= 0) { 
      newPoints.push([ x, y-1])
      break;
    }
    newPoints.push([ x, y-1])
    y--;
  }
  return newPoints;
}

const moveRight = (value: number[], occupied: ChessPieceType[]) => {
  let x = value[1]
  const y = value[0], newPoints = []
  const occupiedString = JSON.stringify(occupied)
  while(x < 7) {
    if(occupiedString?.indexOf(JSON.stringify([y,x+1])) >= 0) { 
      newPoints.push([ x+1, y])
      break;
    }
    newPoints.push([ x+1, y])
    x++;
  }
  return newPoints;
}

const moveLeft = (value: number[], occupied: ChessPieceType[]) => {
  let x = value[1]
  const y = value[0], newPoints = []
  const occupiedString = JSON.stringify(occupied)
  while(x > 0) {
    if(occupiedString?.indexOf(JSON.stringify([y,x-1])) >= 0) { 
      newPoints.push([ x-1, y])
      break;
    }
    newPoints.push([ x-1, y])
    x--;
  }
  return newPoints;
}

const moveLeftUp = (value: number[], occupied: ChessPieceType[]) => {
  let x = value[1], y = value[0]
  const newPoints = []
  const occupiedString = JSON.stringify(occupied)
  while((x > 0) && (y > 0)) {
    if (occupiedString?.indexOf(JSON.stringify([y - 1, x - 1])) >= 0) {
      newPoints.push([ x-1, y-1]);
      break;
    }
    newPoints.push([ x-1, y-1]);
    x--; y--;
  }
  return newPoints;
}

const moveRightUp = (value: number[], occupied: ChessPieceType[]) => {
  let x = value[1], y = value[0]
  const newPoints = []
  const occupiedString = JSON.stringify(occupied)
  while((x < 7) && (y > 0)) {
    if (occupiedString?.indexOf(JSON.stringify([y - 1, x + 1])) >= 0) {
      newPoints.push([ x+1, y-1]);
      break;
    }
    newPoints.push([ x+1, y-1]);
    x++; y--;
  }
  return newPoints;
}

const moveRightDown = (value: number[], occupied: ChessPieceType[]) => {
  let  x = value[1], y = value[0]
  const newPoints = []
  const occupiedString = JSON.stringify(occupied)
  while((x < 7) && (y < 7)) {
    if (occupiedString?.indexOf(JSON.stringify([y + 1, x + 1])) >= 0) {
      newPoints.push([ x+1, y+1]);
      break;
    }
    newPoints.push([ x+1, y+1]);
    x++; y++;
  }
  return newPoints;
}

const moveLeftDown = (value: number[], occupied: ChessPieceType[]) => {
  let x = value[1], y = value[0]
  const newPoints = []
  const occupiedString = JSON.stringify(occupied)
  while((x > 0) && (y < 7)) {
    if (occupiedString?.indexOf(JSON.stringify([y + 1, x - 1])) >= 0) {
      newPoints.push([ x-1, y+1]);
      break;
    }
    newPoints.push([ x-1, y+1]);
    x--; y++;
  }
  return newPoints;
}

const reversePositions = (positionsArray: (number | null)[][]): (number | null)[][] => {
  return positionsArray.map(pos => pos.reverse())
}

const kingMove = (currentPosition: number[]) => {
  const x = currentPosition[1], y = currentPosition[0]

  const newPositions = [
    [x, ((y+1 <= 7) ? y+1 : null)],
    [x, ((y-1 >= 0) ? y-1 : null)],
    [((x+1 <= 7) ? x+1 : null), y],
    [((x-1 >= 0) ? x-1 : null), y],
    [((x+1 <= 7) ? x+1 : null), ((y-1 >= 0) ? y-1 : null)],
    [((x+1 <= 7) ? x+1 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y-1 >= 0) ? y-1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y+1 <= 7) ? y+1 : null)],
  ];
  
  return reversePositions(newPositions);
}

const queenMove = (currentPosition: number[], occupied: ChessPieceType[]) => {
  return [
    ...bishopMove(currentPosition, occupied),
    ...rookMove(currentPosition, occupied)
  ]
}

const bishopMove = (currentPosition: number[], occupied: ChessPieceType[]) => {
  return reversePositions([
    ...moveLeftUp(currentPosition, occupied),
    ...moveRightUp(currentPosition, occupied),
    ...moveLeftDown(currentPosition, occupied),
    ...moveRightDown(currentPosition, occupied)
  ])
}

const knightMove = (currentPosition: number[]) => {
  const x = currentPosition[1], y = currentPosition[0]
  const newPositions = [
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

const rookMove = (currentPosition: number[], occupied: ChessPieceType[]) => {
  return reversePositions([
    ...moveUp(currentPosition, occupied),
    ...moveDown(currentPosition, occupied),
    ...moveRight(currentPosition, occupied),
    ...moveLeft(currentPosition, occupied)
  ]);
}

const pawnMove = (currentPosition: number[], moved: boolean, fromTop: boolean, occupied: ChessPieceType[]) => {
  const x = currentPosition[1], y = currentPosition[0]
  const occupiedString = JSON.stringify(occupied)

  let newPositions = (moved) ? 
    ((fromTop) ? 
      [[x, ((y+1 <= 7) ? y+1 : null)]] : 
      [[x, ((y-1 >= 0) ? y-1 : null)]]) : 
    ((fromTop) ? 
      [[x, ((y+1 <= 7) ? y+1 : null)], [x, ((y+2 <= 7) ? y+2 : null)]] : 
      [[x, ((y-1 >= 0) ? y-1 : null)], [x, ((y-2 >= 0) ? y-2 : null)]]);
  newPositions = newPositions.filter(position => {
    return !occupiedString.includes(JSON.stringify([position[1], position[0]]))
  })
  pawnKill([x, y], fromTop).forEach((point) => {
    if (occupiedString.includes(JSON.stringify([point[1], point[0]]))) {
      newPositions.push(point);
    }
  })
  return reversePositions(newPositions);
}

const pawnKill = (currentPosition: number[], fromTop: boolean) => {
  const x = currentPosition[1], y = currentPosition[0]
  
  const newPositions = (fromTop) ? 
    [[((x+1 <= 7) ? x+1 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x+1 <= 7) ? x+1 : null), ((y-1 >= 0) ? y-1 : null)]]
    :
    [[((x-1 >= 0) ? x-1 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y-1 >= 0) ? y - 1 : null)]]
      
  // console.log(newPositions.filter((pos) => pos.includes(null)))
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

const moves: MovesType = {
  kingMove, 
  queenMove, 
  bishopMove, 
  knightMove, 
  rookMove, 
  pawnMove,
  pawnKill,
}

export default moves