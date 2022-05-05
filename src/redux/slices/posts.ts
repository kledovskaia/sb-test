import { createSlice } from '@reduxjs/toolkit'
import * as thunks from '../thunks/posts'
import * as pageActions from '../actions/page'

const initialState = {
  value: [] as Post[],
  isLoading: false,
  error: null as null | string,
}

const posts = createSlice({
  initialState,
  name: 'posts',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(thunks.fetchPosts.fulfilled, (state, action) => {
      state.error = null
      state.isLoading = false
      state.value = action.payload
    })
    builder.addCase(thunks.fetchPosts.pending, (state, action) => {
      state.error = null
      state.isLoading = true
    })
    builder.addCase(thunks.fetchPosts.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message?.toString() || null
    })
  },
})

export const {} = posts.actions
export default posts.reducer
