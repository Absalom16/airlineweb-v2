import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Paper,
  Card,
  CardContent,
  Container,
  Box,
  Modal,
  Button,
  Badge,
} from "@mui/material";

const Seats = ({ seats, setSeats, classe, aircraftName }) => {
  const [open, setOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const availableSeats = useSelector((store) =>
    store.aircrafts.aircrafts.find((aircraft) => aircraft.name === aircraftName)
  );

  const handleSeatClick = (selectedSeat) => {
    seats.push(selectedSeat);
    if (selectedSeats.includes(selectedSeat.tag)) {
      setSelectedSeats(
        selectedSeats.filter((seat) => seat !== selectedSeat.tag)
      );
    } else {
      setSelectedSeats([...selectedSeats, selectedSeat.tag]);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSeats(seats);
  };

  return (
    <>
      <Button onClick={handleOpen}>Select</Button>
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
              {classe === "first"
                ? "first class"
                : classe === "business"
                ? "business class"
                : classe === "economy"
                ? "economy class"
                : ""}
              <CardContent style={{ margin: "2%" }}>
                <Grid container spacing={1}>
                  {(classe === "first"
                    ? availableSeats.firstClassSeats
                    : classe === "business"
                    ? availableSeats.businessClassSeats
                    : classe === "economy"
                    ? availableSeats.economyClassSeats
                    : []
                  ).map((seat, index) => (
                    <Grid key={index} item xs={3}>
                      <Paper
                        elevation={3}
                        disabled={seat.occupied == true}
                        style={{
                          padding: 10,
                          textAlign: "center",
                          cursor:
                            seat.occupied == true ? "not-allowed" : "pointer",
                          backgroundColor:
                            seat.occupied == true ? "red" : "green",
                        }}
                        onClick={
                          seat.occupied == true
                            ? null
                            : () => handleSeatClick(seat)
                        }
                      >
                        {seat.tag}

                        {selectedSeats.includes(seat.tag) && (
                          <Badge
                            color="secondary"
                            badgeContent="✔️"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          />
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                <br />
                <Button
                  onClick={handleClose}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default Seats;
