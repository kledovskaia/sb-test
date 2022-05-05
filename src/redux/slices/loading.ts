import { createSlice } from '@reduxjs/toolkit'
import * as thunks from '../thunks/posts'

const initialState = {
  value: false,
}

const loading = createSlice({
  name: 'loading',
  initialState,
  reducers: {},
  extraReducers: builder => {
    Object.values(thunks).forEach(thunk => {
      builder.addCase(thunk.fulfilled, (state, action) => {
        state.value = false
      })
      builder.addCase(thunk.rejected, (state, action) => {
        state.value = false
      })
      builder.addCase(thunk.pending, (state, action) => {
        state.value = true
      })
    })
  },
})

export default loading.reducer
