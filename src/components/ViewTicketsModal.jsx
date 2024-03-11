import { Button } from "@mui/material";
import FlightsData from "./flightsData";
import BasicModal from "./Modal";

export default function ViewTicketsModal({ open, close }) {
  const columns = [
    { id: "passengers", label: "Passengers", minWidth: 170 },
    { id: "seats", label: "Seats", minWidth: 100 },
    { id: "cost", label: "Cost", minWidth: 170 },
    { id: "class", label: "Class", minWidth: 170 },
  ];

  const rows = [
    {
      passengers: "joe, mark, bob",
      seats: "1, 2, 3",
      cost: "9000",
      class: "first",
    },
    {
      passengers: "joe, mark, bob",
      seats: "1, 2, 3",
      cost: "9000",
      class: "first",
    },
    {
      passengers: "joe, mark, bob",
      seats: "1, 2, 3",
      cost: "9000",
      class: "first",
    },
  ];

  return (
    <BasicModal open={open} close={close}>
      <FlightsData columns={columns} rows={rows} title={"Booked tickets"} />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          // console.log(bookData);
          // close(false);
        }}
      >
        Print
      </Button>
    </BasicModal>
  );
}
