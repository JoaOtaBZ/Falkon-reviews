function RatingStars({ rating }) {
  if (!rating) {
    return <span className="not-reviewed">Ainda não avaliado</span>;
  }

  const roundedRating = Math.round(rating);

  return (
    <div className="stars">
      {"★".repeat(roundedRating)}
      {"☆".repeat(5 - roundedRating)}
      <span> {rating}/5</span>
    </div>
  );
}

export default RatingStars;