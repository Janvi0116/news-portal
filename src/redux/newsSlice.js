import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNewsData } from '../services/newsService';
import { addFetchedPage } from './uiSlice';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({page = 1}, thunkAPI) => {
    try {
      const { searchInput, newsCategory } = thunkAPI.getState().news;
      const response = await getNewsData({
        searchInput, 
        newsCategory, 
        page
      });
      thunkAPI.dispatch(addFetchedPage(page));
      return {
        articles: response.articles,
        totalResults: response.totalResults,
        page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: {},
    totalResults: 0,
    loading: false,
    error: null,
    page: 1,
    searchInput: '', 
    newsCategory: ''
  },
  reducers: {
    resetArticles(state) {
      state.articles = {};
      state.page = 1;
      state.totalResults = 0;
      state.loading = false;
      state.error = null;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setFilters(state,action){
      state.searchInput = action.payload.searchInput;
      state.newsCategory = action.payload.newsCategory;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = {...state.articles, [action.payload.page] : action.payload.articles};
        state.totalResults = action.payload.totalResults;
        state.page = action.payload.page; // Update the current page in state
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetArticles, setPage,setFilters } = newsSlice.actions;
export default newsSlice.reducer;
