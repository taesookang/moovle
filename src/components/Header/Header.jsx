import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { CgSearch, CgHeart } from "react-icons/cg";
import { RiHome2Line } from "react-icons/ri";
import { QueryContext } from "../../context/QueryContext";
import { WatchlistContext } from "../../context/WatchlistContext";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { query, setQuery } = useContext(QueryContext);
  const { watchlist } = useContext(WatchlistContext);
  const isTyping = query !== "";
  const history = useHistory();

  const handleSearchClick = () => {
    history.push("/");
    setSearchOpen((prev) => !prev);

    // reset value of search input text to empty string when search bar is closed.
    const emptyInputValue = () => {
      setQuery("");
    };
    searchOpen && emptyInputValue();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const refreshHome = () => {
    window.location.href="/";
  }

  return (
    <div className="header">
      <div className="header__container">
        <Link to="/" onClick={refreshHome}>
          <div className="logo">
            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="" />
            <h2>Moovle</h2>
          </div>
        </Link>
        <div className="menu">
          <div className={`menu__search ${searchOpen && "open"}`}>
            <CgSearch onClick={handleSearchClick} />
            <input
              className="menu__search__input"
              type="text"
              value={query}
              onChange={handleChange}
            />
            <div className={`menu__search__cancel ${isTyping && "visible"}`} onClick={() => setQuery("")}>&#10005;</div>
          </div>
          <Link to="/" onClick={refreshHome}>
            <div className="menu__home">
              <RiHome2Line />
            </div>
          </Link>
          <Link to="/watchlist" onClick={() => setSearchOpen(false)}>
            <div className="menu__watchlist">
              <CgHeart />
              <div className="indicator">{watchlist.length}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
