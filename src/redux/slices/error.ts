import { createSlice } from '@reduxjs/toolkit'
import * as thunks from '../thunks/posts'

const initialState = {
  value: null as string | null,
}

const error = createSlice({
  name: 'error',
  initialState,
  reducers: {},
  extraReducers: builder => {
    Object.values(thunks).forEach(thunk => {
      builder.addCase(thunk.fulfilled, (state, action) => {
        state.value = null
      })
      builder.addCase(thunk.pending, (state, action) => {
        state.value = null
      })
      builder.addCase(thunk.rejected, (state, action) => {
        state.value = action.error.message?.toString() || null
      })
    })
  },
})

export default error.reducer
