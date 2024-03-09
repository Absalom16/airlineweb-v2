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
        // marginLeft: "1px",
        // marginRight: "1px",
        width: "100vw",
        height: "90vh",
      }}
    >
      {/* Left Section */}
      <Grid item xs={2}>
        {/* Content for left section */}
        <div
          style={{
            height: "80vh",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Sidebar>
            <ListItem label="Add Flight" path="addFlight" />
            <ListItem label="Add city" path="addCity" />
            <ListItem label="Add Aircraft" path="addAircraft" />
            <ListItem label="Active flights" path="activeFlights" />
            <ListItem label="Booked Tickets" path="bookedTickets" />
          </Sidebar>
        </div>
      </Grid>

      {/* Right Section */}
      <Grid item xs={10}>
        {/* Content for right section */}
        <div
          style={{
            height: "80vh",
            backgroundColor: "#d3d3d3",
            overflow: "auto",
            width: "100%",
            textAlign: "center"
          }}
        >
          <Outlet />
        </div>
      </Grid>
    </Grid>
  );
};

export default ClientPageLayout;
