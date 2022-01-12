import { ChangeEvent, Fragment, memo } from 'react';

const MAX_RATING = 5;

function StarListForOffer(props: {
  ratingValue: number,
  onChangeRating: (event: ChangeEvent<HTMLInputElement>) => void,
  disabled: boolean,
}): JSX.Element {
  const stars = (new Array(MAX_RATING)).fill(null).map((_, index) => index + 1).reverse();

  return (
    <div className="reviews__rating-form form__rating">

      {stars.map((value) => (
        <Fragment key={value}>
          <input
            onChange={props.onChangeRating}
            className="form__rating-input visually-hidden"
            name="rating"
            value={value}
            id={`${value}-stars`}
            checked={props.ratingValue === value}
            type="radio"
            disabled={props.disabled}
          />
          <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </Fragment>
      ))}

    </div>

  );
}

export default memo(StarListForOffer);
