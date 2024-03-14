import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { signup } from "../utilities/helpers.js";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [isRegistered, setIsRegistered] = useState({ registered: false });

  const signupData = {
    username: username,
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    rank: "CLIENT",
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false); // Set loading to false when validation fails
      return;
    }

    signup(signupData, (data) => {
      if (data.status === 409) {
        //already exists
        setServerError("Email already exists.");
        setLoading(false);
      } else {
        //success
        setIsRegistered({
          registered: true,
          message: "Registered successfully, you can now log in.",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        setLoading(false);
      }
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Card elevation={20}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Signup
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors.username}
              value={signupData.username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  username: "",
                }));
              }}
            />
            <br />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email}
              type="email"
              value={signupData.email}
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
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password}
              type="password"
              value={signupData.password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  password: "",
                }));
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              autoComplete="phoneNumber"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              type="tel"
              value={signupData.phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  phoneNumber: "",
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
              Sign Up
            </Button>
          </form>
          <span style={{ color: "red" }}>
            {serverError !== "" && serverError}
          </span>
          <span style={{ color: "green" }}>
            {isRegistered.registered && isRegistered.message}
          </span>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
