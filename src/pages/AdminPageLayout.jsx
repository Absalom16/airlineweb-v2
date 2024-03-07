import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function AdminPageLayout() {
  return (
    <div>
      <Header />
      AdminPageLayout
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
