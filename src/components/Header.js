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

    const menus = [
      {
        title: "Movies",
        icon: "fas fa-video",
        count: null,
        link: "/"
      },
      {
        title: "Watchlist",
        icon: "fas fa-eye",
        count: watchlist.length,
        link: "/watchlist"
      },
      {
        title: "Watched",
        icon: "fas fa-eye-slash",
        count: watched.length,
        link: "/watched"
      }
    ]

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
            {menus.map((menu) => (
              <li key={menu.title}>
              <Link to={menu.link} onClick={()=> setMenuActive(false)}>
                <div className="nav-link">
                  <i className={menu.icon}></i>
                  <span>{menu.title}</span>
                </div>
                {menu.count !== null && <div className="count">{menu.count}</div>}
              </Link>
            </li>
            ))}
          </ul>
          <i className="fas fa-bars" onClick={onMenuClick}></i>
        </div>
        <i className={"fas fa-chevron-up top"} onClick={onScrollTop}></i>
      </header>
    );
}
