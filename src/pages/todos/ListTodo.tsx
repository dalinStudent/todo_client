import React, { memo, useEffect, useState } from "react";
import Card from "./Card";
import { Box, Button, Grid, Paper, TextField, styled } from "@mui/material";
import { createTodoActionSyn } from "../../features/todos/actions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary
}));

const ListTodo = () => {
  const { todosList } = useSelector((state: RootState) => state.todoMgt);
  const [filteredTodos, setFilteredTodos] = useState(todosList);
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setFilteredTodos(todosList);
  }, [todosList]);

  const onSubmit = (evt: any) => {
    evt.preventDefault();

    if (!todo) {
      setIsEmpty(true);
      return;
    }

    const newTodo = {
      todo: todo,
      isCompleted: isCompleted
    };

    dispatch(createTodoActionSyn(newTodo));

    setTodo("");
    setIsCompleted(false);
  };
  const handleInputChange = (evt: any) => {
    setTodo(evt.target.value);
    setIsEmpty(false);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      onSubmit(event);
    }
  };

  const handleSearchChange = (evt: any) => {
    const searchText = evt.target.value;
    setSearchText(searchText);
    const filteredTodos = todosList.filter(todoItem =>
      todoItem.todo.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredTodos(filteredTodos);
  };

  return (
    <>
      <Grid sx={{ margin: "50px" }}>
        <TextField
          id="todo"
          size="small"
          label="Todo Title"
          value={todo}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          error={isEmpty}
          InputProps={{
            endAdornment: isEmpty && (
              <span style={{ color: "red" }}>Required!</span>
            )
          }}
          required
        />
        <Button sx={{ ml: 1 }} variant="contained" onClick={onSubmit}>
          Create New
        </Button>
        <br></br>
        <TextField
          margin="dense"
          label="Search"
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          variant="standard"
        />
        {filteredTodos && (
          <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4} sx={{ marginBottom: "20px" }}>
                <Item sx={{ backgroundColor: "teal" }}>
                  <Card todoProps={filteredTodos} />
                </Item>
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default memo(ListTodo);
