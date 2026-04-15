import { useEffect } from "react";
import FormSignIn from "../components/Form/FormSignIn"; // Form component sign-in

const SignIn = () => {
  return (
    <section aria-labelledby="sign-in-title" className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon" aria-hidden="true"></i>
      <h1 id="sign-in-title">Sign In</h1>
      <FormSignIn />
    </section>
  );
};

export default SignIn;
