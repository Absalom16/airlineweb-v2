import { useState } from "react";
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

const Seats = ({
  seatData = [
    {
      tag: "A1",
      occupied: "true",
    },
    {
      tag: "A2",
      occupied: "false",
    },
    {
      tag: "A3",
      occupied: "true",
    },
    {
      tag: "A4",
      occupied: "false",
    },
    {
      tag: "A5",
      occupied: "true",
    },
    {
      tag: "A6",
      occupied: "false",
    },
    {
      tag: "A7",
      occupied: "true",
    },
  ],
  seats,
  setSeats,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

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
              <CardContent style={{ margin: "2%" }}>
                <Grid container spacing={1}>
                  {seatData.map((seat, index) => (
                    <Grid key={index} item xs={3}>
                      <Paper
                        elevation={3}
                        style={{
                          padding: 10,
                          textAlign: "center",
                          cursor: "pointer",
                          backgroundColor:
                            seat.occupied == "true" ? "red" : "green",
                        }}
                        onClick={() => handleSeatClick(seat)}
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
