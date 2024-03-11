import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { addAircraft } from "../../utilities/helpers.js";

const AddAircraft = () => {
  const [formData, setFormData] = useState({
    name: "",
    firtClassCapacity: "",
    businessClassCapacity: "",
    economyClassCapacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    addAircraft(formData);
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
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="firstClassCapacity"
              label="First class capacity"
              value={formData.firstClassCapacity}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="businessClassCapacity"
              label="Business class capacity"
              value={formData.businessClassCapacity}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="economyClassCapacity"
              label="Economy class capacity"
              value={formData.economyClassCapacity}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddAircraft;
