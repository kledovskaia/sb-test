import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialState = {
  type: null as null | Type,
  order: null as null | Order,
}

const sort = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<typeof initialState>) => {
      if (action.payload.type && state.type === action.payload.type) {
        state.order = state.order === 'desc' ? 'asc' : 'desc'
      } else {
        state.type = action.payload.type
        state.order = 'desc'
      }
    },
  },
})

export const { setSort } = sort.actions
export default sort.reducer
