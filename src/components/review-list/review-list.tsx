import { useSelector } from 'react-redux';

import CommentForm from '../comment-from/comment-form';
import ReviewCard from '../review-card/review-card';
import { Review } from '../../types/review';
import { AuthorizationStatus } from '../../types/enum';
import { Offer } from '../../types/offer';
import { getAuthorizationStatus } from '../../store/reducers/user-auth/selector-user-auth';

function ReviewList(props: {
  reviews: Review[],
  offer: Offer,
}): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{props.reviews.length}</span></h2>
      <ul className="reviews__list">

        {props.reviews.map((review, index) => (
          <ReviewCard key={`${review}__${index + 1}`} review={review} />
        ))}

      </ul>

      {
        authorizationStatus === AuthorizationStatus.Auth &&
        <CommentForm offer={props.offer}/>
      }

    </section>
  );
}

export default ReviewList;
