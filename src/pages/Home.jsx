import {
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { isLoggedIn, rank } = useSelector((store) => store.user.user);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn && rank === "ADMIN") {
      navigate("/admin");
    } else if (isLoggedIn && rank === "CLIENT") {
      navigate("/client");
    } else {
      navigate("/login");
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container component="main" maxWidth="md">
      <>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontSize: isSmallScreen ? "2rem" : "3rem" }}
        >
          Pride Of Africa.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: "20px",
            fontSize: isSmallScreen ? "0.9rem" : "1rem",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget
          aliquam nunc. Vestibulum id lorem id lorem dictum efficitur eu eget
          purus. Vestibulum eget lacinia mauris, vel dapibus lectus. Aenean quis
          arcu orci. Nullam fringilla vestibulum lectus in pharetra.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ color: "white" }}
          onClick={handleClick}
        >
          Go to the app
        </Button>
      </>
      {isSmallScreen && (
        <div style={{ marginTop: "20px" }}>
          {/* Additional content for small screens if needed */}
        </div>
      )}
    </Container>
  );
};

export default Home;
