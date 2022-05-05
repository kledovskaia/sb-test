import { createAction } from '@reduxjs/toolkit'
import { initialState } from '../slices/sort'

export const setSort = createAction<typeof initialState>('sort/setSort')
