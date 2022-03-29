import React, { useEffect, useState } from "react";

const Search = () => {

    const [searchValue, setSearchValue] = useState();

    const handleSearch = () => {

    }

    return (

        <form onSubmit={handleSearch} action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden">Search PurdueCircle</span>
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="Search PurdueCircle"
                name="s"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search;