import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Header from '../header/header';
import Error from '../error/error';
import ReviewList from '../review-list/review-list';
import OfferDetail from '../offer-detail/offer-detail';
import Map from '../map/map';
import OtherOffersList from '../other-places-offers/other-offers-list';
import { MovieParam } from '../../types/types';
import { fetchOffersNearbyAction, fetchPropertyAction, fetchReviewsAction } from '../../store/api-action';
import { getCommentsSelector } from '../../store/reducers/comments-data/selector-comments-data';
import { getOffersSelector } from '../../store/reducers/offers-data/selector-offers-data';

function Property(): JSX.Element {
  const dispatch = useDispatch();
  const reviews = useSelector(getCommentsSelector);
  const offers = useSelector(getOffersSelector);

  const { id } = useParams<MovieParam>();

  const idIsNumber = Number(id);
  const offer = offers.find((item) => item.id.toString() === id);

  useEffect(() => {
    dispatch(fetchOffersNearbyAction(idIsNumber));
  }, [dispatch, idIsNumber]);

  useEffect(() => {
    dispatch(fetchReviewsAction(idIsNumber));
  },[dispatch, idIsNumber]);

  useEffect(() => {
    dispatch(fetchPropertyAction(idIsNumber));
  },[dispatch, idIsNumber]);

  if (!offer) {
    return <Error />;
  }

  return (
    <div className="page">

      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">

              {offer.images.map((image, index) => (
                <div key={`${image}__${index + 1}`} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="apartment or room" />
                </div>
              ))}

            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              <OfferDetail offer={offer} />

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>

                  {offer.host.isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}

                </div>
                <div className="property__description">{offer.description}</div>
              </div>

              <ReviewList reviews={reviews} offer={offer} />

            </div>
          </div>
          <section className="property__map map">

            <Map
              offers={offers}
              city={offer.city}
              activeOffer={offer}
            />

          </section>
        </section>
        <div className="container">

          <OtherOffersList />

        </div>
      </main>
    </div>
  );
}

export default Property;
