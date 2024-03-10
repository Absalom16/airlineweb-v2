import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to backend
    console.log(formData);
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
              value={formData.username}
              onChange={handleChange}
            />
            <br />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
