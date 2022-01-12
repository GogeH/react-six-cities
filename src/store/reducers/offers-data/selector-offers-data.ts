import { createSelector } from 'reselect';

import { State } from '../../../types/state';
import { City, Offer } from '../../../types/offer';
import { NameSpace } from '../../root-reducer';

const NEARBY_OFFERS_COUNT = 3;

export const getOffers =(state: State): Offer[] => state[NameSpace.OffersData].offers;
export const getOffersFavorites =(state: State): Offer[] => state[NameSpace.OffersData].offersFavorites;
export const getOffersNearby =(state: State): Offer[] => state[NameSpace.OffersData].offersNearby;
export const getCity =(state: State): City => state[NameSpace.OffersData].city;
export const getIsDataLoaded =(state: State): boolean => state[NameSpace.OffersData].isDataLoaded;

export const getOffersSelector = createSelector(getOffers, (offers) =>
  offers,
);

export const getOffersFavoritesSelector = createSelector(getOffersFavorites, (offers) =>
  offers,
);

export const getOffersNearbySelector = createSelector(getOffersNearby, (offers) =>
  offers.slice(0, NEARBY_OFFERS_COUNT),
);
