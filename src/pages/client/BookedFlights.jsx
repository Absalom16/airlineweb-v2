import { useState, useEffect } from "react";
import FlightsData from "../../components/flightsData";
import { getBookedFlights } from "../../utilities/helpers";

export default function BookedFlights() {
  const [rows, setRows] = useState([]);
  const title = "Booked Flights";

  const columns = [
    { id: "flightNumber", label: "Flight Number", minWidth: 170 },
    { id: "origin", label: "Origin", minWidth: 100 },
    { id: "destination", label: "Destination", minWidth: 170 },
    { id: "date", label: "Date", minWidth: 170 },
    { id: "time", label: "Time", minWidth: 170 },
    { id: "aircraft", label: "Aircraft", minWidth: 170 },
    { id: "passengers", label: "Passengers", minWidth: 170 },
    { id: "seats", label: "Seats", minWidth: 170 },
    { id: "actionPrintTicket", label: "Action", minWidth: 170 },
    { id: "actionChange", label: "Action", minWidth: 170 },
  ];

  useEffect(() => {
    getBookedFlights({ email: "testEmail@gmail.com" }, (bookedFlights) => {
      // bookedFlights.forEach((flight) => {
      //   flight.seats = flight.seats
      // });

      setRows(bookedFlights);
    });
  }, []);

  return (
    <div>
      <FlightsData columns={columns} rows={rows} title={title} />
    </div>
  );
}
