import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  positions: [],
  savedPositions: [],
  occupied: [],
  killed: {
    blackKilled: [],
    whiteKilled: [],
  },
  // allMoves: [],
}
const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateKilled(state, action) {
      const { blackKilled, whiteKilled } = action.payload
      // console.log(blackKilled, whiteKilled)
      state.killed['blackKilled'] = blackKilled
      state.killed['whiteKilled'] = whiteKilled
    },
    undo(state, action) {
      const { index } = action.payload
      state.positions = state.savedPositions[index]
    },
    redo(state, action) {
      const { index } = action.payload
      state.positions = state.savedPositions[index]
    }
  }
})

export const { updateKilled } = GameSlice.actions

export default GameSlice.reducer