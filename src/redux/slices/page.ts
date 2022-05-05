import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  pageNumber: 0,
  perPage: 10,
}

const page = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: () => {},
  },
})

export default page.reducer
