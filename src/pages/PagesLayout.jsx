// import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PagesLayout = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          textAlign: "center",
        }}
      >
        <Outlet />
      </div>

      <span style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <Footer />
      </span>
    </div>
  );
};

export default PagesLayout;
