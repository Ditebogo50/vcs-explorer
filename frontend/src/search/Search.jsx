import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


axios.defaults.baseURL = "http://localhost:3001";

const SearchResults = ({ results }) => {
  return (
    <ul className="p-2">
      {results.map((result, index) => (
        <li
          className="flex place-items-center border-b border-b-slate-100 py-2"
          key={index}
        >
          <img className="w-10 h-10 rounded-full mx-2" src={result.avatar_url} />
          <Link to={`user/${result.username}`}>{result.username}</Link>
        </li>
      ))}
    </ul>
  );
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?username=${searchTerm}`);
      setSearchResults(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const reset = () => {
    setSearchTerm("");
    setSearchResults([]);
  }

  return (
    <div>
      <div className="p-2 bg-slate-100 flex">
        <input
          className="border border-slate-800 px-2"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="mx-2 px-2 border border-slate-900" onClick={handleSearch}>Search</button>

        <div onClick={reset} className="cursor-pointer text-red-500 border border-red-500 p-2">Clear</div>
      </div>
      <SearchResults results={searchResults} />
    </div>
  );
};

export default Search;
