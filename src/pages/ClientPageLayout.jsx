import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function ClientPageLayout() {
  return (
    <div>
      <Header />
      ClientPageLayout
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
