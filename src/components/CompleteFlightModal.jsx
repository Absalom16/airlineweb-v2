import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import BasicModal from "./Modal";
import { adminCompleteFlight } from "../utilities/helpers";

export default function CompleteFlightModal({ open, close, flight }) {
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    adminCompleteFlight(flight.id, { status: "COMPLETED" }, (data) => {
      if (data) {
        setLoading(false);
        setCompleted(true);
        setTimeout(() => {
          close(false);
          setCompleted(false);
        }, 2000);
      }
    });
  };

  return (
    <BasicModal open={open} close={close}>
      {`Are you sure you want to mark flight ${flight.flightNumber} as COMPLETE?`}
      <br />
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
      <br />
      <span style={{ color: "green" }}>{completed && "Success"}</span>
    </BasicModal>
  );
}
