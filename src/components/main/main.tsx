import { useDispatch, useSelector } from 'react-redux';

import Header from '../header/header';
import Tabs from '../tabs/tabs';
import OfferList from '../offer-list/offer-list';
import Map from '../map/map';
import SortOffers from '../sort-offers/sort-offers';
import MainEmpty from '../main-empty/main-empty';
import { changeCityAction, changeOfferActiveAction } from '../../store/action';
import { OfferCity } from '../../types/offer';
import { getSortOffers } from '../../utils/get-sort-offers';
import { getCity, getOffersSelector } from '../../store/reducers/offers-data/selector-offers-data';
import { getActiveOffer, getSortTypeOffers } from '../../store/reducers/offers-process/selector-offers-process';

function Main(): JSX.Element {
  const dispatch = useDispatch();
  const city = useSelector(getCity);
  const offers = useSelector(getOffersSelector);
  const activeOffer = useSelector(getActiveOffer);
  const sortOffers = useSelector(getSortTypeOffers);

  const setSelectedCity = (selectedCity: OfferCity) => dispatch(changeCityAction(selectedCity));

  const sortedOffers = offers
    .filter((offer) => offer.city.name === city.name)
    .sort(getSortOffers(sortOffers));

  const hasOffers = sortedOffers.length !== 0;

  const onOfferItemHover = (offerItemId: number) => {
    const currentPoint = sortedOffers.find((offer) =>
      offer.id === offerItemId,
    );

    dispatch(changeOfferActiveAction(currentPoint));
  };

  return (
    <div className="page page--gray page--main">

      <Header />

      <main className={`page__main page__main--index ${!hasOffers && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>

        <Tabs selectedCity={city.name} setSelectedCity={setSelectedCity} />

        <div className="cities">
          <div className={`cities__places-container ${!hasOffers && 'cities__places-container--empty'} container`}>

            {
              hasOffers
                ?
                <>
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{sortedOffers.length} places to stay in {city.name}</b>

                    <SortOffers />

                    <OfferList offers={sortedOffers}  onOfferItemHover={onOfferItemHover}/>

                  </section>
                  <div className="cities__right-section">
                    <section className="cities__map map">

                      <Map
                        offers={sortedOffers}
                        city={city}
                        activeOffer={activeOffer}
                      />

                    </section>
                  </div>
                </>
                :
                <MainEmpty city={city.name}/>
            }

          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
