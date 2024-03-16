import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  ButtonGroup,
  Box,
} from "@mui/material";
import ChangeFlightData from "./ChangeFlightData";

const CancelFlightModal = ({
  open,
  close,
  // setSelectedFlight,
  handleClose = () => {
    close(false);
    // setSelectedFlight("");
  },
  flight,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [changeData, setChangeData] = useState({});

  const buttons = [
    <Button
      key="cancelFlight"
      onClick={() => {
        setChangeData({ type: "cancelFlight" });
        setShowModal(true);
      }}
    >
      Cancel flight
    </Button>,
    <Button
      key="addPassenger"
      onClick={() => {
        setChangeData({ type: "addPassenger" });
        setShowModal(true);
      }}
    >
      Add passenger
    </Button>,
    <Button
      key="changePassenger"
      onClick={() => {
        setChangeData({ type: "changePassenger" });
        setShowModal(true);
      }}
    >
      Change passenger
    </Button>,
    <Button
      key="changeSeats"
      onClick={() => {
        setChangeData({ type: "changeClass" });
        setShowModal(true);
      }}
    >
      Change class
    </Button>,
    <Button
      key="changeSeats"
      onClick={() => {
        setChangeData({ type: "changeSeats" });
        setShowModal(true);
      }}
    >
      Change seats
    </Button>,
    <Button
      key="deletePassenger"
      onClick={() => {
        setChangeData({ type: "deletePassenger" });
        setShowModal(true);
      }}
    >
      Delete passenger
    </Button>,
  ];

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change flight</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="contained"
          >
            {buttons}
          </ButtonGroup>
          <ChangeFlightData
            open={showModal}
            close={setShowModal}
            changeData={changeData}
            flight={flight}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CancelFlightModal;
