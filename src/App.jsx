import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PagesLayout from "./pages/PagesLayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ClientPageLayout from "./pages/client/ClientPageLayout";
import AdminPageLayout from "./pages/admin/AdminPageLayout";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import AccountData from "./pages/client/AccountData";
import BookFlight from "./pages/client/BookFlight";
import BookedFlights from "./pages/client/BookedFlights";
import CancelledFlights from "./pages/client/CancelledFlights";
import CompletedFlights from "./pages/client/CompletedFlights";
import ActiveFlights from "./pages/admin/ActiveFlights";
import AddCity from "./pages/admin/AddCity";
import AddAircraft from "./pages/admin/AddAircraft";
import AddFlight from "./pages/admin/AddFlight";
import BookedTickets from "./pages/admin/BookedTickets";
import { useDispatch } from "react-redux";
import { getAircrafts } from "./utilities/helpers";
import { setAircrafts } from "./store/aircraftsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAircrafts((data) => {
      dispatch(setAircrafts(data));
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PagesLayout />}>
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Signin />} />
          <Route
            path="client"
            element={
              <ProtectedRoute>
                <ClientPageLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AccountData />} />
            <Route path="account" element={<AccountData />} />
            <Route path="bookFlight" element={<BookFlight />} />
            <Route path="bookedFlights" element={<BookedFlights />} />
            <Route path="cancelledFlights" element={<CancelledFlights />} />
            <Route path="completedFlights" element={<CompletedFlights />} />
          </Route>
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminPageLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ActiveFlights />} />
            <Route path="activeFlights" element={<ActiveFlights />} />
            <Route path="addCity" element={<AddCity />} />
            <Route path="addAircraft" element={<AddAircraft />} />
            <Route path="addFlight" element={<AddFlight />} />
            <Route path="bookedTickets" element={<BookedTickets />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
