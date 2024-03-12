import { Button } from "@mui/material";
import BasicModal from "./Modal";
import { adminCancelFlight } from "../utilities/helpers";

export default function CancelFlightModal({ open, close, flight }) {
  const handleSubmit = () => {
    adminCancelFlight(flight.id, { status: "CANCELLED" }, (data) => {
      console.log(data);
    });
    close(false);
  };

  return (
    <BasicModal open={open} close={close}>
      {`Are you sure you want to cancel flight ${flight.flightNumber}?`}
      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Confirm
      </Button>
    </BasicModal>
  );
}
