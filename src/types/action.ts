import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { AxiosInstance } from 'axios';

import { State } from './state';

export enum ActionType {
  ChangeCity = 'change/changeCity',
  ChangeActiveOffer = 'change/activeOffer',
  ChangeSortOffers = 'change/changeSortOffers',
  ChangeFavoritesOffer = 'change/changeFavoritesOffer',
  ChangeProperty = 'change/changeProperty',
  LoadOffers = 'data/loadOffers',
  LoadOffersNearby = 'data/loadOffersNearby',
  LoadReviews = 'data/loadReviews',
  LoadOffersFavorites = 'data/loadOffersFavorites',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'app/redirectToRoute',
  RequireAuthInfo = 'user/requireAuthInfo',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
