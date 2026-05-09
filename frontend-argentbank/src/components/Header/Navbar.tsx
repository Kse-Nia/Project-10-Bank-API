import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/userSlice"; // Import the logout action slice
import logo from "../../assets/argentBankLogo.png";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, userInfo } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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
            <>
              <Link className="main-nav-item" to="/profile">
                <i className="fa fa-user-circle"></i>
                {userInfo?.firstName || "User"}
              </Link>
              <button
                type="button"
                className="main-nav-item"
                onClick={handleLogout}
              >
                <i className="fa fa-sign-out"></i>
                Sign Out
              </button>
            </>
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
