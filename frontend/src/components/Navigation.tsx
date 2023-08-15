import { NavLink } from "react-router-dom"
import * as AiIcons from 'react-icons/ai'
import "../components/Navigation.scss"

interface NavProps {
    showLogout?: boolean
}

const Navigation: React.FC<NavProps> = ({showLogout}) => {
  return (
    <header className="d-flex justify-content-between px-3 py-2 align-items-center">
        <nav className="navbar navbar-expand-lg">
            <h2 id="logo" className="text-danger">Post it</h2>
        </nav>
        {showLogout && (
        <div>
            <AiIcons.AiOutlineLogout/>
            <NavLink to="/" className="text-dark mx-2 text-decoration-none">Logout</NavLink>
        </div>
        )}
    </header>
  )
}

export default Navigation