
import "./Header.scss";
import Navbar from "../Navbar/Navbar";
import { useTheme } from "../../hooks/useTheme";

const Header = () => {
    const { theme } = useTheme();
    return (
        <header className="header dark:bg-blue-900 dark:text-white p-1">
            <Navbar/>
        </header>
    )
}

export default Header