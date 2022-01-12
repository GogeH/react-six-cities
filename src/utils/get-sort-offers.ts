import { Offer } from '../types/offer';
import { SortTypeOffers } from '../types/enum';

export function getSortOffers(sortType: SortTypeOffers): (first: Offer, second: Offer) => number {
  switch (sortType) {
    case SortTypeOffers.Popular:
      return () => 0;
    case SortTypeOffers.PriceLowToHigh:
      return (first: Offer, second: Offer) => first.price - second.price;
    case SortTypeOffers.PriceHighToLow:
      return (first: Offer, second: Offer) => second.price - first.price;
    case SortTypeOffers.TopRatedFirst:
      return (first: Offer, second: Offer) => second.rating - first.rating;
  }
}
