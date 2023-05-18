import React, {useState} from 'react';

const Search = ({onSearch}) => {
  const [query, setQuery] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder='Enter location...'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;