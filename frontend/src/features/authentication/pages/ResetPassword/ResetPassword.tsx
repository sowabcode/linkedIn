import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../components/Layout/Layout";

import classes from "./ResetPassword.module.scss";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Box } from "../../components/Box/Box";

export function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sendPasswordResetToken = async (email: string) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/authentication/send-password-reset-token?email=${email}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setErrorMessage("");
        setEmailSent(true);
        return;
      }
      const { message } = await response.json();
      setErrorMessage(message);
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (
    email: string,
    code: string,
    password: string
  ) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/authentication/reset-password?email=${email}&token=${code}&newPassword=${password}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setErrorMessage("");
        navigate("/login");
      }
      const { message } = await response.json();
      setErrorMessage(message);
    } catch (error) {
      console.log(error);
      setErrorMessage("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className={classes.root}>
      <Box>
        <h1>Reset Password</h1>

        {!emailSent ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              const email = e.currentTarget.email.value;
              await sendPasswordResetToken(email);
              setEmail(email);
              setIsLoading(false);
            }}
          >
            <p>
              Enter your email and we'll send a verification code if it matches
              an existing LinkedIn account.
            </p>

            <Input type="email" id="email" label="Email" />

            <p style={{ color: "red" }}>{errorMessage}</p>

            <Button type="submit" disabled={isLoading}>
              Next
            </Button>
            <Button
              outline
              type="button"
              disabled={isLoading}
              onClick={() => {
                navigate("/login");
              }}
            >
              Back
            </Button>
          </form>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              const code = e.currentTarget.code.value;
              const password = e.currentTarget.password.value;
              await resetPassword(email, code, password);
              setIsLoading(false);
            }}
          >
            <p>
              Enter the verification code we sent to your email and you new
              password.
            </p>

            <Input
              type="text"
              id="code"
              label="Verification code"
              name="code"
              key="code"
            />
            <Input
              type="password"
              id="password"
              label="New password"
              name="password"
              key="password"
            />
            <p style={{ color: "red" }}>{errorMessage}</p>
            <Button type="submit" disabled={isLoading}>
              Reset Password
            </Button>
            <Button
              type="button"
              disabled={isLoading}
              outline
              onClick={() => {
                setErrorMessage("");
                setEmailSent(false);
                // navigate("/login");
              }}
            >
              Back
            </Button>
          </form>
        )}
      </Box>
    </Layout>
  );
}
