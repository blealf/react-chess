import { DragEvent } from 'react';
import { ChessPieceType } from './types.d';
export interface ChessPieceType {
  id: string
  title: string
  value: NumberArray
  moved?: boolean
}

export type ChessPieceArray = Array<ChessPieceType>
export type NumberArray = Array<number>
export type Nullable = (T | null)
export type MovesReturnType = Array<Nullable<number>>[]

export interface PieceProps {
  uniqueId: string
  name: string
  color: string
  onDragStart: (e: DragEvent) => void
  position: NumberArray
  info: string
}

export interface MovesType {
  kingMove: (currentPosition: NumberArray) => MovesReturnType
  queenMove: (currentPosition: NumberArray, occupied: ChessPieceArray) => MovesReturnType
  bishopMove: (currentPosition: NumberArray, occupied: ChessPieceArray) => MovesReturnType
  knightMove: (currentPosition: NumberArray) => MovesReturnType
  rookMove: (currentPosition: NumberArray, occupied: ChessPieceArray) => MovesReturnType
  pawnMove: (currentPosition: NumberArray, moved: boolean, fromTop: boolean, occupied: ChessPieceArray) => MovesReturnType
  pawnKill: (currentPosition: NumberArray, fromTop: boolean) => MovesReturnType
}

export interface SimulateArgsType {
  position: ChessPieceArray,
  whiteMoved: boolean,
  occupied: ChessPieceArray
}

export type SimulateFunction = ({ position, whiteMoved, occupied }: SimulateArgsType) => void
export interface SquarePropsType {
  boardMatrix: ChessPieceArray
  changePosition: (arg: ChessPieceArray) => void
  uniqueId: string
  onDragStart: (e: DragEvent) => void
  squarePosition: NumberArray
  tileColor: string
  updateBlackKill: (arg: string | null) => void
  updateWhiteKill: (arg: string | null) => void
  setWhiteMoved: () => void
  simulate: () => void
  onChangeColor?: () => void
}


export interface BoardStateType {
  occupied: ChessPieceArray
  position: ChessPieceArray
  moveColor: Array<{
    id: string
    color: string
  }>
  whiteKilled: ChessPieceArray
  blackKilled: ChessPieceArray
  whiteMoved: boolean
  kingPosition: {
    white: NumberArray | undefined
    black: NumberArray | undefined
  }
  firstUpdate?: boolean
}
export interface BoardStatePayload {
  occupied?: ChessPieceArray
  position?: ChessPieceArray
  moveColor?: Array<{
    id: string
    color: string
  }>
  whiteKilled?: ChessPieceArray
  blackKilled?: ChessPieceArray
  whiteMoved?: boolean
  kingPosition?: {
    white: NumberArray | undefined
    black: NumberArray | undefined
  }
  firstUpdate?: boolean
}