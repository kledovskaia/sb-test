import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import posts from './slices/posts'
import sort from './slices/sort'
import page from './slices/page'
import loading from './slices/loading'
import error from './slices/error'
import search from './slices/search'

export const store = configureStore({
  reducer: {
    posts,
    sort,
    page,
    loading,
    error,
    search,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
