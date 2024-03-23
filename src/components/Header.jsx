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
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faHeartbeat,
  faHome,
  faUserPlus,
  faSignIn,
  faBars,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer
  const [anchorEl, setAnchorEl] = useState(null);

  const { username, isLoggedIn } = useSelector((store) => store.user.user);

  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true); // Open drawer
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false); // Close drawer
  };

  const handleClose = () => {
    setAnchorEl(null); // Close menu
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element when avatar is clicked
  };

  const logout = () => {
    if (isDrawerOpen) handleDrawerClose();
    dispatch(setUser({}));
    handleClose();
  };
  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              textShadow: "5px 5px 7px rgba(0, 0, 0, 0.5)",
            }}
          >
            <NavLink
              to="/"
              style={{
                color: "white",
              }}
            >
              KenyaAirways
            </NavLink>
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <NavLink to="/">
                <Button
                  // color="inherit"
                  sx={{
                    "&:hover": { backgroundColor: "#212121" },
                    color: "white",
                  }}
                >
                  <span style={{ marginRight: "0.5em" }}>
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                  Home
                </Button>
              </NavLink>
              {!isLoggedIn && (
                <NavLink to="/signup">
                  <Button
                    sx={{
                      "&:hover": { backgroundColor: "#212121" },
                      color: "white",
                    }}
                  >
                    <span style={{ marginRight: "0.5em" }}>
                      <FontAwesomeIcon icon={faUserPlus} />
                    </span>
                    Signup
                  </Button>
                </NavLink>
              )}

              {!isLoggedIn ? (
                <NavLink to="/login">
                  <Button
                    // color="inherit"
                    sx={{
                      "&:hover": { backgroundColor: "#212121" },
                      color: "white",
                    }}
                  >
                    <span style={{ marginRight: "0.5em" }}>
                      <FontAwesomeIcon icon={faSignIn} />
                    </span>
                    Login
                  </Button>
                </NavLink>
              ) : (
                <>
                  <Avatar
                    alt={username.toUpperCase()}
                    src="/path_to_avatar.jpg"
                    sx={{
                      boxShadow: 5,
                      marginLeft: 1,
                      backgroundColor: "#212121",
                      "&:hover": { cursor: "pointer" },
                    }}
                    onClick={handleClick} // Open menu on click
                  />
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        backgroundColor: "#212121",
                        color: "white",
                      },
                    }}
                  >
                    <MenuItem onClick={logout}>
                      <FontAwesomeIcon icon={faSignOut} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </div>
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
              {!isLoggedIn && (
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemText>
                    <FontAwesomeIcon icon={faUserPlus} />{" "}
                    <NavLink to="/signup">Signup</NavLink>
                  </ListItemText>
                </ListItem>
              )}

              {!isLoggedIn && (
                <ListItem button onClick={handleDrawerClose}>
                  <ListItemText>
                    <FontAwesomeIcon icon={faSignIn} />{" "}
                    <NavLink to="/login">Login</NavLink>
                  </ListItemText>
                </ListItem>
              )}

              {isLoggedIn && (
                <ListItem button onClick={logout}>
                  <FontAwesomeIcon icon={faSignOut} />{" "}
                  <ListItemText>Logout</ListItemText>
                </ListItem>
              )}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
