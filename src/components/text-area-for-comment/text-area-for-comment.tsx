import { ChangeEvent, memo } from 'react';

function TextAreaForComment(props: {
  commentValue: string,
  onChangeComment: (event: ChangeEvent<HTMLTextAreaElement>) => void,
  disabled: boolean,
}): JSX.Element {
  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      placeholder="Tell how was your stay, what you like and what can be improved"
      value={props.commentValue}
      onChange={props.onChangeComment}
      disabled={props.disabled}
    />
  );
}

export default memo(TextAreaForComment);
