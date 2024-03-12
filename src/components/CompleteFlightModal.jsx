import { Button } from "@mui/material";
import BasicModal from "./Modal";
import { adminCompleteFlight } from "../utilities/helpers";

export default function CompleteFlightModal({ open, close, flight }) {
  const handleSubmit = () => {
    adminCompleteFlight(
      flight.id,
      { status: "COMPLETED" },
      (data) => {
        console.log(data);
      }
    );
    close(false);
  };

  return (
    <BasicModal open={open} close={close}>
      {`Are you sure you want to mark flight ${flight.flightNumber} as COMPLETE?`}
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
