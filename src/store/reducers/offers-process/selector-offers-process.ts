import { SortTypeOffers } from '../../../types/enum';
import { State } from '../../../types/state';
import { NameSpace } from '../../root-reducer';
import { Offer } from '../../../types/offer';

export const getSortTypeOffers =(state: State): SortTypeOffers => state[NameSpace.OffersProcess].sortOffers;
export const getActiveOffer =(state: State): Offer | undefined => state[NameSpace.OffersProcess].activeOffer;
export const getProperty =(state: State): Offer | undefined => state[NameSpace.OffersProcess].property;

