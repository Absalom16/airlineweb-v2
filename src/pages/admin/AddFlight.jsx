import { useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { addFlight } from "../../utilities/helpers.js";
import { useSelector } from "react-redux";

const AddFlight = () => {
  const aircrafts = useSelector((store) => store.aircrafts.aircrafts);
  const cities = useSelector((store) => store.cities.cities);

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
    status: "ACTIVE",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [isAdded, setIsAdded] = useState({ added: false });

  const handleChange = (e) => {
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
    if (!formData.origin.trim()) {
      errors.origin = "Origin is required";
    }
    if (!formData.destination.trim()) {
      errors.destination = "Destination is required";
    }
    if (formData.destination === formData.origin) {
      errors.destination = "Destination cannot be same as origin.";
    }
    if (!formData.departureDate.trim()) {
      errors.departureDate = "Departure date is required";
    }
    if (!formData.arrivalDate.trim()) {
      errors.arrivalDate = "Arrival date is required";
    }
    if (formData.arrivalDate < formData.departureDate) {
      errors.arrivalDate = "Arrival date cannot be earlier than departure date";
    }
    if (!formData.departureTime.trim()) {
      errors.departureTime = "Departure time is required";
    }
    if (!formData.arrivalTime.trim()) {
      errors.arrivalTime = "Arrival time is required";
    }
    if (
      formData.arrivalDate === formData.departureDate &&
      formData.arrivalTime < formData.departureTime
    ) {
      errors.arrivalTime = "Arrival time cannot be earlier than departure time";
    }
    if (!formData.aircraft.trim()) {
      errors.aircraft = "Aircraft is required";
    }
    if (!formData.firstClassCost.trim()) {
      errors.firstClassCost = "First class cost is required";
    }
    if (!formData.businessClassCost.trim()) {
      errors.businessClassCost = "Business class cost is required";
    }
    if (!formData.economyClassCost.trim()) {
      errors.economyClassCost = "Economy class cost is required";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false); // Set loading to false when validation fails
      return;
    }

    addFlight(formData, () => {
      setLoading(false);
      setIsAdded({
        added: true,
        message: "Added successfully.",
      });
    });
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        paddingTop: {
          xs: "10%",
          sm: "6%",
          lg: "6%",
        },
        paddingBottom: {
          xs: "10%",
          sm: "6%",
          lg: "6%",
        },
      }}
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
                error={!!errors.origin}
                helperText={errors.origin}
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
                error={!!errors.destination}
                helperText={errors.destination}
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
              error={!!errors.departureDate}
              helperText={errors.departureDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().split("T")[0],
              }}
            />
            <TextField
              name="arrivalDate"
              label="Arrival Date"
              type="date"
              value={formData.arrivalDate}
              error={!!errors.arrivalDate}
              helperText={errors.arrivalDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().split("T")[0],
              }}
            />
            <TextField
              name="departureTime"
              label="Departure Time"
              type="time"
              value={formData.departureTime}
              error={!!errors.departureTime}
              helperText={errors.departureTime}
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
              error={!!errors.arrivalTime}
              helperText={errors.arrivalTime}
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
                error={!!errors.aircraft}
                helperText={errors.aircraft}
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
              error={!!errors.firstClassCost}
              helperText={errors.firstClassCost}
              inputProps={{ min: 1 }}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="businessClassCost"
              label="Business class cost"
              type="number"
              value={formData.businessClassCost}
              error={!!errors.businessClassCost}
              helperText={errors.businessClassCost}
              inputProps={{ min: 1 }}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="economyClassCost"
              label="Economy class cost"
              type="number"
              value={formData.economyClassCost}
              error={!!errors.economyClassCost}
              helperText={errors.economyClassCost}
              inputProps={{ min: 1 }}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {/* Add other fields similarly */}
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
          <span style={{ color: "green" }}>
            {isAdded.added && isAdded.message}
          </span>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddFlight;
