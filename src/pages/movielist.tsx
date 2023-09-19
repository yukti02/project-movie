import React from 'react';
import moviesData from 'D:/TDC/projectapp/movies.json';
import styles from 'D:/TDC/projectapp/src/styles/movielist.module.css';

interface MovieListProps {
  movies: {
    name: string;
    releaseyear: number;
    rating: number;
    reviewscount: string;
  }[];
  searchQuery: string;
  addToWatchlist: (movieName: string) => void;
  removeFromWatchlist: (movieName: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({ searchQuery, addToWatchlist }) => {
  const filteredMovies = moviesData.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.movieList}>
      <h1 style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: 900 }}>Top Popular Movies</h1>
      {filteredMovies.length === 0 ? (
        <p className={styles.para}>No matching movies found.</p>
      ) : (
        <ul>
          {filteredMovies.map((movie, index) => (
  <li key={index} className={styles.movieItem}>
    <h3>{movie.name}</h3>
    <p>Release Year: {movie.releaseyear}</p>
    <p>Rating: {movie.rating}</p>
    <p>Review Count: {movie.reviewscount}</p>
    <button onClick={() => addToWatchlist(movie.name)} className={styles.button}>
      Add to Watchlist
    </button>
  </li>
))}


        </ul>
      )}
    </div>
  );
};

export default MovieList;
