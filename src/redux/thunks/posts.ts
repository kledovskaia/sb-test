import { createAsyncThunk } from '@reduxjs/toolkit'
import * as postsAPI from '../../lib/postsAPI'

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const posts = await postsAPI.fetchAllPosts()
      return posts
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  },
)
