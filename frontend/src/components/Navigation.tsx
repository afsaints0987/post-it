import React from 'react'
import { NavLink } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import {UserContext} from "../context/UserContext"
import { useLogout } from '../hooks/useLogout';
import "../components/Navigation.scss";

const Navigation: React.FC = () => {
  const {logout} = useLogout()
  const {state} = React.useContext(UserContext)
  const handleLogout = async () => {
    await logout()
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
            <span className="text-dark mx-2 text-decoration-none" id="logout" onClick={handleLogout}>
              <AiIcons.AiOutlineLogout className="mx-2"/>
              Logout
            </span>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="text-dark mx-2 text-decoration-none"
              id="login"
            >
            <AiIcons.AiOutlineLogin className="mx-2"/>
              Login
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navigation;
