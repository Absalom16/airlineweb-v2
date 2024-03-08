import Sidebar from "../../components/Sidebar";
import ListItem from "@mui/material/ListItem";
import { Outlet } from "react-router-dom";

const ClientPageLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Sidebar */}
      <div style={{}}>
        <Sidebar>
          <ListItem label="Account" path="account" />
          <ListItem label="Book Flight" path="bookFlight" />
          <ListItem label="Booked Flights" path="bookedFlights" />
          <ListItem label="Cancelled Flights" path="cancelledFlights" />
          <ListItem label="Completed Flights" path="completedFlights" />
        </Sidebar>
      </div>

      {/* Outlet */}
      <div style={{}}>
        <Outlet />
      </div>
    </div>
  );
};

export default ClientPageLayout;
