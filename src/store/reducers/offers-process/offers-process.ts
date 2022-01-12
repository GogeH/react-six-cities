import { createReducer } from '@reduxjs/toolkit';

import { OffersProcess } from '../../../types/state';
import { SortTypeOffers } from '../../../types/enum';
import { changeOfferActiveAction, changeProperty, changeSortOffers } from '../../action';

const initialState: OffersProcess = {
  activeOffer: undefined,
  sortOffers: SortTypeOffers.Popular,
  property: undefined,
};

const offersProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeOfferActiveAction, (state, action) => {
      state.activeOffer = action.payload;
    })
    .addCase(changeSortOffers, (state, action) => {
      state.sortOffers = action.payload;
    })
    .addCase(changeProperty, (state, action) => {
      state.property = action.payload;
    });
});

export {offersProcess};
