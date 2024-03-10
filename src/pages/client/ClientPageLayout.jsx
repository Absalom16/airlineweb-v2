import Grid from "@mui/material/Grid";
import Sidebar from "../../components/Sidebar";
import ListItem from "@mui/material/ListItem";
import { Outlet } from "react-router-dom";

const ClientPageLayout = () => {
  return (
    <Grid
      container
      spacing={2}
      style={{
        marginTop: "2%",
        width: "100vw",
        height: "93vh",
      }}
    >
      {/* Left Section */}
      <Grid item xs={2}>
        {/* Content for left section */}
        <div
          style={{
            height: "100%",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Sidebar>
            <ListItem label="Account" path="account" />
            <ListItem label="Book Flight" path="bookFlight" />
            <ListItem label="Booked Flights" path="bookedFlights" />
            <ListItem label="Cancelled Flights" path="cancelledFlights" />
            <ListItem label="Completed Flights" path="completedFlights" />
          </Sidebar>
        </div>
      </Grid>

      {/* Right Section */}
      <Grid item xs={10}>
        {/* Content for right section */}
        <div
          style={{
            height: "100%",
            backgroundColor: "#d3d3d3",
            overflow: "auto",
            width: "100%",
          }}
        >
          <Outlet />
        </div>
      </Grid>
    </Grid>
  );
};

export default ClientPageLayout;
