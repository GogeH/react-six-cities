import { memo } from 'react';

import { Review } from '../../types/review';
import { getDatetime, getHumanizedDateTime } from '../../utils/get-data-time';
import { getRatingStars } from '../../utils/get-rating-stars';

function ReviewCard(props: {
  review: Review,
}): JSX.Element {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={props.review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{props.review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRatingStars(props.review.rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{props.review.comment}</p>
        <time className="reviews__time" dateTime={getDatetime(props.review.date)}>{getHumanizedDateTime(props.review.date)}</time>
      </div>
    </li>
  );
}

export default memo(ReviewCard);
