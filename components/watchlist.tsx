import React from 'react';
import styles from 'D:/TDC/projectapp/src/styles/watchlist.module.css';

interface WatchlistProps {
  watchlist: string[];
  removeFromWatchlist: (movieName: string) => void;
  addToWatchlist: (movieName: string) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlist, removeFromWatchlist }) => {
  return (
    <div>
      {watchlist.length === 0 ? (
        <p className={styles['para']}>Your watchlist is empty.</p>
      ) : (
        <ul className={styles['watchlist']}>
          {watchlist.map((movieName, index) => (
            <li key={index} className={styles['watchlist-item']}>
              <div className={styles['watchlist-content']}>
                <h3 className={styles['movie-name']}>{movieName}</h3>
                <button
                  onClick={() => removeFromWatchlist(movieName)}
                  className={styles['remove-button']}
                >
                  Remove from Watchlist
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Watchlist;
