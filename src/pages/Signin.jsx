import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { signin } from "../utilities/helpers.js";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator

  const signinData = {
    email: email,
    password: password,
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    const errors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false); // Set loading to false when validation fails
      return;
    }

    signin(signinData, (data) => {
      if (data.length < 1) {
        //user does not exist
        setServerError("User does not exist.");
        setLoading(false);
      } else {
        setLoading(false);
        if (data[0].rank == "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/client");
        }
      }
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Card elevation={20}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email}
              type="email"
              value={signinData.email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  email: "",
                }));
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password}
              type="password"
              value={signinData.password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  password: "",
                }));
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Sign In
            </Button>
          </form>
          <span style={{ color: "red" }}>
            {serverError !== "" && serverError}
          </span>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signin;
