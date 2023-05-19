import React, {useState} from 'react';
import SearchBtn from './SearchBtn.png'
const Search = ({onSearch}) => {
  const [query, setQuery] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    onSearch(query);
  }
  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="border-2 rounded-full pl-4 pr-10 py-2 w-1/2 focus:outline-none focus:border-blue-300 shadow-md"
      />
    <button type="submit" className="w-20">
      <img src={SearchBtn} alt="search"/>
    </button>
    </form>
  );
}

export default Search;