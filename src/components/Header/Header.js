import { Link } from "react-router-dom";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.Header}>
      <Link to="/current" className={classes.link}>
        Текущие курсы валют
      </Link>
      <Link to="/converter" className={classes.link}>
        Конвертер валют
      </Link>
    </div>
  );
};

export default Header;
