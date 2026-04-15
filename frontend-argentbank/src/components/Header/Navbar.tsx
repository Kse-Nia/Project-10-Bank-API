import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/userSlice";
import logo from "../../assets/argentBankLogo.png";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          {token ? (
            <button type="button" className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-user-circle"></i>
              Sign Out
            </button>
          ) : (
            <Link className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
