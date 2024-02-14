interface ChessPieceType {
  id: string
  title: string
  value: number[]
  moved: boolean
}

interface PieceProps {
  ID: string
  name: string
  color: string
  onDragStart: any
  position: ChessPieceType
}

export {
  ChessPieceType,
  PieceProps
}