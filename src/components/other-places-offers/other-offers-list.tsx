import { useState } from 'react';
import { useSelector } from 'react-redux';

import OfferPlaceCard from '../offer-place-card/offer-place-card';
import { getOffersNearbySelector } from '../../store/reducers/offers-data/selector-offers-data';

function OtherOffersList(): JSX.Element {
  const offersNearby = useSelector(getOffersNearbySelector);

  const [, setFocusedCard] = useState({});

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">

        {
          offersNearby.map((card, index) => (
            <OfferPlaceCard
              key={`${card}__${index + 1}`}
              offer={card}
              onHover={() => setFocusedCard(offersNearby)}
            />
          ))
        }

      </div>
    </section>
  );
}

export default OtherOffersList;
