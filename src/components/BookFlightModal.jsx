import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import Seats from "./Seats";
import { bookFlight } from "../utilities/helpers";

const BookFlightModal = ({ open, close, flight }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedClass, setSelectedClass] = useState("");
  const [passengerQuantity, setPassengerQuantity] = useState(1);
  const [passengers, setPassengers] = useState("");
  const [seats, setSeats] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [isAdded, setIsAdded] = useState({ added: false });

  const { email, username, phoneNumber } = useSelector(
    (store) => store.user.user
  );

  const cost =
    (selectedClass === "first"
      ? flight.firstClassCost
      : selectedClass === "business"
      ? flight.businessClassCost
      : flight.economyClassCost) * passengerQuantity;

  const data = [
    { question: "Which class are you booking?", inputType: "menuSelect" },
    { question: "How many passengers?", inputType: "numberInput" },
    {
      question: "Input names of each passenger.",
      inputType: "multipleTextInputs",
    },
    {
      question: "Select seats for each passenger.",
      inputType: "multipleNumberInputs",
    },
    {
      question: `Do you agree to pay ksh ${cost}?`,
      inputType: "button",
    },
  ];

  const bookData = {
    selectedClass,
    passengerQuantity,
    passengers: passengers,
    seats: seats.map((obj) => obj.tag).join(","),
    cost,
    origin: flight.origin,
    destination: flight.destination,
    date: flight.departureDate,
    time: flight.departureTime,
    aircraft: flight.aircraft,
    email: email,
    username: username,
    phoneNumber: phoneNumber,
    flightNumber: flight.id,
    status: "DUE",
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? data.length - 1 : prevSlide - 1
    );
  };

  const handleClose = () => {
    close(false);
    // setSelectedFlight("");
  };

  const handleSubmit = () => {
    setLoading(true);

    if (Number(passengerQuantity) !== passengers?.split(",").length) {
      setErrors([
        ...errors,
        "The passenger quantity does not match the entered passengers.",
      ]);
    } else if (selectedClass === "") {
      setErrors([...errors, "Class cannot be null."]);
    } else if (seats.length !== passengers.split(",").length) {
      setErrors([
        ...errors,
        "The seats quantity does not match passenger quantity.",
      ]);
    } else {
      bookFlight(bookData, (data) => {
        if (data) {
          setLoading(false);
          setIsAdded({
            added: true,
            message: "Success.",
          });
          setTimeout(() => {
            close(false);
          }, 2000);
        }
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modal Slideshow</DialogTitle>
      <DialogContent>
        {/* Display current slide */}
        <div>
          {data[currentSlide].question} <br />
          {data[currentSlide].inputType == "menuSelect" ? (
            <>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedClass}
                label="Class"
                onChange={(e) => {
                  setErrors([]);
                  setSelectedClass(e.target.value);
                }}
                fullWidth
              >
                <MenuItem value={"first"}>First</MenuItem>
                <MenuItem value={"business"}>Business</MenuItem>
                <MenuItem value={"economy"}>Economy</MenuItem>
              </Select>
            </>
          ) : data[currentSlide].inputType == "numberInput" ? (
            <TextField
              id="passengerQuantity"
              type="number"
              label="Passenger Quantity"
              variant="outlined"
              value={passengerQuantity}
              inputProps={{ min: 1 }}
              onChange={(e) => {
                setErrors([]);
                setPassengerQuantity(e.target.value);
              }}
              fullWidth
              margin="normal"
            />
          ) : data[currentSlide].inputType == "multipleTextInputs" ? (
            <TextField
              id="passengers"
              type="text"
              label="Passengers"
              variant="outlined"
              value={passengers}
              placeholder="eg. joe, mark, bob"
              onChange={(e) => {
                setErrors([]);
                setPassengers(e.target.value);
              }}
              fullWidth
              margin="normal"
            />
          ) : data[currentSlide].inputType == "multipleNumberInputs" ? (
            <Box>
              <Seats
                seats={seats}
                setSeats={setSeats}
                aircraftName={flight.aircraft}
                classe={selectedClass}
              />
            </Box>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          )}
          <br />
          {errors.length > 0 && (
            <span style={{ color: "red" }}>{errors.join(",")}</span>
          )}
          <span style={{ color: "green" }}>
            {isAdded.added && isAdded.message}
          </span>
        </div>
        {/* Buttons for navigating slides */}
        {data.indexOf(data[currentSlide]) != 0 && (
          <Button onClick={handlePrevSlide}>Previous</Button>
        )}
        {data.indexOf(data[currentSlide]) != data.length - 1 && (
          <Button onClick={handleNextSlide}>Next</Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookFlightModal;
