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
  CircularProgress,
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
import { useSelector } from "react-redux";

const ChangeFlightData = ({ open, close, changeData, flight }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [passengerQuantity, setPassengerQuantity] = useState(1);
  const [passengers, setPassengers] = useState("");
  const [seats, setSeats] = useState([]);
  const [oldPassengers, setOldPassengers] = useState("");
  const [newPassengers, setNewPassengers] = useState("");
  const [newClass, setNewClass] = useState("");
  const [oldSeats, setOldSeats] = useState("");
  const [deletedPassenger, setDeletedPassenger] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [isAdded, setIsAdded] = useState({ added: false });
  const [activeFlight] = useSelector((store) =>
    store.availableFlights.flights.filter(
      (item) => item.id === flight.flightNumber
    )
  );

  const changeClassCost =
    (newClass === "first"
      ? activeFlight.firstClassCost
      : newClass === "business"
      ? activeFlight.businessClassCost
      : newClass === "economy"
      ? activeFlight.economyClassCost
      : "") *
      flight.passengers.split(",").length -
    flight.cost;

  let data = [];

  const addPassengerData = {
    type: "addPassenger",
    passengers: `${flight.passengers},${passengers}`,
    seats: `${flight.seats},${seats.map((seat) => seat.tag).join(",")}`,
    passengerQuantity:
      Number(flight.passengerQuantity) + Number(passengerQuantity),
    aircraft: flight.aircraft,
    classe: flight.selectedClass,
    cost:
      flight.cost +
      (flight.cost / flight.passengers.split(",").length) * passengerQuantity,
    flightNumber: flight.flightNumber,
  };

  const changePassengerData = {
    type: "changePassenger",
    passengers: flight.passengers.replace(oldPassengers, newPassengers),
  };
  const changeClassData = {
    type: "changeClass",
    selectedClass: newClass,
    seats: seats.map((seat) => seat.tag).join(","),
    cost: flight.cost + changeClassCost,
  };

  const changeSeatsData = {
    type: "changeSeats",
    seats: flight.seats.replace(
      oldSeats,
      seats.map((seat) => seat.tag).join(",")
    ),
  };

  const deletePassengerData = {
    type: "deletePassenger",
    passengers: flight.passengers
      .split(",")
      .filter((passenger) => passenger !== deletedPassenger)
      .join(","),
    seats: flight.seats
      .split(",")
      .filter((seat) => seat !== oldSeats)
      .join(","),
    cost:
      deletedPassenger.split(",").length *
      (flight.cost / flight.passengers.split(",").length),
  };

  const handleClose = () => {
    close(false);
    setCurrentSlide(0);
    setPassengerQuantity(1);
    setPassengers("");
    setSeats([]);
    setOldPassengers("");
    setNewPassengers("");
    setNewClass("");
    setOldSeats("");
    setDeletedPassenger("");
    setErrors([]);
    setIsAdded({ added: false });
    setCurrentSlide(0);
    setLoading(false);
  };

  const handleErrors = (callback) => {
    if (
      Number(passengerQuantity) !== passengers.split(",").length &&
      changeData.type === "addPassenger"
    ) {
      setErrors([
        ...errors,
        "The passenger quantity does not match number of added passengers.",
      ]);
    } else if (
      seats.length !== passengers.split(",").length &&
      changeData.type === "addPassenger"
    ) {
      setErrors([
        ...errors,
        "The seats quantity does not match number of added passengers.",
      ]);
    } else if (
      oldPassengers.split(",").length !== newPassengers.split(",").length &&
      changeData.type === "changePassenger"
    ) {
      setErrors([...errors, "The passenger quantities do not match."]);
    } else if (
      seats.length !== flight.passengers.split(",").length &&
      changeData.type === "changeClass"
    ) {
      setErrors([
        ...errors,
        "The seats quantity does not match number of passengers.",
      ]);
    } else if (
      oldSeats.split(",").length !== seats.length &&
      changeData.type === "changeSeats"
    ) {
      setErrors([...errors, "The seats quantities do not match."]);
    } else {
      callback();
    }
  };

  if (changeData.type === "cancelFlight") {
    data = [
      {
        question: `Are you sure to cancel this flight? A 10% penalty of ksh.${
          flight.cost * (10 / 100)
        } will be applied on your refund`,
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
        question: `You need to pay an additional Ksh.${
          (flight.cost / flight.passengers.split(",").length) *
          passengerQuantity
        } to add the selected passengers.`,
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
        question: `${
          changeClassCost < 0
            ? `You will be refunded Ksh.${JSON.stringify(
                changeClassCost
              ).replace("-", "")}`
            : `You need to pay an extra Ksh.${changeClassCost}`
        } to change class.`,
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
        question: `You will be refunded Ksh.${
          deletedPassenger.split(",").length *
          (flight.cost / flight.passengers.split(",").length)
        } for the delete passenger`,
      },
    ];
  }

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % data.length);
    setLoading(false);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? data.length - 1 : prevSlide - 1
    );
    setLoading(false);
  };

  const handleCancelFlight = () => {
    setLoading(true);
    clientCancelFlight(
      flight.id,
      { type: "cancelFlight", status: "CANCELLED" },
      {
        seats: flight.seats,
        classe: flight.selectedClass,
        aircraft: flight.aircraft,
        flightNumber: flight.flightNumber,
      },
      (data) => {
        if (data) {
          setLoading(false);
          setIsAdded({
            added: true,
            message: "Success.",
          });
          setTimeout(() => {
            handleClose();
          }, 1000);
        }
      }
    );
  };

  const handleAddPassenger = () => {
    setLoading(true);
    handleErrors(() => {
      clientAddPassenger(flight.id, addPassengerData, (data) => {
        if (data) {
          setLoading(false);
          setIsAdded({
            added: true,
            message: "Success.",
          });
          setTimeout(() => {
            handleClose();
          }, 1000);
        }
      });
    });
  };

  const handleChangePassenger = () => {
    setLoading(true);
    handleErrors(() => {
      clientChangePassenger(flight.id, changePassengerData, () => {});
      if (data) {
        setLoading(false);
        setIsAdded({
          added: true,
          message: "Success.",
        });
        setTimeout(() => {
          handleClose();
        }, 1000);
      }
    });
  };

  const handleChangeClass = () => {
    setLoading(true);
    handleErrors(() => {
      clientChangeClass(
        flight.id,
        changeClassData,
        {
          seats: flight.seats,
          classe: flight.selectedClass,
          aircraft: flight.aircraft,
          flightNumber: flight.flightNumber,
        },
        (data) => {
          if (data) {
            setLoading(false);
            setIsAdded({
              added: true,
              message: "Success.",
            });
            setTimeout(() => {
              handleClose();
            }, 1000);
          }
        }
      );
    });
  };

  const handleChangeSeats = () => {
    setLoading(true);
    handleErrors(() => {
      clientChangeSeats(
        flight.id,
        changeSeatsData,
        {
          seats: oldSeats,
          aircraft: flight.aircraft,
          classe: flight.selectedClass,
          flightNumber: flight.flightNumber,
        },
        (data) => {
          if (data) {
            setLoading(false);
            setIsAdded({
              added: true,
              message: "Success.",
            });
            setTimeout(() => {
              handleClose();
            }, 1000);
          }
        }
      );
    });
  };

  const handleDeletePassenger = () => {
    setLoading(true);
    handleErrors(() => {
      clientDeletePassenger(
        flight.id,
        deletePassengerData,
        {
          seats: oldSeats,
          aircraft: flight.aircraft,
          classe: flight.selectedClass,
        },
        (data) => {
          if (data) {
            setLoading(false);
            setIsAdded({
              added: true,
              message: "Success.",
            });
            setTimeout(() => {
              handleClose();
            }, 1000);
          }
        }
      );
    });
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
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
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
                    inputProps={{ min: 1 }}
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
                      quantity={passengerQuantity}
                    />
                  </Box>
                ) : changeData.type === "addPassenger" &&
                  data.indexOf(data[currentSlide]) + 1 === 4 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
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
                    inputProps={{ max: 1, min: 1 }}
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
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
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
                      quantity={flight.passengers.split(",").length}
                    />
                  </Box>
                ) : changeData.type === "changeClass" &&
                  data.indexOf(data[currentSlide]) + 1 === 3 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
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
                      quantity={passengerQuantity}
                    />
                  </Box>
                ) : changeData.type === "changeSeats" &&
                  data.indexOf(data[currentSlide]) + 1 === 3 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
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
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                    onClick={handleDeletePassenger}
                  >
                    Confirm
                  </Button>
                ) : (
                  ""
                )}
                <br />
                {errors.length > 0 && (
                  <span style={{ color: "red" }}>{errors.join(",")}</span>
                )}
                <span style={{ color: "green" }}>
                  {isAdded.added && isAdded.message}
                </span>
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
