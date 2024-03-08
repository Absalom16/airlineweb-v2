import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div style={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            kenyaAirways
          </Typography>
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
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
