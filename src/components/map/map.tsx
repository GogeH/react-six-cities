import { useEffect, useRef } from 'react';

import useMap from '../../hooks/use-map';
import { OfferCity } from '../../types/offer';
import { Icon, Marker, LatLng } from 'leaflet';
import { Offer } from '../../types/offer';

import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map(props: {
  offers: Offer[],
  city: OfferCity,
  activeOffer?: Offer,
}): JSX.Element {
  const { offers, city, activeOffer } = props;

  const mapRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const { location } = offer;

        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(
            activeOffer !== undefined && offer.id === activeOffer.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });

      const latitude = city.location.latitude;
      const longitude = city.location.longitude;

      map.setView(new LatLng(latitude, longitude), 13);
    }
  }, [map, offers, city, activeOffer]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
