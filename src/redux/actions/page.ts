import { createAction } from '@reduxjs/toolkit'
import { initialState } from '../slices/page'

export const setPage = createAction<typeof initialState>('page/setPage')
