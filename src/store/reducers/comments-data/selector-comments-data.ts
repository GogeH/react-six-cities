import { createSelector } from 'reselect';

import { State } from '../../../types/state';
import { Review } from '../../../types/review';
import { NameSpace } from '../../root-reducer';

export const getComments = (state: State): Review[] => state[NameSpace.CommentsData].reviews;

export const getCommentsSelector = createSelector(getComments, (reviews) =>
  reviews,
);
