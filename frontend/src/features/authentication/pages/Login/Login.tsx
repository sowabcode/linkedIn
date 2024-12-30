import { FormEvent, useState } from "react";
import { Box } from "../../components/Box/Box";
import { Input } from "../../components/Input/Input";
import { Layout } from "../../components/Layout/Layout";
import classes from "./Login.module.scss";
import { Button } from "../../components/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Seperator } from "../../components/Seperator/Seperator";
import { useAuthentication } from "../../context/AuthenticationContextProvider";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuthentication();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const doLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    console.log("loginInfo", email, password);

    try {
      await login(email, password);
      const destination = location.state?.from || "/";
      navigate(destination);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className={classes.root}>
      <Box>
        <h1>Sign in</h1>
        <p>Stay updated on your professional world.</p>

        <form onSubmit={doLogin}>
          <Input
            id="email"
            type="email"
            label="Email"
            // size="medium"
            onFocus={() => setErrorMessage("")}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            // size="medium"
            onFocus={() => setErrorMessage("")}
          />

          {errorMessage && <p className={classes.error}>{errorMessage}</p>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "..." : "Sign in"}
          </Button>
          <Link to="/request-password-reset">Forgot password?</Link>
        </form>

        <Seperator>Or</Seperator>

        <div className={classes.register}>
          New to LinkedIn? <Link to="/signup">Join now</Link>
        </div>
      </Box>
    </Layout>
  );
}
