import { ChangeEvent, memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import StarListForOffer from '../star-list-for-offer/star-list-for-offer';
import TextAreaForComment from '../text-area-for-comment/text-area-for-comment';
import { Offer } from '../../types/offer';
import { fetchReviewsAction, sendComment } from '../../store/api-action';

const NUMERAL_SYSTEM = 10;
const DEFAULT_RATING_VALUE = 0;
const MIN_LENGTH_COMMENT = 30;
const MAX_LENGTH_COMMENT = 250;

function CommentForm(props: {
  offer: Offer,
}): JSX.Element {
  const dispatch = useDispatch();

  const id = props.offer.id;

  const [ratingValue, setRatingValue] = useState<number>(0);
  const [commentValue, setCommentValue] = useState<string>('');
  const [formIsSending, setFormIsSending] = useState<boolean>(false);

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(event.target.value);
  };

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRatingValue(parseInt(event.target.value, NUMERAL_SYSTEM));
  };

  const checkValidRatingValue = () => ratingValue !== DEFAULT_RATING_VALUE;

  const checkValidCommentValue = () => (
    commentValue.length >= MIN_LENGTH_COMMENT && commentValue.length <= MAX_LENGTH_COMMENT
  );

  const isDisabledSubmitForm = () => (
    !checkValidRatingValue() || !checkValidCommentValue() || formIsSending
  );

  const onFormSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isDisabledSubmitForm()) {
      return;
    }

    try {
      setFormIsSending(true);
      await dispatch(sendComment({ id, ratingValue, commentValue }));
      await dispatch(fetchReviewsAction(id));
    } catch (error) {
      setFormIsSending(false);
    } finally {
      setFormIsSending(false);
      setRatingValue(0);
      setCommentValue('');
    }
  };

  return (
    <form className="reviews__form form" action="#" onSubmit={onFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <StarListForOffer ratingValue={ratingValue} onChangeRating={handleRatingChange} disabled={formIsSending}/>

      <TextAreaForComment commentValue={commentValue} onChangeComment={handleCommentChange} disabled={formIsSending}/>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">30 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabledSubmitForm()}>Submit</button>
      </div>
    </form>
  );
}

export default memo(CommentForm);
