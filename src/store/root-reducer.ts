import { combineReducers } from '@reduxjs/toolkit';

import { offersData } from './reducers/offers-data/offers-data';
import { offersProcess } from './reducers/offers-process/offers-process';
import { commentsData } from './reducers/comments-data/comments-data';
import { userAuth } from './reducers/user-auth/user-auth';

export enum NameSpace {
  OffersData = 'OFFERS_DATA',
  CommentsData = 'COMMENTS_DATA',
  UserAuth = 'USER_AUTH',
  OffersProcess = 'OFFERS_PROCESS',
}

export const rootReducer = combineReducers({
  [NameSpace.OffersData]: offersData,
  [NameSpace.OffersProcess]: offersProcess,
  [NameSpace.CommentsData]: commentsData,
  [NameSpace.UserAuth]: userAuth,
});

export type RootState = ReturnType<typeof rootReducer>;
