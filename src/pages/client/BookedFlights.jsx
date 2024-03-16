import FlightsData from "../../components/flightsData";
import { useSelector } from "react-redux";

export default function BookedFlights() {
  const rows = useSelector((store) => store.userFlights.userFlights);

  const title = "Booked Flights";

  const columns = [
    { id: "actionPrintTicket", label: "", minWidth: 170 },
    { id: "actionChange", label: "", minWidth: 170 },
    { id: "flightNumber", label: "Flight Number", minWidth: 170 },
    { id: "origin", label: "Origin", minWidth: 100 },
    { id: "destination", label: "Destination", minWidth: 170 },
    { id: "date", label: "Date", minWidth: 170 },
    { id: "time", label: "Time", minWidth: 170 },
    { id: "aircraft", label: "Aircraft", minWidth: 170 },
    { id: "passengers", label: "Passengers", minWidth: 170 },
    { id: "seats", label: "Seats", minWidth: 170 },
    { id: "status", label: "status", minWidth: 170 },
  ];

  return (
    <div>
      <FlightsData columns={columns} rows={rows} title={title} />
    </div>
  );
}
