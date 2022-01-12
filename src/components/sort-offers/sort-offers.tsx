import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeSortOffers } from '../../store/action';
import { SortTypeOffers } from '../../types/enum';
import { getSortTypeOffers } from '../../store/reducers/offers-process/selector-offers-process';

function SortOffers(): JSX.Element {
  const dispatch = useDispatch();
  const sortOffers = useSelector(getSortTypeOffers);

  const [visibleSortOffers, setVisibleSortOffers] = useState<boolean>(false);
  const sortRef = useRef<HTMLFormElement | null>(null);

  const toggleVisibleSortOffers = (): void => {
    setVisibleSortOffers(!visibleSortOffers);
  };

  // const handleOutsideClick = (event: any): void => {
  //   const path = event.path || (event.composedPath && event.composedPath());
  //
  //   if (!path.includes(sortRef.current)) {
  //     setVisibleSortOffers(false);
  //   }
  // };
  //
  // useEffect(() => {
  //   document.addEventListener('click', handleOutsideClick);
  // }, []);

  const handleSortClick = (typeSort: SortTypeOffers) => {
    setVisibleSortOffers(false);
    dispatch(changeSortOffers(typeSort));
  };

  return (
    <form ref={sortRef} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={toggleVisibleSortOffers} className="places__sorting-type" tabIndex={0}>
        {sortOffers}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${visibleSortOffers ? 'places__options--opened' : ''}`}>

        {
          Object.values(SortTypeOffers).map((sort, index) => (
            <li
              onClick={() => handleSortClick(sort)}
              key={sort}
              className={`places__option ${sort === sortOffers ? 'places__option--active' : ''}`}
              tabIndex={0}
            >
              {sort}
            </li>
          ))
        }

      </ul>
    </form>
  );
}

export default SortOffers;
