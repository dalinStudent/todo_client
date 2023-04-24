import React, { memo, useState } from "react"
import CardComponent from "./Card";
import { Box, Button, Grid, Paper, TextField, styled } from "@mui/material";
import { createTodoActionSyn } from "../../features/todos/actions";
import { useDispatch } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

const ListTodo = () => {
    const [todo, setTodo] = useState('');
    const dispatch = useDispatch();
    const [isCompleted, setIsCompleted] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const onSubmit = (evt: any) => {
        evt.preventDefault();

        if (!todo) {
            setIsEmpty(true);
            return;
        }

        const newTodo = {
            todo: todo,
            isCompleted: isCompleted,
        }

        dispatch(createTodoActionSyn(newTodo))
        
        setTodo('');
        setIsCompleted(false);
    
    }
    const handleInputChange = (evt: any) => {
        setTodo(evt.target.value);
        setIsEmpty(false);
      };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
          onSubmit(event);
        }
      };

    return (
        <>
            <Grid sx={{margin: '50px'}}>
                <TextField 
                    id="todo" 
                    size="small" 
                    label="Todo Title" 
                    value={todo} 
                    variant="outlined" 
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    error={isEmpty}
                    InputProps={{
                        endAdornment: isEmpty && (
                        <span style={{ color: 'red' }}>Required!</span>
                        ),
                    }}
                    required 
                />
                <Button sx={{marginLeft: '10px'}} variant="contained" onClick={onSubmit}>Create New</Button>
                <Box sx={{ flexGrow: 1, marginTop: '20px'}}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4} sx={{ marginBottom: '20px' }}>
                            <Item sx={{backgroundColor: 'teal'}}>
                                <CardComponent /> 
                            </Item>
                        </Grid>
                    </Grid>
                </Box>         
            </Grid>
        </>
    )
}

export default memo(ListTodo);