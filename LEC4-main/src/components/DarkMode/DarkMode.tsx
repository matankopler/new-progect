
import { useTheme } from '../../hooks/useTheme';
import { FaMoon, FaSun } from 'react-icons/fa';
import styles from "./DarkMode.module.scss";

const DarkMode = () => {
    const { theme, toggle } = useTheme();

    return (
        <button className={`${styles["toggle"]} ${styles[theme]} mb-5`} onClick={toggle}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
    );
};

export default DarkMode;