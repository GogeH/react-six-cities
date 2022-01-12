import { useState } from 'react';

import OfferPlaceCard from '../offer-place-card/offer-place-card';
import { Offer } from '../../types/offer';

function OfferList(props: {
  offers: Offer[],
  onOfferItemHover: (number: number) => void,
}): JSX.Element {
  const [, setFocusedCard] = useState({});

  return (
    <div className="cities__places-list places__list tabs__content">

      {
        props.offers.map((offer) => (
          <OfferPlaceCard
            key={offer.id}
            offer={offer}
            onHover={() => setFocusedCard(props.offers)}
            onMouseOver={props.onOfferItemHover}
          />
        ))
      }

    </div>
  );
}

export default OfferList;
