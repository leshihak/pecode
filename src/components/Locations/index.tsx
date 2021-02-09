import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  table: {
    minWidth: 650,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  marginTop: {
    marginTop: 20,
  },
  center: {
    maxWidth: 300,
    margin: "0 auto",
    paddingTop: 15,
  },
}));

interface LocationsProps {
  rows: {
    name: string;
    type: string;
    dimension: string;
  }[];
  count: number;
  onCurrentPage: CallableFunction;
  currentPage: number;
  onFilterByName: CallableFunction;
  onFilterByType: CallableFunction;
  onFilterByDimension: CallableFunction;
  filterByName: string;
  filterByType: string;
  filterByDimension: string;
}

const Locations: React.FC<LocationsProps> = ({
  rows,
  count,
  onCurrentPage,
  currentPage,
  onFilterByName,
  onFilterByType,
  onFilterByDimension,
  filterByName,
  filterByType,
  filterByDimension,
}) => {
  const classes = useStyles();

  const handleChangePage = async (event: any, page: number) => {
    onCurrentPage(page);
  };

  return (
    <>
      <TextField
        label="Filter by Name"
        variant="outlined"
        onChange={(event) => onFilterByName(event.target.value)}
        value={filterByName}
      />
      <TextField
        label="Filter by Type"
        variant="outlined"
        onChange={(event) => onFilterByType(event.target.value)}
        value={filterByType}
      />
      <TextField
        label="Filter by Dimension"
        variant="outlined"
        onChange={(event) => onFilterByDimension(event.target.value)}
        value={filterByDimension}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Dimension</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.dimension}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={classes.root}>
        <Pagination
          count={count}
          onChange={handleChangePage}
          page={currentPage}
        />
      </div>
    </>
  );
};

export default Locations;
