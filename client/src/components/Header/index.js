import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Search,
  Watch,
  Messenger,
  Notifications,
  ArrowDown,
  Home,
  FriendsActive,
} from "../../svg";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import useClickOutSide from "../../hooks/useClickOutSide";
import UserMenu from "./UserMenu";

function Header({ page, getPosts }) {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#65676b";

  const [showSearchMenu, setShowSearchMenu] = useState(false);

  const [showAllMenu, setShowAllMenu] = useState(false);
  const allMenu = useRef(null);
  useClickOutSide(allMenu, () => {
    setShowAllMenu(false);
  });

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenu = useRef(null);
  useClickOutSide(userMenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      <div className="header_left">
        <Link to="/" className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div
          className="search search1"
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}

      <div className="header_middle">
        <Link
          to="/"
          className={`middle_icon ${page === "home" ? "active" : "hover1"}`}
          // onClick={() => getPosts()}
        >
          {page === "home" ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link to="/friends" className="middle_icon hover1">
          {page === "friends" ? <FriendsActive /> : <Friends color={color} />}
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Watch color={color} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to="/" className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>

      <div className="header_right">
        <Link
          to="/profile"
          className={`profile_link hover1 ${
            page === "profile" ? "active_link" : ""
          }`}
        >
          <img src={user?.picture} alt="" />
          <span>{user?.last_name}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && "active_header"}`}
          ref={allMenu}
        >
          <div
            onClick={() => {
              setShowAllMenu(!showAllMenu);
            }}
          >
            <div style={{ transform: "translateY(2px)" }}>
              <Menu />
            </div>
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1">
          <Messenger />
        </div>
        <div className="circle_icon hover1">
          <Notifications />
          <div className="right_notification">5</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && "active_header"}`}
          ref={userMenu}
        >
          <div onClick={() => setShowUserMenu(!showUserMenu)}>
            <div style={{ transform: "translateY(2px)" }}>
              <ArrowDown />
            </div>
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}

export default Header;
