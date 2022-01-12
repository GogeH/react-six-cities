import { createAction } from '@reduxjs/toolkit';

import { ActionType } from '../types/action';
import { AppRoute, AuthorizationStatus, SortTypeOffers } from '../types/enum';
import { Offer, OfferCity } from '../types/offer';
import { Review } from '../types/review';
import { AuthInfo } from '../types/types';

const changeCityAction = createAction(
  ActionType.ChangeCity,
  (city: OfferCity) => ({
    payload: city,
  }),
);

const changeOfferActiveAction = createAction(
  ActionType.ChangeActiveOffer,
  (offer: Offer | undefined) => ({
    payload: offer,
  }),
);

const changeSortOffers = createAction(
  ActionType.ChangeSortOffers,
  (sortOption: SortTypeOffers) => ({
    payload: sortOption,
  }),
);

const changeFavoritesOffer = createAction(
  ActionType.ChangeFavoritesOffer,
  (status: number) => ({
    payload: status,
  }),
);

const changeProperty = createAction(
  ActionType.ChangeProperty,
  (offer: Offer) => ({
    payload: offer,
  }),
);

const loadOffers = createAction(
  ActionType.LoadOffers,
  (offers: Offer[]) => ({
    payload: offers,
  }),
);

const loadOffersNearby = createAction(
  ActionType.LoadOffersNearby,
  (offers: Offer[]) => ({
    payload: offers,
  }),
);

const loadOffersFavorites = createAction(
  ActionType.LoadOffersFavorites,
  (offers: Offer[]) => ({
    payload: offers,
  }),
);

const loadReviews = createAction(
  ActionType.LoadReviews,
  (reviews: Review[]) => ({
    payload: reviews,
  }),
);


const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

const requireLogout = createAction(ActionType.RequireLogout);

const requireAuthInfo = createAction(
  ActionType.RequireAuthInfo,
  (authInfo: AuthInfo) => ({
    payload: authInfo,
  }),
);

const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export {
  changeCityAction,
  changeOfferActiveAction,
  changeSortOffers,
  changeFavoritesOffer,
  changeProperty,
  loadOffers,
  loadOffersNearby,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  requireAuthInfo,
  loadReviews,
  loadOffersFavorites
};
