import { OfferCity } from './offer';
import { AuthorizationStatus, SortTypeOffers } from './enum';
import { Offer } from './offer';
import { Review } from './review';
import { AuthInfo } from './types';
import { RootState } from '../store/root-reducer';

export type OffersData = {
  city: OfferCity,
  offers: Offer[],
  offersFavorites: Offer[],
  offersNearby: Offer[],
  isDataLoaded: boolean,
};

export type OffersProcess = {
  activeOffer: Offer | undefined,
  sortOffers: SortTypeOffers,
  property: Offer | undefined,
}

export type CommentsData = {
  reviews: Review[],
};

export type UserAuth = {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo,
};

export type State = RootState;




