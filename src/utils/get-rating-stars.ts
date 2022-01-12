export const getRatingStars = (rating: number): string => {
  const STARS_COUNT = 5;
  return `${Math.floor(rating) * 100 / STARS_COUNT}%`;
};
