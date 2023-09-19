import React, { useState } from 'react';
import styles from 'D:/TDC/projectapp/src/styles/searchbar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <span className={styles['search-bar']}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search a movie..."
          className={styles.input}
        />
        <button onClick={handleSearch} className={styles.button}> Search </button>
      </span>
    </div>
  );
};

export default SearchBar;
