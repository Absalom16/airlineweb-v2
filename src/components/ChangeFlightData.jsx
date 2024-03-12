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
import {
  clientAddPassenger,
  clientCancelFlight,
  clientChangeClass,
  clientChangePassenger,
  clientChangeSeats,
  clientDeletePassenger,
} from "../utilities/helpers";
// import { UseSelector } from "react-redux";

const ChangeFlightData = ({ open, close, changeData, flight }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [passengerQuantity, setPassengerQuantity] = useState(0);
  const [passengers, setPassengers] = useState("");
  const [seats, setSeats] = useState([]);
  const [oldPassengers, setOldPassengers] = useState("");
  const [newPassengers, setNewPassengers] = useState("");
  const [newClass, setNewClass] = useState("");
  const [oldSeats, setOldSeats] = useState("");
  const [deletedPassenger, setDeletedPassenger] = useState("");

  console.log(flight);

  let data = [];

  const addPassengerData = {
    passengers: `${flight.passengers},${passengers}`,
    seats: `${flight.seats},${seats.map((seat) => seat.tag).join(",")}`,
    passengerQuantity:
      Number(flight.passengerQuantity) + Number(passengerQuantity),
  };

  const changePassengerData = {
    passengers: flight.passengers.replace(oldPassengers, newPassengers),
  };
  const changeClassData = {
    selectedClass: newClass,
    seats: seats.map((seat) => seat.tag).join(","),
  };

  const changeSeatsData = {
    seats: flight.seats.replace(
      oldSeats,
      seats.map((seat) => seat.tag).join(",")
    ),
  };

  const deletePassengerData = {
    passengers: flight.passengers
      .split(",")
      .filter((passenger) => passenger !== deletedPassenger),
    seats: flight.seats.split(",").filter((seat) => seat !== oldSeats),
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
      {
        question: "Add the selected passengers?",
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
      {
        question: "Change the selected passenger?.",
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
      {
        question: "Change class?",
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
      {
        question: "Change the selected seat.",
      },
    ];
  } else if (changeData.type === "deletePassenger") {
    data = [
      {
        question: "Which passenger do you want to delete?",
      },
      {
        question: "Which seat do you want to give up?",
      },
      {
        question: "Delete the selected passenger?",
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

  const handleCancelFlight = () => {
    clientCancelFlight(
      flight.id,
      { status: "CANCELLED" },
      { seats: flight.seats },
      (data) => {
        console.log(data);
      }
    );
    close(false);
  };

  const handleAddPassenger = () => {
    clientAddPassenger(flight.id, addPassengerData, (data) => {
      console.log(data);
    });
    close(false);
  };

  const handleChangePassenger = () => {
    clientChangePassenger(flight.id, changePassengerData, (data) => {
      console.log(data);
    });
    close(false);
  };

  const handleChangeClass = () => {
    clientChangeClass(
      flight.id,
      changeClassData,
      {
        seats: flight.seats,
      },
      (data) => {
        console.log(data);
      }
    );
    close(false);
  };

  const handleChangeSeats = () => {
    clientChangeSeats(
      flight.id,
      changeSeatsData,
      {
        seats: oldSeats,
      },
      (data) => {
        console.log(data);
      }
    );
    close(false);
  };

  const handleDeletePassenger = () => {
    clientDeletePassenger(
      flight.id,
      deletePassengerData,
      { seats: oldSeats },
      (data) => {
        console.log(data);
      }
    );
    close(false);
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
                    onClick={handleCancelFlight}
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
                    <Seats
                      seats={seats}
                      setSeats={setSeats}
                      classe={flight.selectedClass}
                      aircraftName={flight.aircraft}
                    />
                  </Box>
                ) : changeData.type === "addPassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 4 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleAddPassenger}
                  >
                    Confirm
                  </Button>
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
                      {flight.passengers.split(",").map((passenger, index) => {
                        return (
                          <MenuItem value={passenger} key={index}>
                            {passenger}
                          </MenuItem>
                        );
                      })}
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
                ) : changeData.type === "changePassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 4 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleChangePassenger}
                  >
                    Confirm
                  </Button>
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
                      {flight.selectedClass !== "first" && (
                        <MenuItem value={"first"}>First</MenuItem>
                      )}
                      {flight.selectedClass !== "business" && (
                        <MenuItem value={"business"}>Business</MenuItem>
                      )}
                      {flight.selectedClass !== "economy" && (
                        <MenuItem value={"economy"}>Economy</MenuItem>
                      )}
                    </Select>
                  </>
                ) : changeData.type === "changeClass" &&
                  data.indexOf(data[currentSlide]) + 1 === 2 ? (
                  <Box>
                    <Seats
                      seats={seats}
                      setSeats={setSeats}
                      classe={newClass}
                      aircraftName={flight.aircraft}
                    />
                  </Box>
                ) : changeData.type === "changeClass" &&
                  data.indexOf(data[currentSlide]) + 1 === 3 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleChangeClass}
                  >
                    Confirm
                  </Button>
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
                      {flight.seats.split(",").map((seat, index) => {
                        return (
                          <MenuItem value={seat} key={index}>
                            {seat}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </>
                ) : changeData.type === "changeSeats" &&
                  data.indexOf(data[currentSlide]) + 1 === 2 ? (
                  <Box>
                    <Seats
                      seats={seats}
                      setSeats={setSeats}
                      classe={flight.selectedClass}
                      aircraftName={flight.aircraft}
                    />
                  </Box>
                ) : changeData.type === "changeSeats" &&
                  data.indexOf(data[currentSlide]) + 1 === 3 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleChangeSeats}
                  >
                    Confirm
                  </Button>
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
                      {flight.passengers.split(",").map((passenger, index) => {
                        return (
                          <MenuItem value={passenger} key={index}>
                            {passenger}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </>
                ) : changeData.type === "deletePassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 2 ? (
                  <>
                    <InputLabel id="demo-simple-select-label">Seats</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={oldSeats}
                      label="Passengers"
                      onChange={(e) => {
                        setOldSeats(e.target.value);
                      }}
                      fullWidth
                    >
                      {flight.seats.split(",").map((seat, index) => {
                        return (
                          <MenuItem value={seat} key={index}>
                            {seat}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </>
                ) : changeData.type === "deletePassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 3 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleDeletePassenger}
                  >
                    Confirm
                  </Button>
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
