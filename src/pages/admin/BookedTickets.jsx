import { useState, useEffect } from "react";
import FlightsData from "../../components/flightsData";
import { getAllFlights } from "../../utilities/helpers";

export default function BookedTickets() {
  const [rows, setRows] = useState([]);
  const title = "Booked Tickets";

  const columns = [
    { id: "actionViewTickets", label: "", minWidth: 170 },
    { id: "flightNumber", label: "Flight Number", minWidth: 170 },
    { id: "origin", label: "Origin", minWidth: 100 },
    { id: "destination", label: "Destination", minWidth: 170 },
    { id: "date", label: "Date", minWidth: 170 },
    { id: "time", label: "Time", minWidth: 170 },
    { id: "aircraft", label: "Aircraft", minWidth: 170 },
  ];

  useEffect(() => {
    getAllFlights((data) => {
      data.forEach((flight) => {
        flight.flightNumber = flight.id;
        flight.date = flight.departureDate;
        flight.time = flight.departureTime;
      });
      setRows(data);
    });
  }, []);

  return (
    <div>
      <FlightsData columns={columns} rows={rows} title={title} />
    </div>
  );
}
