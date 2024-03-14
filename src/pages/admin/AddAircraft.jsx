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
import { addAircraft } from "../../utilities/helpers.js";

const AddAircraft = () => {
  const [formData, setFormData] = useState({
    name: "",
    firstClassCapacity: "",
    businessClassCapacity: "",
    economyClassCapacity: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [isAdded, setIsAdded] = useState({ added: false });

  const handleChange = (e) => {
    setServerError("");
    setIsAdded({ added: false });
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Aircraft name is required";
    }
    if (!formData.firstClassCapacity.trim()) {
      errors.firstClassCapacity = "First class capacity is required";
    }
    if (!formData.businessClassCapacity.trim()) {
      errors.businessClassCapacity = "Business class capacity is required";
    }
    if (!formData.economyClassCapacity.trim()) {
      errors.economyClassCapacity = "Economy class capacity is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false); // Set loading to false when validation fails
      return;
    }

    // Handle form submission
    addAircraft(formData, (data) => {
      setLoading(false);
      if (data.status === 409) {
        setServerError("Aircraft already exists.");
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
            Add Aircraft
          </Typography>
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
            <TextField
              name="firstClassCapacity"
              type="number"
              label="First class capacity"
              value={formData.firstClassCapacity}
              error={!!errors.firstClassCapacity}
              helperText={errors.firstClassCapacity}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="businessClassCapacity"
              type="number"
              label="Business class capacity"
              value={formData.businessClassCapacity}
              error={!!errors.businessClassCapacity}
              helperText={errors.businessClassCapacity}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="economyClassCapacity"
              type="number"
              label="Economy class capacity"
              value={formData.economyClassCapacity}
              error={!!errors.economyClassCapacity}
              helperText={errors.economyClassCapacity}
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

export default AddAircraft;
