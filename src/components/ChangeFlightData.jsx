import { useState } from "react";
import {
  Card,
  CardContent,
  Container,
  Box,
  Modal,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Seats from "./Seats";

const ChangeFlightData = ({ open, close, changeData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [passengerQuantity, setPassengerQuantity] = useState(0);
  const [passengers, setPassengers] = useState("");
  const [seats, setSeats] = useState([]);
  const [oldPassengers, setOldPassengers] = useState("");
  const [newPassengers, setNewPassengers] = useState("");
  const [newClass, setNewClass] = useState("");
  const [oldSeats, setOldSeats] = useState("");
  const [deletedPassenger, setDeletedPassenger] = useState("");

  let data = [];

  const addPassengerData = {
    passengerQuantity,
    passengers,
    seats,
  };

  const changePassengerData = {
    passengerQuantity,
    oldPassengers,
    newPassengers,
  };

  const changeClassData = {
    newClass,
    seats,
  };

  const changeSeatsData = {
    oldSeats,
    seats,
  };

  const deletePassengerData = {
    deletedPassenger,
  };

  const handleClose = () => {
    close(false);
    setCurrentSlide(0);
    setPassengerQuantity(0);
    setPassengers("");
    setSeats([]);
    setOldPassengers("");
    setNewPassengers("");
    setNewClass("");
    setOldSeats("");
    setDeletedPassenger("");
    console.log(
      addPassengerData,
      changePassengerData,
      changeClassData,
      changeSeatsData,
      deletePassengerData
    );
  };

  if (changeData.type === "cancelFlight") {
    data = [
      {
        question: "Are you sure to cancel this flight?",
      },
    ];
  } else if (changeData.type === "addPassenger") {
    data = [
      {
        question: "How many passengers do you want to add?",
      },
      {
        question: "what are the names of the passengers?",
      },
      {
        question: "Select seats for the passengers?",
      },
    ];
  } else if (changeData.type === "changePassenger") {
    data = [
      {
        question: "How many passengers do you want to change?",
      },
      {
        question: "Select the passenger you want to change.",
      },
      {
        question: "Enter name of new passenger.",
      },
    ];
  } else if (changeData.type === "changeClass") {
    data = [
      {
        question: "Which class do you want to change to?",
      },
      {
        question: "Select seat in the new class.",
      },
    ];
  } else if (changeData.type === "changeSeats") {
    data = [
      {
        question: "Which seat do you want to change?",
      },
      {
        question: "Select the seat you want to change to.",
      },
    ];
  } else if (changeData.type === "deletePassenger") {
    data = [
      {
        question: "Which passenger do you want to delete?",
      },
    ];
  }

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? data.length - 1 : prevSlide - 1
    );
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{}}>
          <Container
            component="main"
            maxWidth="sm"
            style={{ textAlign: "center" }}
          >
            <Card elevation={20}>
              <CardContent style={{ margin: "2%" }}>
                {open && data[currentSlide].question} <br />
                {changeData.type === "cancelFlight" ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      console.log();
                      // close(false);
                    }}
                  >
                    Confirm
                  </Button>
                ) : changeData.type === "addPassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 1 ? (
                  <TextField
                    id="passengerQuantity"
                    type="number"
                    label="Passenger Quantity"
                    variant="outlined"
                    value={passengerQuantity}
                    onChange={(e) => {
                      setPassengerQuantity(e.target.value);
                    }}
                    fullWidth
                    margin="normal"
                  />
                ) : changeData.type === "addPassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 2 ? (
                  <TextField
                    id="passengers"
                    type="text"
                    label="Passengers"
                    variant="outlined"
                    value={passengers}
                    placeholder="eg. joe, mark, bob"
                    onChange={(e) => {
                      setPassengers(e.target.value);
                    }}
                    fullWidth
                    margin="normal"
                  />
                ) : changeData.type === "addPassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 3 ? (
                  <Box>
                    <Seats seats={seats} setSeats={setSeats} />
                  </Box>
                ) : changeData.type === "changePassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 1 ? (
                  <TextField
                    id="passengerQuantity"
                    type="number"
                    label="Passenger Quantity"
                    variant="outlined"
                    value={passengerQuantity}
                    onChange={(e) => {
                      setPassengerQuantity(e.target.value);
                    }}
                    fullWidth
                    margin="normal"
                  />
                ) : changeData.type === "changePassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 2 ? (
                  <>
                    <InputLabel id="demo-simple-select-label">
                      Passenger
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={oldPassengers}
                      label="new passenger"
                      variant="outlined"
                      onChange={(e) => {
                        setOldPassengers(e.target.value);
                      }}
                      fullWidth
                     
                    >
                      <MenuItem value={"first"}>joe</MenuItem>
                      <MenuItem value={"business"}>mark</MenuItem>
                      <MenuItem value={"economy"}>bob</MenuItem>
                    </Select>
                  </>
                ) : changeData.type === "changePassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 3 ? (
                  <TextField
                    id="passengers"
                    type="text"
                    label="new Passenger"
                    variant="outlined"
                    value={newPassengers}
                    placeholder="eg. joe, mark, bob"
                    onChange={(e) => {
                      setNewPassengers(e.target.value);
                    }}
                    fullWidth
                    margin="normal"
                  />
                ) : changeData.type === "changeClass" &&
                  data.indexOf(data[currentSlide]) + 1 === 1 ? (
                  <>
                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={newClass}
                      label="Class"
                      onChange={(e) => {
                        setNewClass(e.target.value);
                      }}
                      fullWidth
                    >
                      <MenuItem value={"first"}>First</MenuItem>
                      <MenuItem value={"business"}>Business</MenuItem>
                      <MenuItem value={"economy"}>Economy</MenuItem>
                    </Select>
                  </>
                ) : changeData.type === "changeClass" &&
                  data.indexOf(data[currentSlide]) + 1 === 2 ? (
                  <Box>
                    <Seats seats={seats} setSeats={setSeats} />
                  </Box>
                ) : changeData.type === "changeSeats" &&
                  data.indexOf(data[currentSlide]) + 1 === 1 ? (
                  <>
                    <InputLabel id="demo-simple-select-label">Seats</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={oldSeats}
                      label="Seats"
                      onChange={(e) => {
                        setOldSeats(e.target.value);
                      }}
                      fullWidth
                    >
                      <MenuItem value={"first"}>1</MenuItem>
                      <MenuItem value={"business"}>2</MenuItem>
                      <MenuItem value={"economy"}>3</MenuItem>
                    </Select>
                  </>
                ) : changeData.type === "changeSeats" &&
                  data.indexOf(data[currentSlide]) + 1 === 2 ? (
                  <Box>
                    <Seats seats={seats} setSeats={setSeats} />
                  </Box>
                ) : changeData.type === "deletePassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 1 ? (
                  <>
                    <InputLabel id="demo-simple-select-label">
                      Passengers
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={deletedPassenger}
                      label="Passengers"
                      onChange={(e) => {
                        setDeletedPassenger(e.target.value);
                      }}
                      fullWidth
                    >
                      <MenuItem value={"first"}>joe</MenuItem>
                      <MenuItem value={"business"}>mark</MenuItem>
                      <MenuItem value={"economy"}>bob</MenuItem>
                    </Select>
                  </>
                ) : (
                  ""
                )}
              </CardContent>
              {open && data.indexOf(data[currentSlide]) != 0 && (
                <Button onClick={handlePrevSlide}>Previous</Button>
              )}
              {open && data.indexOf(data[currentSlide]) != data.length - 1 && (
                <Button onClick={handleNextSlide}>Next</Button>
              )}
            </Card>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default ChangeFlightData;
