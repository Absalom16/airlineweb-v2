import { useState, useEffect } from "react";
import FlightsData from "../../components/flightsData";
import { useSelector } from "react-redux";

export default function BookFlight() {
  const [isLoading, setIsLoading] = useState(true);
  const rows = useSelector((store) => store.availableFlights.flights);

  useEffect(() => {
    if (rows) {
      setIsLoading(false);
    }
  }, [rows]);

  const title = "Available Flights";

  const columns = [
    { id: "flightNumber", label: "Flight Number", minWidth: 170 },
    { id: "origin", label: "Origin", minWidth: 100 },
    { id: "destination", label: "Destination", minWidth: 170 },
    { id: "date", label: "Date", minWidth: 170 },
    { id: "time", label: "Time", minWidth: 170 },
  ];

  return (
    <div>
      <FlightsData
        columns={columns}
        rows={rows}
        title={title}
        isLoading={isLoading}
      />
    </div>
  );
}
