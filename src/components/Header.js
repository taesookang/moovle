import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.png"


export const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/"><img className="logo" src={logo}/>Moovle</Link>
                    </div>

                    <ul className="nav-links">
                        <li>
                            <Link to="/">
                                Movies
                            </Link>
                        </li>
                        <li>
                            <Link to="/watchlist">Watch List</Link>
                        </li>
                        <li>
                            <Link to="/watched">Watched</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
