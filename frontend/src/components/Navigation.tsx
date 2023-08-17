import React from 'react'
import { NavLink } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import {UserContext} from "../context/UserContext"
import "../components/Navigation.scss";

const Navigation: React.FC = () => {
  const {state, dispatch} = React.useContext(UserContext)
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
  }
  return (
    <header className="d-flex justify-content-between px-4 py-2 align-items-center shadow-sm bg-light mb-3 sticky-top">
      <nav className="navbar navbar-expand-lg">
        <NavLink to="/" className="text-decoration-none">
          <h3 id="logo" className="text-danger">
            Post it <AiIcons.AiFillPushpin />
          </h3>
        </NavLink>
      </nav>
      <div>
        {state.isAuthenticated ? (
          <>
            <AiIcons.AiOutlineLogout />
            <span className="text-dark mx-2 text-decoration-none" onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
          <>
            <AiIcons.AiOutlineLogin />
            <NavLink
              to="/login"
              className="text-dark mx-2 text-decoration-none"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navigation;
