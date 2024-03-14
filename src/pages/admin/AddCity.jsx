import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { addCity } from "../../utilities/helpers.js";

const AddCity = () => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [isAdded, setIsAdded] = useState({ added: false });

  const handleChange = (e) => {
    setServerError("");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsAdded({
      added: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "City name is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false); // Set loading to false when validation fails
      return;
    }

    // Handle form submission
    addCity(formData, (data) => {
      setLoading(false);
      if (data.status === 409) {
        setServerError("City already exists.");
      } else {
        setIsAdded({
          added: true,
          message: "Added successfully.",
        });
      }
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ marginTop: "2%", marginBottom: "2%" }}
    >
      <Card elevation={20}>
        <CardContent>
          <Typography component="h1" variant="h5">
            Add City
          </Typography>{" "}
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Add
            </Button>
          </form>
          <span style={{ color: "red" }}>
            {serverError !== "" && serverError}
          </span>
          <span style={{ color: "green" }}>
            {isAdded.added && isAdded.message}
          </span>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddCity;
