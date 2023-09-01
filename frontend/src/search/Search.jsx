import React, { useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

const SearchResults = ({ results }) => {
  return (
    <ul class="p-2">
      {results.map((result, index) => (
        <li
          class="flex place-items-center border-b border-b-slate-100 py-2"
          key={index}
        >
          <img class="w-10 h-10 rounded-full mx-2" src={result.avatar_url} />
          {result.username}
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
      <div class="p-2 bg-slate-100 flex">
        <input
          class="border border-slate-800 px-2"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button class="mx-2 px-2 border border-slate-900" onClick={handleSearch}>Search</button>

        <div onClick={reset} class="cursor-pointer text-red-500 border border-red-500 p-2">Clear</div>
      </div>
      <SearchResults results={searchResults} />
    </div>
  );
};

export default Search;
