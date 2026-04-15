import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchUserProfile } from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const FormSignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if email and password are provided
    if (!email || !password) {
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      await dispatch(fetchUserProfile());

      if (staySignedIn) {
        localStorage.setItem("staySignedIn", "true");
      } else {
        localStorage.removeItem("staySignedIn");
      }

      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="input-remember">
          <input
            type="checkbox"
            id="remember-me"
            name="rememberMe"
            checked={staySignedIn}
            onChange={(event) => setStaySignedIn(event.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        {error && (
          <p className="error-message" role="alert" aria-live="polite">
            {error}
          </p>
        )}
        <button type="submit" className="sign-in-button" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default FormSignIn;
