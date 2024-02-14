import moves, { pawnMove } from "./Movements";


const pawnMoved = (piece) => {
  return (piece.id.charAt(0) === "b" && (piece.value[0] > 1)) ||
    ((piece.id.charAt(0) === "w" && (piece.value[0] < 6)))
}

const getCurrentPieceColor = (whiteMoved) => {
  return whiteMoved ? 'w' : 'b'
}

const getOpponentKingPosition = (position, whiteMoved) => {
  const color = getCurrentPieceColor(!whiteMoved)
  return position.find((piece) => piece.title === 'king' && piece.id.charAt(0) === color)?.value
}

const simulate = ({ position, whiteMoved, occupied }) => {
  const allMoves = [];
  const validPositions = position.filter((pos) =>
    pos.title !== 'king' 
    && pos.id.charAt(0) === getCurrentPieceColor(whiteMoved)
  )
  validPositions
    .forEach((piece) => {
      if (piece.title === 'pawn') {
        const isBlack = piece.id.charAt(0) === "b"
        allMoves.push(...pawnMove(piece.value, pawnMoved(piece), isBlack, occupied))
      }
      else {
        allMoves.push(...moves[`${piece.title}Move`]((piece.value), occupied))
      }
    }
  )
  // console.log(allMoves)
  const opponentKing = [...getOpponentKingPosition(position, whiteMoved)]
  const threatened = !!allMoves.find((move) => JSON.stringify(move) === JSON.stringify(opponentKing))
  // console.log({ opponentKing })
  // console.log(allMoves)
  if (threatened) {
    // console.log("FOUND")
    document.getElementById(`${getCurrentPieceColor(whiteMoved)}k1`).setAttribute("class", "threatened")
    // console.log(whiteMoved ? document.getElementById("wk1").style : document.getElementById("bk1").style)
  }
}
  
export { simulate }