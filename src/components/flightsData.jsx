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
  TextField,
  TableRow,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import BookFlightModal from "./BookFlightModal";
import ChangeFlightModal from "./ChangeFlightModal";
import CompleteFlightModal from "./CompleteFlightModal";
import CancelFlightModal from "./CancelFlightModal";
import ViewTicketsModal from "./ViewTicketsModal";
import { printTicket } from "../utilities/helpers";

const FlightsData = ({ columns, rows, title }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRow, setSelectedRow] = React.useState(null); // State to track selected row
  const [anchorEl, setAnchorEl] = React.useState(null); // State for dropdown menu

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

  // const handleSearch = (event) => {
  //   setSearchQuery(event.target.value);
  //   setPage(0);
  // };

  const handleRowClick = (event, rowIndex) => {
    setSelectedRow(rowIndex);
    setSelectedFlight(rows[rowIndex]);
    setAnchorEl(event.currentTarget); // Open dropdown menu
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null); // Close dropdown menu
  };

  // const filteredRows = rows.filter((row) =>
  //   Object.values(row).some(
  //     (value) =>
  //       typeof value === "string" &&
  //       value.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );

  // console.log(filteredRows)
  // console.log(rows)

  return (
    <Container
      component="main"
      maxWidth="l"
      style={{ marginTop: "2%", marginBottom: "2%" }}
    >
      <Card elevation={20}>
        <CardContent>
          <Typography sx={{ flex: "1 1 100%" }} variant="h5">
            {title}
          </Typography>
          {title === "Available Flights" && (
            <TextField
              label="Search"
              variant="outlined"
              // value={searchQuery}
              // onChange={handleSearch}
              style={{ marginBottom: "10px" }}
            />
          )}
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyheader="true" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <strong>{column.label}</strong>
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
                        style={{ cursor: "pointer" }}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={rowIndex}
                        onClick={(event) => handleRowClick(event, rowIndex)}
                      >
                        {columns.map((column, colIndex) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={colIndex} align={column.align}>
                              {value}
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
                  flight={selectedFlight}
                  open={openCompleteFlightModal}
                  close={setOpenCompleteFlightModal}
                  setSelectedFlight={setSelectedFlight}
                />
                <CancelFlightModal
                  flight={selectedFlight}
                  open={openCancelFlightModal}
                  close={setOpenCancelFlightModal}
                  setSelectedFlight={setSelectedFlight}
                />
                <ViewTicketsModal
                  flight={selectedFlight}
                  open={openViewTicketsModal}
                  close={setOpenViewTicketsModal}
                  setSelectedFlight={setSelectedFlight}
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

          {/* Dropdown for displaying additional information */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseDropdown}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {selectedRow !== null && (
              <MenuItem>
                {title === "Available Flights" ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedRow(null);
                        setAnchorEl(null);
                        setOpenBookFlightModal(true);
                      }}
                    >
                      Book
                    </Button>
                  </>
                ) : title === "Booked Flights" ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedRow(null);
                        setAnchorEl(null);
                        printTicket(selectedFlight, "client");
                      }}
                    >
                      Ticket
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedRow(null);
                        setAnchorEl(null);
                        setOpenChangeFlightModal(true);
                      }}
                    >
                      Change
                    </Button>
                  </>
                ) : title === "Active Flights" ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedRow(null);
                        setAnchorEl(null);
                        setOpenCompleteFlightModal(true);
                      }}
                    >
                      Complete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedRow(null);
                        setAnchorEl(null);
                        setOpenCancelFlightModal(true);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedRow(null);
                        setAnchorEl(null);
                        setOpenViewTicketsModal(true);
                      }}
                    >
                      View
                    </Button>
                  </>
                )}
              </MenuItem>
            )}
          </Menu>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FlightsData;
