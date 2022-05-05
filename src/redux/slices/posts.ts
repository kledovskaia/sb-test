import { createSlice } from '@reduxjs/toolkit'
import * as thunks from '../thunks/posts'

const initialState = {
  value: [] as Post[],
}

const posts = createSlice({
  initialState,
  name: 'posts',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(thunks.fetchPosts.fulfilled, (state, action) => {
      state.value = action.payload
    })
  },
})

export const {} = posts.actions
export default posts.reducer
