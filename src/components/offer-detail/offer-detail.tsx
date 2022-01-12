import { useSelector } from 'react-redux';

import OfferFavoritesButton from '../offer-favorites-button/offer-favorites-button';
import { Offer } from '../../types/offer';
import { AuthorizationStatus } from '../../types/enum';
import { getAuthorizationStatus } from '../../store/reducers/user-auth/selector-user-auth';
import { getRatingStars } from '../../utils/get-rating-stars';

function OfferDetail(props: {
  offer: Offer,
}): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <>
      {
        props.offer.isPremium &&
        <div className="property__mark">
          <span>Premium</span>
        </div>
      }

      <div className="property__name-wrapper">
        <h1 className="property__name">
          {props.offer.title}
        </h1>
        {
          authorizationStatus === AuthorizationStatus.Auth &&
          <OfferFavoritesButton offer={props.offer} />
        }
      </div>
      <div className="property__rating rating">
        <div className="property__stars rating__stars">
          <span style={{width: getRatingStars(props.offer.rating)}} />
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="property__rating-value rating__value">{props.offer.rating}</span>
      </div>
      <ul className="property__features">
        <li className="property__feature property__feature--entire">
          {props.offer.type}
        </li>
        <li className="property__feature property__feature--bedrooms">
          {props.offer.bedrooms} Bedrooms
        </li>
        <li className="property__feature property__feature--adults">
          Max {props.offer.maxAdults} adults
        </li>
      </ul>
      <div className="property__price">
        <b className="property__price-value">&euro;{props.offer.price}</b>
        <span className="property__price-text">&nbsp;night</span>
      </div>
      <div className="property__inside">
        <h2 className="property__inside-title">What&apos;s inside</h2>
        <ul className="property__inside-list">

          {
            props.offer.goods.map((service, index) => (
              <li key={`${service}__${index + 1}`} className="property__inside-item">
                {service}
              </li>
            ))
          }

        </ul>
      </div>
    </>
  );
}

export default OfferDetail;
