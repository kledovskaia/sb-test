import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setSearch } from '../actions/search'

export const initialState = {
  value: '',
}

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: build => {
    build.addCase(setSearch, (state, action) => {
      state.value = action.payload
    })
  },
})

export default search.reducer
