import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function PagesLayout() {
  return (
    <div>
      <Header />
      PagesLayout
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
