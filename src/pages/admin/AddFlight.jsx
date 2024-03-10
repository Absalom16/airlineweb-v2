import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const AddFlight = () => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    arrivalDate: "",
    departureTime: "",
    arrivalTime: "",
    aircraft: "",
    firstClassCost: "",
    businessClassCost: "",
    economyClassCost: "",
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
    console.log(formData);
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
            Add Flight
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="origin"
              label="Origin"
              value={formData.origin}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="destination"
              label="Destination"
              value={formData.destination}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="departureDate"
              label="Departure Date"
              type="date"
              value={formData.departureDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="arrivalDate"
              label="Arrival Date"
              type="date"
              value={formData.arrivalDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="departureTime"
              label="Departure Time"
              type="time"
              value={formData.departureTime}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="arrivalTime"
              label="Arrival Time"
              type="time"
              value={formData.arrivalTime}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="aircraft"
              label="Aircraft"
              value={formData.aircraft}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="firstClassCost"
              label="First classs cost"
              type="number"
              value={formData.firstClassCost}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="businessClassCost"
              label="Business class cost"
              type="number"
              value={formData.businessClassCost}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="economyClassCost"
              label="Economy class cost"
              type="number"
              value={formData.economyClassCost}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {/* Add other fields similarly */}
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddFlight;
