import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Hidden,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faHeartbeat,
  faHome,
  faUserPlus,
  faSignIn,
  faBars,
  // faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer

  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true); // Open drawer
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false); // Close drawer
  };

  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            kenyaAirways
          </Typography>
          {/* Hamburger menu for small screens */}
          <Hidden smUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen} // Open drawer on click
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
          </Hidden>
          {!isSmallScreen && (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("login");
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("signup");
                }}
              >
                signup
              </Button>
            </>
          )}
          {/* Drawer for small screens */}
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={handleDrawerClose} // Close drawer on outside click
          >
            <List>
              <ListItem button onClick={handleDrawerClose}>
                <ListItemText>
                  <FontAwesomeIcon icon={faHome} />{" "}
                  <NavLink to="/">Home</NavLink>
                </ListItemText>
              </ListItem>
              <ListItem button onClick={handleDrawerClose}>
                <ListItemText>
                  <FontAwesomeIcon icon={faUserPlus} />{" "}
                  <NavLink to="/signup">Signup</NavLink>
                </ListItemText>
              </ListItem>

              <ListItem button onClick={handleDrawerClose}>
                <ListItemText>
                  <FontAwesomeIcon icon={faSignIn} />{" "}
                  <NavLink to="/login">Login</NavLink>
                </ListItemText>
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  console.log("clicked");
                }}
              >
                <ListItemText>Logout</ListItemText>
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
