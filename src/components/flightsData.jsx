import * as React from "react";
import {
  Container,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import BookFlightModal from "./BookFlightModal";
import ChangeFlightModal from "./ChangeFlightModal";
import CompleteFlightModal from "./CompleteFlightModal";
import CancelFlightModal from "./CancelFlightModal";
import ViewTicketsModal from "./ViewTicketsModal";

const FlightsData = ({ columns, rows, title }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [openBookFlightModal, setOpenBookFlightModal] = React.useState(false);
  const [openChangeFlightModal, setOpenChangeFlightModal] =
    React.useState(false);
  const [openCompleteFlightModal, setOpenCompleteFlightModal] =
    React.useState(false);
  const [openCancelFlightModal, setOpenCancelFlightModal] =
    React.useState(false);
  const [openViewTicketsModal, setOpenViewTicketsModal] = React.useState(false);
  const [selectedFlight, setSelectedFlight] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container
      component="main"
      maxWidth="l"
      style={{ marginTop: "2%", marginBottom: "2%" }}
    >
      <Card elevation={20}>
        <CardContent>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={12}>
                    {title}
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={rowIndex}
                      >
                        {columns.map((column, colIndex) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={colIndex} align={column.align}>
                              {column.id === "actionBook" ? (
                                <>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                      setSelectedFlight(row);
                                      setOpenBookFlightModal(true);
                                    }}
                                  >
                                    Book
                                  </Button>
                                </>
                              ) : column.id === "actionPrintTicket" ? (
                                // Render something else for "someOtherColumn"
                                <Button variant="contained" color="primary">
                                  Ticket
                                </Button>
                              ) : column.id === "actionChange" ? (
                                // Render something else for "someOtherColumn"
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    setOpenChangeFlightModal(true);
                                  }}
                                >
                                  Change
                                </Button>
                              ) : column.id === "actionComplete" ? (
                                // Render something else for "someOtherColumn"
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    setOpenCompleteFlightModal(true);
                                  }}
                                >
                                  Complete
                                </Button>
                              ) : column.id === "actionCancel" ? (
                                // Render something else for "someOtherColumn"
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    setOpenCancelFlightModal(true);
                                  }}
                                >
                                  Cancel
                                </Button>
                              ) : column.id === "actionViewTickets" ? (
                                // Render something else for "someOtherColumn"
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    setOpenViewTicketsModal(true);
                                  }}
                                >
                                  View
                                </Button>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                <BookFlightModal
                  flight={selectedFlight}
                  open={openBookFlightModal}
                  close={setOpenBookFlightModal}
                  setSelectedFlight={setSelectedFlight}
                />
                <ChangeFlightModal
                  flight={selectedFlight}
                  open={openChangeFlightModal}
                  close={setOpenChangeFlightModal}
                  setSelectedFlight={setSelectedFlight}
                />
                <CompleteFlightModal
                  open={openCompleteFlightModal}
                  close={setOpenCompleteFlightModal}
                />
                <CancelFlightModal
                  open={openCancelFlightModal}
                  close={setOpenCancelFlightModal}
                />
                <ViewTicketsModal
                  open={openViewTicketsModal}
                  close={setOpenViewTicketsModal}
                />
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default FlightsData;
