import { generatePath, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppRoute, AuthorizationStatus, FavoriteStatus } from '../../types/enum';
import { Offer } from '../../types/offer';
import { fetchFavoritesOffer, fetchOffersAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/reducers/user-auth/selector-user-auth';
import { getRatingStars } from '../../utils/get-rating-stars';

function OfferPlaceCard(props: {
  offer: Offer,
  onHover: (offer: Offer | null) => void,
  onMouseOver?: (number: number) => void,
}): JSX.Element {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);

  const handleFavoriteButtonClick = async () => {
    await dispatch(fetchFavoritesOffer(props.offer.id, props.offer.isFavorite ? FavoriteStatus.NotFavorite : FavoriteStatus.Favorite));
    await dispatch(fetchOffersAction());
  };

  return (
    <article className="cities__place-card place-card"
      onMouseOver={() => {
        props.onHover(props.offer);
        props.onMouseOver && props.onMouseOver(props.offer.id);
      }}
      onMouseLeave={() => {
        props.onHover(null);
        props.onMouseOver && props.onMouseOver(0);
      }}
    >

      {
        props.offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={generatePath(AppRoute.Room.replace(':id', props.offer.id.toString()))}>
          <img className="place-card__image" src={props.offer.images[0]} width="260" height="200" alt="apartment or room" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          {
            authorizationStatus === AuthorizationStatus.Auth &&
            <button
              onClick={handleFavoriteButtonClick}
              className={`place-card__bookmark-button ${props.offer.isFavorite && 'place-card__bookmark-button--active'} button`}
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To/In bookmarks</span>
            </button>
          }

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingStars(props.offer.rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Room.replace(':id', props.offer.id.toString()))}>{props.offer.title}</Link>
        </h2>
        <p className="place-card__type">{props.offer.type}</p>
      </div>
    </article>
  );
}

export default OfferPlaceCard;
