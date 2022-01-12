import { Link } from 'react-router-dom';

import { Offer } from '../../types/offer';
import { fetchFavoritesOffer, fetchOffersAction, fetchOffersFavoritesAction } from '../../store/api-action';
import { useDispatch } from 'react-redux';
import { getRatingStars } from '../../utils/get-rating-stars';

function FavoritesPlaceCard(props: {
  offer: Offer,
}): JSX.Element {
  const dispatch = useDispatch();

  const handleDeleteFavoriteOffer = async () => {
    await dispatch(fetchFavoritesOffer(props.offer.id, 0));
    await dispatch(fetchOffersFavoritesAction());
    await dispatch(fetchOffersAction());
  };

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to="/">
            <span>{props.offer.city.name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <article className="favorites__card place-card">
          <div className="favorites__image-wrapper place-card__image-wrapper">
            <Link to={`/offer/${props.offer.id}`}>
              <img className="place-card__image" src={props.offer.images[0]} width="150" height="110" alt="Place" />
            </Link>
          </div>
          <div className="favorites__card-info place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;{props.offer.price}</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button
                onClick={handleDeleteFavoriteOffer}
                className="place-card__bookmark-button place-card__bookmark-button--active button"
                type="button"
              >
                <svg className="place-card__bookmark-icon" width="33" height="34">
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">In bookmarks</span>
              </button>
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{width: getRatingStars(props.offer.rating)}} />
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <Link to={`/offer/${props.offer.id}`}>Wood and stone place</Link>
            </h2>
            <p className="place-card__type">Private room</p>
          </div>
        </article>
      </div>
    </li>
  );
}

export default FavoritesPlaceCard;
