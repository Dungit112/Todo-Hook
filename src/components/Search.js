import React from "react";
import "./Search.css";

const Search = ({searchForm}) => {
  
  return (
    <div>
      <form className="SearchForm">
        <label>Search</label>
        <input placeholder="Search" onChange={(e) => searchForm(e)} />
      </form>
    </div>
  );
};

export default Search;
