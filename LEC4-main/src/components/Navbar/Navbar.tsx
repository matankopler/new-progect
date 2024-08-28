import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import DarkMode from '../DarkMode/DarkMode';
import "./Navbar.scss";
import Search from '../Search';

const Navbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate()
    return (
        <nav className='site-nav p-5'>
            <div className='nav-left'>
                <NavLink to="/" className="brand">
                    Home
                    <FaHome className='mt-2' />
                </NavLink>
            </div>

            <div className='nav-right'>
                <Search />
                {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
                {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
                {isLoggedIn && <NavLink to="/FavCards">FavCards</NavLink>}
                {isLoggedIn && <NavLink to="/CreateCard">CreateCard</NavLink>}
                {isLoggedIn && <NavLink to="/MyCards">MyCards</NavLink>}
                {isLoggedIn && <button onClick={() => {
                    logout();
                    navigate("/");
                }} className='pb-5'>Logout</button>}
                <DarkMode />
            </div>
        </nav>
    )
}

export default Navbar