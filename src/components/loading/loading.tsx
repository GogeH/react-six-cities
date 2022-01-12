import { memo } from 'react';

function Loading(): JSX.Element {
  return (
    <p className="loading">Loading</p>
  );
}

export default memo(Loading);
