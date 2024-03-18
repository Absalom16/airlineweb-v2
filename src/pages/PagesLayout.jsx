// import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import backgroundImage from "../assets/aeroplane.jpg";

const PagesLayout = () => {
  return (
    <div>
      <div
        style={{
          overflow: "hidden",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "#000",
          opacity: 0.4,
          zIndex: 0,
        }}
      ></div>
      <div style={{ position: "relative", zIndex: 10, overflow: "hidden" }}>
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
    </div>
  );
};

export default PagesLayout;
