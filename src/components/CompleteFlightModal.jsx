import { Button } from "@mui/material";
import BasicModal from "./Modal";

export default function CompleteFlightModal({ open, close }) {
  return (
    <BasicModal open={open} close={close}>
      Are you sure you want to mark this flight as COMPLETED?
      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          // console.log(bookData);
          // close(false);
        }}
      >
        Confirm
      </Button>
    </BasicModal>
  );
}
