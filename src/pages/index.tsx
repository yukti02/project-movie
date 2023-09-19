import React, { useState } from 'react';
import SearchBar from 'D:/TDC/projectapp/components/searchbar.tsx';
import WatchList from 'D:/TDC/projectapp/components/watchlist.tsx';
import MovieList from 'D:/TDC/projectapp/src/pages/movielist.tsx';
import moviesData from 'D:/TDC/projectapp/movies.json';

const HomePage = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchlistVisible, setWatchlistVisible] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const addToWatchlist = (movieName: string) => {
    if (!watchlist.includes(movieName)) {
      setWatchlist([...watchlist, movieName]);
    }
  };

  const removeFromWatchlist = (movieName: string) => {
    setWatchlist(watchlist.filter((name) => name !== movieName));
  };

  const toggleWatchlistVisibility = () => {
    setWatchlistVisible(!watchlistVisible);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: 900 }}>TmDB</h1>
      <SearchBar onSearch={handleSearch} />
      <button
        onClick={toggleWatchlistVisibility}
        style={{
          backgroundColor: "#022956",
          padding: "8px 16px",
          fontFamily: "monospace",
          fontWeight: 900,
          fontSize: 16,
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          margin: "0 auto",
          display: "block",
          marginTop: 48,
          transition: "background-color 0.3s ease"
        }}
      >
        View Watchlist
      </button>

      {watchlistVisible && (
        <div>
          <WatchList
            watchlist={watchlist}
            removeFromWatchlist={removeFromWatchlist}
            addToWatchlist={addToWatchlist}
          />
        </div>
      )}

      <MovieList
        movies={moviesData}
        searchQuery={searchQuery}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
      />
    </div>
  );
};

export default HomePage;