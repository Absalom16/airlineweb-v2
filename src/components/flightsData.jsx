import { useState } from "react";
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
  // MenuItem,
  Alert,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import BookFlightModal from "./BookFlightModal";
import ChangeFlightModal from "./ChangeFlightModal";
import CompleteFlightModal from "./CompleteFlightModal";
import CancelFlightModal from "./CancelFlightModal";
import ViewTicketsModal from "./ViewTicketsModal";
import { printTicket } from "../utilities/helpers";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FlightsData = ({ columns, rows, title }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState(null); // State to track selected row
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu
  const [openAlert, setOpenAlert] = useState(true);

  const [openBookFlightModal, setOpenBookFlightModal] = useState(false);
  const [openChangeFlightModal, setOpenChangeFlightModal] = useState(false);
  const [openCompleteFlightModal, setOpenCompleteFlightModal] = useState(false);
  const [openCancelFlightModal, setOpenCancelFlightModal] = useState(false);
  const [openViewTicketsModal, setOpenViewTicketsModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleRowClick = (event, rowIndex) => {
    setSelectedRow(rowIndex);
    // setSelectedFlight(rows[rowIndex]);
    setAnchorEl(event.currentTarget); // Open dropdown menu
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null); // Close dropdown menu
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Container component="main" maxWidth="l" style={{ padding: "6%" }}>
      <div
        style={{ position: "absolute", top: "10%", left: "50%", right: "0%" }}
      >
        {openAlert && (
          <div
            style={{
              display: "flex",
            }}
          >
            <Alert
              severity="info"
              onClose={handleCloseAlert}
              sx={{
                textAlign: "center",
              }}
            >
              Tap on a flight for action.
            </Alert>
          </div>
        )}
      </div>
      <Card elevation={20}>
        <CardContent>
          <Typography sx={{ flex: "1 1 100%" }} variant="h5">
            {title}
          </Typography>
          <div style={{ display: "flex", marginBottom: "10px" }}>
            {title === "Available Flights" && (
              <TextField
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                style={{ marginRight: "10px" }}
              />
            )}
          </div>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyheader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      <strong>{column.label}</strong>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(title === "Available Flights" ? filteredRows : rows)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    return (
                      <StyledTableRow
                        style={{ cursor: "pointer" }}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={rowIndex}
                        onClick={(event) => {
                          handleRowClick(event, rowIndex);
                          setSelectedFlight(row);
                        }}
                      >
                        {columns.map((column, colIndex) => {
                          const value = row[column.id];
                          return (
                            <StyledTableCell
                              key={colIndex}
                              align={column.align}
                            >
                              {value}
                            </StyledTableCell>
                          );
                        })}
                      </StyledTableRow>
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
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            // sx={{ flex: "1 1 100%" }}
          >
            {selectedRow !== null && (
              <div style={{ margin: "10px" }}>
                {title === "Available Flights" ? (
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
                    <br />
                    <br />
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
                    <br />
                    <br />
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
                )}
              </div>
            )}
          </Menu>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FlightsData;
