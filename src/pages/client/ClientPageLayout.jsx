import { useState } from "react";
import {
  Grid,
  ListItem,
  Drawer,
  List,
  ListItemText,
  Hidden,
  Fab,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ClientPageLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={2}
      style={{
        // marginTop: "2%",
        width: "100vw",
        height: "93vh",
        overflow: "auto",
      }}
    >
      {/*menu icon for small screens */}
      <Fab
        onClick={() => setIsDrawerOpen(true)}
        sx={{ display: { md: "none" } }} // Hide for medium screens and up
        style={{
          position: "fixed",
          top: "55px",
          left: "1px",
          backgroundColor: "#212121",
          color: "white",
          boxShadow: 24,
        }}
        size="small"
      >
        <FontAwesomeIcon icon={faArrowAltCircleRight} />
      </Fab>

      {/* Drawer for small screens */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)} // Close drawer on outside click
      >
        {/* Drawer content */}
        <List>
          <ListItem
            button
            onClick={() => {
              navigate("account");
              setIsDrawerOpen(false);
            }}
          >
            <ListItemText>Account</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("bookFlight");
              setIsDrawerOpen(false);
            }}
          >
            <ListItemText>Book flight</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("bookedFlights");
              setIsDrawerOpen(false);
            }}
          >
            <ListItemText>Booked flights</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      {/* Left Section */}
      <Hidden mdDown>
        <Grid item xs={2}>
          {/* Content for left section */}
          <div
            style={{
              height: "100%",
              backgroundColor: "#f0f0f0",
              position: "fixed",
              paddingTop: "2%",
              width: "16%",
            }}
          >
            <Sidebar>
              <ListItem label="Account" path="account" />
              <ListItem label="Book Flight" path="bookFlight" />
              <ListItem label="Booked Flights" path="bookedFlights" />
            </Sidebar>
          </div>
        </Grid>
      </Hidden>

      {/* Right Section */}
      <Grid item xs={12} md={10}>
        {/* Content for right section */}
        <div
          style={{
            height: "100%",
            backgroundColor: "#d3d3d3",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Outlet />
        </div>
      </Grid>
    </Grid>
  );
};

export default ClientPageLayout;
