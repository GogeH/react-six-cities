import { createReducer } from '@reduxjs/toolkit';

import { CommentsData } from '../../../types/state';
import { loadReviews } from '../../action';

const initialState: CommentsData = {
  reviews: [],
};

const commentsData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    });
});

export {commentsData};
