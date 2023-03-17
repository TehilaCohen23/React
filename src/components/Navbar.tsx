import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
  isLogin: boolean;
  isLoggedIn: boolean;
  isBusinessUser: boolean;
  setIsBusinessUser: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({
  isLogin,
  isBusinessUser,
}) => {
  let navigate = useNavigate();

  function isLogout() {
    navigate("/");
    sessionStorage.removeItem("IsLogin");
    sessionStorage.removeItem("isSignUp");
    localStorage.setItem("isLoggedIn", String(false));
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-success bg-opacity-50">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <NavLink className="navbar-brand" to="#">
            MBC <i className="fa-solid fa-id-card-clip"></i>
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              {!isLogin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-in">
                    Sign in
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}

              {!isLogin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/sign-up">
                    Sign up
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}

              {!isLogin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/business-sign-up">
                    Business
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}

              {isLogin ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/allCards">
                    All cards
                  </NavLink>
                </li>
              ) : (
                <small></small>
              )}

              {isLogin === false ||
              (isLogin === true && isBusinessUser === false) ? (
                <small></small>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/myCards">
                    My cards
                  </NavLink>
                </li>
              )}

              {isLogin === false ||
              (isLogin === true && isBusinessUser === false) ? (
                <small></small>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/newCard">
                    New card
                  </NavLink>
                </li>
              )}
            </ul>

            <form className="d-flex" role="search">
              {isLogin === false ? (
                <button
                  className="btn btn-outline-success bg-opacity-10 logout"
                  type="submit"
                  disabled={isLogin === false}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="btn btn-outline-light bg-opacity-25 logout"
                  type="submit"
                  onClick={() => isLogout()} //disabled={isLogin === false}
                >
                  Logout
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
