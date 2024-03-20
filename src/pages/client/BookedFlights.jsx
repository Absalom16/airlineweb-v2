import FlightsData from "../../components/flightsData";
import { useSelector } from "react-redux";

export default function BookedFlights() {
  const rows = useSelector((store) =>
    store.userFlights.userFlights.filter((flight) => flight.status === "DUE")
  );

  const title = "Booked Flights";

  const columns = [
    { id: "flightNumber", label: "Flight Number", minWidth: 170 },
    { id: "origin", label: "Origin", minWidth: 100 },
    { id: "destination", label: "Destination", minWidth: 170 },
    { id: "date", label: "Date", minWidth: 170 },
    { id: "time", label: "Time", minWidth: 170 },
    { id: "aircraft", label: "Aircraft", minWidth: 170 },
    { id: "selectedClass", label: "class", minWidth: 170 },
    { id: "passengers", label: "Passengers", minWidth: 170 },
    { id: "seats", label: "Seats", minWidth: 170 },
  ];

  return (
    <div>
      <FlightsData columns={columns} rows={rows} title={title} />
    </div>
  );
}
