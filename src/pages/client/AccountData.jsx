import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  // Paper,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getBookedFlights } from "../../utilities/helpers";

const AccountData = () => {
  const { email, username, phoneNumber } = useSelector(
    (store) => store.user.user
  );
  const [flights, setFlights] = useState([]);

  getBookedFlights({ email: email }, (data) => {
    setFlights(data);
  });

  // const flights = useSelector((store) => store.userFlights.userFlights);

  const dueFlights = flights.filter((flight) => flight.status === "DUE");
  const completedFlights = flights.filter(
    (flight) => flight.status === "COMPLETED"
  );
  const cancelledFlights = flights.filter(
    (flight) => flight.status === "CANCELLED"
  );

  return (
    <Container component="main" maxWidth="md" style={{ padding: "6%" }}>
      <Card elevation={20}>
        <CardContent>
          <TableContainer
            // component={Card}
            elevation={3}
            style={
              {
                // marginRight: "20px",
                // marginLeft: "20px",
                // marginTop: "20px",
                // marginBottom: "20px",
              }
            }
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <Typography sx={{ flex: "1 1 100%" }} variant="h5">
                      <strong>Account Details</strong>
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>{username}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>{email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    <strong>Phone Number</strong>
                  </TableCell>
                  <TableCell>{phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    <strong>Due Flights</strong>
                  </TableCell>
                  <TableCell>{dueFlights.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    <strong>Completed Flights</strong>
                  </TableCell>
                  <TableCell>{completedFlights.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    <strong>Canceled Flights</strong>
                  </TableCell>
                  <TableCell>{cancelledFlights.length}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AccountData;
