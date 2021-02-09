import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";

const WatchList: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDos, setToDos] = useState<any>([]);

  const handleChangeChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (toDos) {
      const foundToDo = toDos.find((el: any) => el.id === id);
      
      if (foundToDo) {
        foundToDo.isCompleted = event.target.checked;
        const updatedArray = toDos.filter((x: any) => x.id !== foundToDo.id);

        setToDos([...updatedArray, foundToDo]);
      }
    }

  };

  const handleAddItem = () => {
    const obj = {
      id: uuidv4(),
      title: inputValue,
      isCompleted: false,
    };

    if (toDos) {
      setToDos([...toDos, obj]);
      setInputValue("");
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("toDos");

    if (data !== null) {
      setToDos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (toDos !== undefined) {
      localStorage.setItem("toDos", JSON.stringify(toDos));
    }
  }, [toDos]);

  const handleDelete = (id: string) => {
    const updatedArray = toDos.filter((el: any) => el.id !== id);
    setToDos(updatedArray);
  };

  return (
    <>
      <Box display="flex">
        <TextField
          label="Outlined"
          variant="outlined"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button variant="contained" onClick={handleAddItem}>
          Add
        </Button>
      </Box>
      <List component="nav" aria-label="secondary mailbox folders">
        {toDos?.map((toDo: any) => (
          <ListItem key={toDo.id}>
            <Checkbox
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
              checked={toDo.isCompleted}
              onChange={(event) => handleChangeChecked(event, toDo.id)}
            />
            <ListItemText primary={toDo.title} />
            <Button variant="contained" onClick={() => handleDelete(toDo.id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default WatchList;
