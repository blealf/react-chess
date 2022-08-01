import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  positions: [],
  savedPositions: {},
  occupied: [],
  killed: {
    blackKilled: [],
    whiteKilled: [],
  }
}
const GameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateKilled(state, action) {
      const { blackKilled, whiteKilled } = action.payload
      console.log(blackKilled, whiteKilled)
      state.killed['blackKilled'] = blackKilled
      state.killed['whiteKilled'] = whiteKilled
    }
  }
})

export const { updateKilled } = GameSlice.actions

export default GameSlice.reducer