const Form = () => {
  return (
    <div>
      <form>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <a href="./user.html" className="sign-in-button">
          Sign In
        </a>
        <button className="sign-in-button">Sign In</button>
      </form>
    </div>
  );
};

export default Form;
