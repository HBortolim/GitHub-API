import { Link } from "react-router-dom";

import './styles.css';

const Navbar = () => {
  return (
    <nav className="navbar main-nav navbar-light bg-primary">
      <Link to="/" className="nav-logo-text">
        <h4 className="nav-title">GitHub API</h4>
      </Link>
    </nav>
  );
};

export default Navbar;
