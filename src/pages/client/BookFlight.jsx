import FlightsData from "../../components/flightsData";
import { useSelector } from "react-redux";

export default function BookFlight() {
  const rows = useSelector((store) => store.availableFlights.flights);

  const title = "Available Flights";

  const columns = [
    { id: "actionBook", label: "", minWidth: 170 },
    { id: "flightNumber", label: "Flight Number", minWidth: 170 },
    { id: "origin", label: "Origin", minWidth: 100 },
    { id: "destination", label: "Destination", minWidth: 170 },
    { id: "date", label: "Date", minWidth: 170 },
    { id: "time", label: "Time", minWidth: 170 },
  ];

  return (
    <div>
      <FlightsData columns={columns} rows={rows} title={title} />
    </div>
  );
}
