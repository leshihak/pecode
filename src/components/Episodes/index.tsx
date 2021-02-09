import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
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

interface EpisodesProps {
  rows: {
    name: string;
    episode: string;
    url: string;
    created: string;
  }[];
  count: number;
  onCurrentPage: CallableFunction;
  currentPage: number;
  filterByName: string;
  onFilterByName: CallableFunction;
}

const Episodes: React.FC<EpisodesProps> = ({
  rows,
  filterByName,
  onFilterByName,
  count,
  onCurrentPage,
  currentPage,
}) => {
  const classes = useStyles();

  const handleChangePage = (event: any, page: number) => {
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
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Episode</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.episode}</TableCell>
                <TableCell>{row.url}</TableCell>
                <TableCell>{row.created}</TableCell>
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

export default Episodes;
