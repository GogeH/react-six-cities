import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../footer/footer';
import Header from '../header/header';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import FavoritesPlaceCard from '../favorites-place-card/favorites-place-card';
import { fetchOffersFavoritesAction } from '../../store/api-action';
import { getOffersFavoritesSelector } from '../../store/reducers/offers-data/selector-offers-data';

function Favorites(): JSX.Element {
  const dispatch = useDispatch();
  const offersFavorites = useSelector(getOffersFavoritesSelector);

  useEffect(()=> {
    dispatch(fetchOffersFavoritesAction());
  }, [dispatch]);

  return (
    <div className="page">

      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">

          {
            offersFavorites.length !== 0
              ?
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">

                  {
                    offersFavorites.map((offer) => (
                      <FavoritesPlaceCard key={offer.id} offer={offer} />
                    ))
                  }

                </ul>
              </section>
              :
              <FavoritesEmpty />
          }

        </div>
      </main>

      <Footer />

    </div>
  );
}

export default Favorites;
