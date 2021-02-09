import React, { useState } from "react";
import { Character } from "../../store/character";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Pagination from "@material-ui/lab/Pagination";
import List from "@material-ui/core/List";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import CharacterInfoCard from "../UI/InfoCard";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
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
  })
);

interface CharactersProps {
  count: number;
  characters: Character[];
  onCurrentPage: CallableFunction;
  currentPage: number;
  onFilterBySpecies: CallableFunction;
  onFilterByStatus: CallableFunction;
  onFilterByGender: CallableFunction;
  filterBySpecies: string;
  filterByStatus: string;
  filterByGender: string;
}

const Characters: React.FC<CharactersProps> = ({
  onFilterBySpecies,
  onFilterByStatus,
  onFilterByGender,
  filterBySpecies,
  filterByStatus,
  filterByGender,
  count,
  characters,
  onCurrentPage,
  currentPage,
}) => {
  const classes = useStyles();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [foundCharacter, setFoundCharacter] = useState<Character | null>();

  const handleChangePage = (event: any, page: number) => {
    onCurrentPage(page);
  };

  const handleClick = (id: number) => {
    const _foundCharacter = characters.find((el: Character) => el.id === id);
    setFoundCharacter(_foundCharacter);
    setIsOpenModal(true);
  };

  return (
    <>
      <TextField
        label="Filter by Species"
        variant="outlined"
        onChange={(event) => onFilterBySpecies(event.target.value)}
        value={filterBySpecies}
      />
      <TextField
        label="Filter by Status"
        variant="outlined"
        onChange={(event) => onFilterByStatus(event.target.value)}
        value={filterByStatus}
      />
      <TextField
        label="Filter by Gender"
        variant="outlined"
        onChange={(event) => onFilterByGender(event.target.value)}
        value={filterByGender}
      />
      <Box display="flex" justifyContent="space-between">
        <Box>Name</Box>
        <Box>Species</Box>
        <Box>Status</Box>
        <Box>Gender</Box>
        <Box>Image</Box>
      </Box>
      <List component="nav" aria-label="secondary mailbox folders">
        {characters.map((character: Character) => (
          <ListItem button onClick={() => handleClick(character.id)}>
            <ListItemText primary={character.name} />
            <ListItemText primary={character.species} />
            <ListItemText primary={character.status} />
            <ListItemText primary={character.gender} />
            <img alt={`icon ${character.name}`} src={character.image} />
          </ListItem>
        ))}
      </List>
      <div className={classes.root}>
        <Pagination
          count={count}
          onChange={handleChangePage}
          page={currentPage}
        />
      </div>
      {isOpenModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isOpenModal}>
            <div className={classes.paper}>
              <h2>Character Information</h2>
              {foundCharacter && (
                <CharacterInfoCard
                  name={foundCharacter.name}
                  image={foundCharacter.image}
                  episode={foundCharacter.episode}
                  gender={foundCharacter.gender}
                  species={foundCharacter.species}
                  status={foundCharacter.status}
                  type={foundCharacter.type}
                  url={foundCharacter.url}
                  created={foundCharacter.created}
                />
              )}
            </div>
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default Characters;
