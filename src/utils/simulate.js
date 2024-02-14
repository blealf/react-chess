import moves, { pawnMove } from "./Movements";


const simulate = ({ position, whiteMoved, occupied }) => {
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
    threatened = whiteMoved ? threatened : threatened.reverse()
    console.log('threatened',threatened)
    if (allMoves.find((move) => JSON.stringify(move) === JSON.stringify(threatened))) {
      console.log("FOUND")
      document.getElementById(`${whiteMoved ? 'w' : 'b'}k1`).setAttribute("class", "threatened")
      console.log(whiteMoved ? document.getElementById("wk1").style : document.getElementById("bk1").style)
    }
}
  
export { simulate }