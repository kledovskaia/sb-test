import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as postThunks from '../thunks/posts'

export const initialState = {
  pageNumber: null as number | null,
  perPage: 10,
  pagesCount: 0,
}

const page = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (
      state,
      action: PayloadAction<typeof initialState['pageNumber']>,
    ) => {
      state.pageNumber = action.payload
    },
    nextPage: state => {
      if (state.pageNumber && state.pageNumber < state.pagesCount)
        state.pageNumber++
    },
    previousPage: state => {
      if (state.pageNumber && state.pageNumber > 1) state.pageNumber--
    },
  },
  extraReducers: builder => {
    builder.addCase(postThunks.fetchPosts.fulfilled, (state, action) => {
      state.pagesCount = Math.ceil(action.payload.length / state.perPage)
    })
  },
})

export const { nextPage, previousPage, setPage } = page.actions
export default page.reducer
