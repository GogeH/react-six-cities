import { createReducer } from '@reduxjs/toolkit';

import { UserAuth } from '../../../types/state';
import { AuthorizationStatus } from '../../../types/enum';
import { requireAuthInfo, requireAuthorization, requireLogout } from '../../action';

const initialState: UserAuth = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: {
    avatarUrl: '',
    email: '',
    id: 0,
    isPro: false,
    name: '',
    token: '',
  },
};

const userAuth = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireAuthInfo, (state, action) => {
      state.authInfo = action.payload;
    })
    .addCase(requireLogout, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});

export {userAuth};
