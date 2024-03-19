import { useEffect, useState } from "react";
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
import ActiveFlights from "./pages/admin/ActiveFlights";
import AddCity from "./pages/admin/AddCity";
import AddAircraft from "./pages/admin/AddAircraft";
import AddFlight from "./pages/admin/AddFlight";
import BookedTickets from "./pages/admin/BookedTickets";
import { useDispatch, useSelector } from "react-redux";
import {
  getActiveFlights,
  getAircrafts,
  getAllFlights,
  getBookedFlights,
  getCities,
} from "./utilities/helpers";
import { setAircrafts } from "./store/aircraftsSlice";
import {
  setAllFlights,
  setAvailableFlights,
} from "./store/availableFlightsSlice";
import { setUserFlights } from "./store/userFlightsSlice";
import { setCities } from "./store/citiesSlice";

function App() {
  const [isUpdated, setIsupdated] = useState(false);
  const { email } = useSelector((store) => store.user.user);

  const dispatch = useDispatch();

  //fetch real-time updates
  useEffect(() => {
    const ws = new WebSocket("wss://airlineweb-server.onrender.com"); //wss://airlineweb-server.onrender.com

    ws.onopen = () => {
      console.log("Connected to websocket server");
    };

    ws.onmessage = (message) => {
      const { type, data } = JSON.parse(message.data);
      console.log(type, data);
      //fetch updated data from server
      if (type === "db_change") {
        if (data.collection === "flights") {
          //fetch available flights
          getActiveFlights((data) => {
            data.forEach((item) => {
              item.flightNumber = item.id;
              item.date = item.departureDate;
              item.time = item.departureTime;
            });
            dispatch(setAvailableFlights(data));
          });

          //fetch all flights
          getAllFlights((data) => {
            data.forEach((flight) => {
              flight.flightNumber = flight.id;
              flight.date = flight.departureDate;
              flight.time = flight.departureTime;
            });
            dispatch(setAllFlights(data));
          });
        } else if (
          data.collection === "bookedFlights" ||
          data.collection === "aircrafts"
        ) {
          //fetch booked flights
          getBookedFlights({ email: email }, (data) => {
            dispatch(setUserFlights(data));
          });
          //fetch aircrafts
          getAircrafts((data) => {
            dispatch(setAircrafts(data));
          });
        } else if (data.collection === "cities") {
          //fetch cities
          getCities((data) => {
            dispatch(setCities(data));
          });
        }
        setIsupdated(!isUpdated);
      }
    };

    ws.onclose = () => {
      console.log("websocket connection closed");
    };
  }, [isUpdated]);

  //initial data fetch
  useEffect(() => {
    //fetch aircrafts
    getAircrafts((data) => {
      dispatch(setAircrafts(data));
    });

    //fetch available flights
    getActiveFlights((data) => {
      data.forEach((item) => {
        item.flightNumber = item.id;
        item.date = item.departureDate;
        item.time = item.departureTime;
      });
      dispatch(setAvailableFlights(data));
    });

    //fetch booked flights
    getBookedFlights({ email: email }, (data) => {
      dispatch(setUserFlights(data));
    });

    //fetch cities
    getCities((data) => {
      dispatch(setCities(data));
    });

    //fetch all flights
    getAllFlights((data) => {
      data.forEach((flight) => {
        flight.flightNumber = flight.id;
        flight.date = flight.departureDate;
        flight.time = flight.departureTime;
      });
      dispatch(setAllFlights(data));
    });
  }, [dispatch, email]);

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
