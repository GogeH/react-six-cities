import { createReducer } from '@reduxjs/toolkit';

import { OffersData } from '../../../types/state';
import { cities } from '../../../types/const';
import { changeCityAction, loadOffers, loadOffersFavorites, loadOffersNearby } from '../../action';

const initialState: OffersData = {
  city: cities[0],
  offers: [],
  offersFavorites: [],
  offersNearby: [],
  isDataLoaded: false,
};

const offersData = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(loadOffersFavorites, (state, action) => {
      state.offersFavorites = action.payload;
    });
});

export {offersData};
