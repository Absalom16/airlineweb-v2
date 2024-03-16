import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          style={{ color: "white" }}
        >
          Go to Home Page
        </Button>
      </div>
    </Container>
  );
}
