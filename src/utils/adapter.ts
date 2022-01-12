import { Offer, ServerOffer } from '../types/offer';
import { Review, ServerReview } from '../types/review';
import { AuthInfo, ServerAuthInfo } from '../types/types';

export const adaptOfferToClient = (offer: ServerOffer): Offer => (
  Object.assign(
    {},
    offer,
    {
      isFavorite: offer['is_favorite'],
      isPremium: offer['is_premium'],
      maxAdults: offer['max_adults'],
      previewImage: offer['preview_image'],
      host: Object.assign(
        {},
        offer.host,
        {
          avatarUrl: offer.host['avatar_url'],
          isPro: offer.host['is_pro'],
        },
      ),
    },
  )
);

export const adaptReviewToClient = (review: ServerReview): Review => (
  Object.assign(
    {},
    review,
    {
      date: review.date,
      user: Object.assign(
        {},
        review.user,
        {
          avatarUrl: review.user['avatar_url'] ?? '',
          isPro: review.user['is_pro'],
        },
      ),
    },
  )
);

export const adapterAuthInfoToFrontEnd = (data: ServerAuthInfo): AuthInfo => ({
  avatarUrl: data['avatar_url'],
  email: data.email,
  id: data.id,
  isPro: data['is_pro'],
  name: data.name,
  token: data.token,
});
