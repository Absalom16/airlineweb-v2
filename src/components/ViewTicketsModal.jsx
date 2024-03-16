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
} from "@mui/material";
import BasicModal from "./Modal";
import { getTickets, printTicket } from "../utilities/helpers";

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
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={12}>
                      {`Flight ${flight.flightNumber} Booked Tickets`}
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
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
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
