import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    fetchedPages: [],
  },
  reducers: {
    addFetchedPage(state, action) {
      const page = action.payload;
      if (!state.fetchedPages.includes(page)) {
        state.fetchedPages.push(page);
      }
    },
    clearFetchedPages(state, action) {
        state.fetchedPages = []
    },
  },
});

export const { addFetchedPage,clearFetchedPages } = uiSlice.actions;
export default uiSlice.reducer;
