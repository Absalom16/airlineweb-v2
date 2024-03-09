import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  // Paper,
  Container,
  Card,
  CardContent,
} from "@mui/material";

const AccountData = ({
  name = "absalom",
  email = "absalomlihasi@gmail.com",
  phoneNumber = "0714022687",
  dueFlights = 2,
  completedFlights = 10,
  canceledFlights = 5,
}) => {
  return (
    <Container component="main" maxWidth="md">
      <Card elevation={20}>
        <CardContent>
          <TableContainer
            // component={Card}
            elevation={3}
            style={{
              // marginRight: "20px",
              // marginLeft: "20px",
              // marginTop: "20px",
              // marginBottom: "20px",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    <strong>Account Details</strong>
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
                  <TableCell>{name}</TableCell>
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
                  <TableCell>{dueFlights}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    <strong>Completed Flights</strong>
                  </TableCell>
                  <TableCell>{completedFlights}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    <strong>Canceled Flights</strong>
                  </TableCell>
                  <TableCell>{canceledFlights}</TableCell>
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
