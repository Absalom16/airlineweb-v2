import { useState, useEffect } from "react";
import FlightsData from "../../components/flightsData";
import { getActiveFlights } from "../../utilities/helpers.js";

export default function ActiveFlights() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getActiveFlights((data) => {
      data.forEach((item) => {
        item.flightNumber = item.id;
        item.date = item.departureDate;
        item.time = item.departureTime;
      });
      setRows(data);
    });
  }, []);

  const title = "Active Flights";

  const columns = [
    { id: "actionComplete", label: "", minWidth: 170 },
    { id: "actionCancel", label: "", minWidth: 170 },
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
