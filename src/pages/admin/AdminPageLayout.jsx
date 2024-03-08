import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import ListItem from "@mui/material/ListItem";

export default function AdminPageLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Sidebar */}
      <div style={{}}>
        <Sidebar>
          <ListItem label="Add Flight" path="addFlight" />
          <ListItem label="Add city" path="addCity" />
          <ListItem label="Add Aircraft" path="addAircraft" />
          <ListItem label="Active flights" path="activeFlights" />
          <ListItem label="Booked Tickets" path="bookedTickets" />
        </Sidebar>
      </div>

      {/* Outlet */}
      <div style={{}}>
        <Outlet />
      </div>
    </div>
  );
}
