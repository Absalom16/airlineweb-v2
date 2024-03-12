import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { addFlight, getCities, getAircrafts } from "../../utilities/helpers.js";

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
  const [cities, setCities] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);

  useEffect(() => {
    getCities((data) => {
      setCities(data);
    });
    getAircrafts((data) => {
      setAircrafts(data);
    });
  }, []);

  console.log(cities);

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
    addFlight(formData);
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
            <>
              <InputLabel id="demo-simple-select-label">Origin</InputLabel>
              <Select
                name="origin"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.origin}
                label="Origin"
                onChange={handleChange}
                fullWidth
              >
                {cities.map((city, index) => {
                  return (
                    <MenuItem value={city.name} key={index}>
                      {city.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </>

            <>
              <InputLabel id="demo-simple-select-label">Destination</InputLabel>
              <Select
                name="destination"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.destination}
                label="Destination"
                onChange={handleChange}
                fullWidth
              >
                {cities.map((city, index) => {
                  return (
                    <MenuItem value={city.name} key={index}>
                      {city.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </>
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

            <>
              <InputLabel id="demo-simple-select-label">Aircraft</InputLabel>
              <Select
                name="aircraft"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.aircraft}
                label="Aircraft"
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {aircrafts.map((aircraft, index) => {
                  return (
                    <MenuItem value={aircraft.name} key={index}>
                      {aircraft.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </>
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
