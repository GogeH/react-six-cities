import { Link } from 'react-router-dom';

import { OfferCity } from '../../types/offer';
import { cities } from '../../types/const';

function Tabs(props: {
  selectedCity: string,
  setSelectedCity: (city: OfferCity) => void;
}): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">

          {cities.map((city) => (
            <li key={city.name} className="locations__item">
              <Link to="/"
                className={`locations__item-link tabs__item tabs__item ${props.selectedCity === city.name && 'tabs__item--active'}`}
                onClick={() => props.setSelectedCity(city)}
              >
                <span>{city.name}</span>
              </Link>
            </li>
          ))}

        </ul>
      </section>
    </div>
  );
}

export default Tabs;
