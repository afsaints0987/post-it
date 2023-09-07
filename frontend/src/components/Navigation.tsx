import React from 'react'
import { NavLink, Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import {UserContext} from "../context/UserContext"
import { useLogout } from '../hooks/useLogout';
import Dropdown from 'react-bootstrap/Dropdown'
import Searchbar from './Searchbar';
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
      <Searchbar/>
      <>
        {state.isAuthenticated ? (
          <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" variant="transparent" className="border-0">
            {state.username}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="d-flex flex-column text-center">
              <Link to='/profile' className="text-decoration-none text-dark" id="profile">Profile</Link>
              <span className="text-dark text-decoration-none" id="logout" onClick={handleLogout}>
                Logout
              </span>
            </div>
          </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <Link
              to="/login"
              className="text-dark mx-2 text-decoration-none"
              id="login"
            >
            <AiIcons.AiOutlineLogin className="mx-2"/>
              Login
            </Link>
          </>
        )}
      </>
    </header>
  );
};

export default Navigation;
