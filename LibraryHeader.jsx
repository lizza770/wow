function LibraryHeader({ title, totalBooks = 0 }) {
    return (
      <header>
        <h1>{title}</h1>
        <p>წიგნების რაოდენობა: {totalBooks}</p>
      </header>
    );
}
export default LibraryHeader;