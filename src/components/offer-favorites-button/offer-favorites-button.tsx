import { useDispatch } from 'react-redux';

import { FavoriteStatus } from '../../types/enum';
import { fetchFavoritesOffer, fetchOffersAction } from '../../store/api-action';
import { Offer } from '../../types/offer';

function OfferFavoritesButton(props: {
  offer: Offer,
}): JSX.Element {
  const dispatch = useDispatch();

  const handleFavoriteButtonClick = async () => {
    await dispatch(fetchFavoritesOffer(props.offer.id, props.offer.isFavorite ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite));
    await dispatch(fetchOffersAction());
  };

  return (
    <button
      onClick={handleFavoriteButtonClick}
      className={`property__bookmark-button ${props.offer.isFavorite ? 'property__bookmark-button--active' : ''} button`}
      type="button"
    >
      <svg className="property__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To/In bookmarks</span>
    </button>
  );
}

export default OfferFavoritesButton;
