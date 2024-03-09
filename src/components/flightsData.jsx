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

const FlightsData = ({ columns, rows, title }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container component="main" maxWidth="l">
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
                                <Button variant="contained" color="primary">
                                  Book
                                </Button>
                              ) : column.id === "actionPrintTicket" ? (
                                // Render something else for "someOtherColumn"
                                <Button variant="contained" color="primary">
                                  Ticket
                                </Button>
                              ) : column.id === "actionChange" ? (
                                // Render something else for "someOtherColumn"
                                <Button variant="contained" color="primary">
                                  Change
                                </Button>
                              ) : column.id === "actionComplete" ? (
                                // Render something else for "someOtherColumn"
                                <Button variant="contained" color="primary">
                                  Complete
                                </Button>
                              ) : column.id === "actionCancel" ? (
                                // Render something else for "someOtherColumn"
                                <Button variant="contained" color="primary">
                                  Cancel
                                </Button>
                              ) : column.id === "actionViewTickets" ? (
                                // Render something else for "someOtherColumn"
                                <Button variant="contained" color="primary">
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
