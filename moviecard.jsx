function MovieCard({
  title = 'უცნობი ფილმი',
  year = 2024,
  genre = 'დრამა',
  rating = 0,
  posterUrl = '',
  duration = '120 წუთი',
  onAddToWatchlist = () => {},
  isInWatchlist = false
}) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '16px',
      margin: '12px',
      backgroundColor: '#fff'
    }}>
        {posterUrl && (
  <img
    src={posterUrl}
    alt={title}
    style={{
      width: '100%',
      height: '180px',
      objectFit: 'cover',
      borderRadius: '8px'
    }}
  />
)}
      <h2>{title}</h2>
      <p>წელი: {year}</p>
      <span style={{ backgroundColor: '#dbeafe', padding: '5px' }}>
        {genre}
      </span>
      <p>⭐ {rating}/10</p>
      <p>ხანგრძლივობა: {duration}</p>

      <button
        onClick={onAddToWatchlist}
        disabled={isInWatchlist}
      >
        {isInWatchlist ? 'დამატებულია ✓' : 'Watchlist-ში დამატება'}
      </button>
    </div>
  );
}

export default MovieCard;