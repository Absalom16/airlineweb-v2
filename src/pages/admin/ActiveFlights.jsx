import FlightsData from "../../components/flightsData";

export default function ActiveFlights() {
  const title = "Active Flights";

  const columns = [
    { id: "flightNumber", label: "Flight Number", minWidth: 170 },
    { id: "origin", label: "Origin", minWidth: 100 },
    { id: "destination", label: "Destination", minWidth: 170 },
    { id: "date", label: "Date", minWidth: 170 },
    { id: "time", label: "Time", minWidth: 170 },
    { id: "actionComplete", label: "Action", minWidth: 170 },
    { id: "actionCancel", label: "Action", minWidth: 170 },
  ];

  const rows = [
    {
      flightNumber: "FL123",
      origin: "New York",
      destination: "Los Angeles",
      date: "2024-03-15",
      time: "10:00 AM",
    },
    {
      flightNumber: "FL456",
      origin: "Chicago",
      destination: "Miami",
      date: "2024-03-16",
      time: "1:00 PM",
    },
    // Add more rows as needed
  ];

  return (
    <div>
      <FlightsData columns={columns} rows={rows} title={title} />
    </div>
  );
}
