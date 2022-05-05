import { createAction } from '@reduxjs/toolkit'
import { initialState } from '../slices/search'

export const setSearch =
  createAction<typeof initialState['value']>('search/setSearch')
