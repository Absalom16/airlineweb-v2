import { useState, useEffect } from "react";
import FlightsData from "../../components/flightsData";
import { getBookedFlights } from "../../utilities/helpers";
import { useSelector } from "react-redux";

export default function BookedFlights() {
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useSelector((store) => store.user.user);
  // const rows = useSelector((store) =>
  //   store.userFlights.userFlights.filter((flight) => flight.status === "DUE")
  // );

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getBookedFlights({ email: email }, (data) => {
      setRows(data.filter((flight) => flight.status === "DUE"));
      setIsLoading(false);
    });
  }, [email]);

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
      <FlightsData
        columns={columns}
        rows={rows}
        title={title}
        isLoading={isLoading}
      />
    </div>
  );
}
