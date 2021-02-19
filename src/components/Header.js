import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.png"
import { GlobalContext } from "../context/GlobalState";
import useOutsideClick from "./hooks/useOutsideClick";


export const Header = () => {
    const [menuActive, setMenuActive] = useState(false)
    const {watchlist, watched} = useContext(GlobalContext)
    const ref = useRef()

    const onMenuClick = () => {
        setMenuActive(prev => !prev)
    }

    const onScrollTop = () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' })
      }

    useOutsideClick(ref, ()=>{
        setMenuActive(false)
    })



    return (
      <header ref={ref}>
        <div className="inner-content">
          <div className="brand">
            <Link to="/">
              <img className="logo" alt="logo" src={logo} />
              <span>Moovle</span>
            </Link>
          </div>

          <ul className={`nav-links ${menuActive && "active"}`}>
            <li>
              <Link to="/" onClick={()=> setMenuActive(false)}>
                <div className="nav-link">
                  <i className="fas fa-video"></i>
                  <span>Movies</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/watchlist" onClick={()=> setMenuActive(false)}>
                <div className="nav-link">
                  <i className="fas fa-eye"></i>
                  <span>Watch List</span>
                </div>
                <div className="count">{watchlist.length}</div>
              </Link>
            </li>
            <li>
              <Link to="/watched" onClick={()=> setMenuActive(false)}>
                <div className="nav-link">
                  <i className="fas fa-eye-slash"></i>
                  <span>Watched</span>
                </div>
                <div className="count">{watched.length}</div>
              </Link>
            </li>
          </ul>
          <i className="fas fa-bars" onClick={onMenuClick}></i>
        </div>
        <i className={"fas fa-chevron-up top"} onClick={onScrollTop}></i>
      </header>
    );
}
