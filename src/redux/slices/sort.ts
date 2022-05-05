import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setSort } from '../actions/sort'

export const initialState = {
  type: null as null | Type,
  order: null as null | Order,
}

const sort = createSlice({
  name: 'sort',
  initialState,
  reducers: {},
  extraReducers: build => {
    build.addCase(setSort, (state, action) => {
      if (action.payload.type && state.type === action.payload.type) {
        state.order = state.order === 'desc' ? 'asc' : 'desc'
      } else {
        state.type = action.payload.type
        state.order = 'desc'
      }
    })
  },
})

export default sort.reducer
