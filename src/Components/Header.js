import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="centered">
      {/* site Title */}
      <h1 className="header-font beige-font big-font">
        GAME
        <span style={{ color: "var(--red)" }}>4</span>
        ALL
      </h1>

      {/* navigation Menu */}
      <aside className="dropdown">
        <button>
          <img src="images/nav-bar.png" alt="Navigation Menu" />
        </button>
        <nav className="dropdown-content">
          <div className="beige-font subheader-font medium-font">
            <ul>
              <Link to="/homepage" className="nav-link">
                PLAY
              </Link>
              <br />
              <Link to="/setup" className="nav-link">
                SETUP
              </Link>
              <br />
              <Link to="/about" className="nav-link">
                ABOUT
              </Link>
              <br />
              <Link to="" className="nav-link">
                SETTINGS
              </Link>
            </ul>
          </div>
        </nav>
      </aside>
    </header>
  );
};

export default Header;
