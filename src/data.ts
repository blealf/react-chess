import { ChessPieceType } from './types/types'

const chessPieces: ChessPieceType[] = [
  { id: "bk1", title: "king", value: [0,4], moved: false},
  { id: "bq1", title: "queen", value: [0,3], moved: false},
  { id: "bb1", title: "bishop", value: [0,2], moved: false},
  { id: "bb2", title: "bishop", value: [0,5], moved: false},
  { id: "bkn1", title: "knight", value: [0,1], moved: false},
  { id: "bkn2", title: "knight", value: [0,6], moved: false},
  { id: "br1", title: "rook", value: [0,0], moved: false},
  { id: "br2", title: "rook", value: [0,7], moved: false},
  { id: "bp1", title: "pawn", value: [1,0], moved: false},
  { id: "bp2", title: "pawn", value: [1,1], moved: false},
  { id: "bp3", title: "pawn", value: [1,2], moved: false},
  { id: "bp4", title: "pawn", value: [1,3], moved: false},
  { id: "bp5", title: "pawn", value: [1,4], moved: false},
  { id: "bp6", title: "pawn", value: [1,5], moved: false},
  { id: "bp7", title: "pawn", value: [1,6], moved: false},
  { id: "bp8", title: "pawn", value: [1,7], moved: false},

  { id: "wk1", title: "king", value: [7,3], moved: false},
  { id: "wq1", title: "queen", value: [7,4], moved: false},
  { id: "wb1", title: "bishop", value: [7,2], moved: false},
  { id: "wb2", title: "bishop", value: [7,5], moved: false},
  { id: "wkn1", title: "knight", value: [7,1], moved: false},
  { id: "wkn2", title: "knight", value: [7,6], moved: false},
  { id: "wr1", title: "rook", value: [7,0], moved: false},
  { id: "wr2", title: "rook", value: [7,7], moved: false},
  { id: "wp1", title: "pawn", value: [6,0], moved: false},
  { id: "wp2", title: "pawn", value: [6,1], moved: false},
  { id: "wp3", title: "pawn", value: [6,2], moved: false},
  { id: "wp4", title: "pawn", value: [6,3], moved: false},
  { id: "wp5", title: "pawn", value: [6,4], moved: false},
  { id: "wp6", title: "pawn", value: [6,5], moved: false},
  { id: "wp7", title: "pawn", value: [6,6], moved: false},
  { id: "wp8", title: "pawn", value: [6,7], moved: false},
]

export { chessPieces }