import React from 'react';

const Search = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search PurdueCircle</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search PurdueCircle"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);

export default Search;