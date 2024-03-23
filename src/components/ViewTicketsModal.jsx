import { useState, useEffect } from "react";
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
  Typography,
} from "@mui/material";
import BasicModal from "./Modal";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { getTickets, printTicket } from "../utilities/helpers";

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

export default function ViewTicketsModal({ open, close, flight }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "passengers", label: "Passengers", minWidth: 170 },
    { id: "seats", label: "Seats", minWidth: 100 },
    { id: "cost", label: "Cost", minWidth: 170 },
    { id: "selectedClass", label: "Class", minWidth: 170 },
  ];

  useEffect(() => {
    getTickets(flight, (data) => {
      setRows(data);
    });
  }, [flight]);

  return (
    <BasicModal open={open} close={close}>
      <Container
        component="main"
        maxWidth="l"
        style={{ marginTop: "2%", marginBottom: "2%" }}
      >
        <Card elevation={20}>
          <CardContent>
            <Typography sx={{ flex: "1 1 100%" }} variant="h6">
              {`Flight ${flight.flightNumber} Booked Tickets`}
            </Typography>

            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyheader="true" aria-label="sticky table">
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
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, rowIndex) => {
                      return (
                        <StyledTableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={rowIndex}
                        >
                          {columns.map((column, colIndex) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={colIndex} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </StyledTableRow>
                      );
                    })}
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          printTicket(rows, "admin");
        }}
      >
        Print
      </Button>
    </BasicModal>
  );
}
