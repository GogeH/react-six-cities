import { Middleware } from 'redux';
import browserHistory from '../../browser-history';

import { State } from '../../types/state';
import { ActionType } from '../../types/action';

export const redirect: Middleware<unknown, State> = (_store) => (dispatch) => (action) => {
  if (action.type === ActionType.RedirectToRoute) {
    browserHistory.push(action.payload);
  }
  return dispatch(action);
};


