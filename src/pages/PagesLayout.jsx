import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PagesLayout = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        {/* Header */}
        <Grid item xs={3}>
          <Header />
        </Grid>

        {/* Outlet */}
        <Grid item xs={6}>
          <Outlet />
        </Grid>

        {/* Footer */}
        <Grid item xs={3}>
          <span style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
            <Footer />
          </span>
        </Grid>
      </Grid>
    </div>
  );
};

export default PagesLayout;
