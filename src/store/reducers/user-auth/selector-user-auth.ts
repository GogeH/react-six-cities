import { State } from '../../../types/state';
import { AuthorizationStatus } from '../../../types/enum';
import { NameSpace } from '../../root-reducer';
import { AuthInfo } from '../../../types/types';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.UserAuth].authorizationStatus;
export const getAuthInfo = (state: State): AuthInfo  => state[NameSpace.UserAuth].authInfo;
