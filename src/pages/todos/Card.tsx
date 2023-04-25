import React, { memo, useEffect, useState } from "react"
import {
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  IconButton, 
  TextField, 
  Tooltip, 
  Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { 
  deleteToActionSyn, 
  fetchTodoActionSyn, 
  updateTodoActionSyn 
} from "../../features/todos/actions";
import Swal from "sweetalert2";
import { Todo } from "../../interfaces/todo";


const CardComponent = () => {
    const [isEmpty, setIsEmpty] = useState(false);
    const { todosList } = useSelector((state: RootState) => state.todoMgt);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [todoToUpdate, setTodoToUpdate] = useState<Todo | null>(null);
    const [todo, setTodo] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    const handleOpen = (todo: Todo | undefined): void => {
      if (!todo) return;
      setOpen(true);
      setTodoToUpdate(todo || null);
      setTodo(todo && todo.todo ? todo.todo : '');
    };

    const handleClose = () => {
      setOpen(false);
      setTodoToUpdate(null);
      setTodo('');
      setIsCompleted(false);
    };

    const handleCompletedChange = (todo: Todo | null | undefined, event: React.MouseEvent<HTMLButtonElement>): void => {
      if(!todo) return;
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      if (todo.hasOwnProperty('id')) {
        dispatch(updateTodoActionSyn(updatedTodo));
      }
      setTodoToUpdate(todo || null);
    }

    useEffect(() => {
        dispatch(fetchTodoActionSyn());
    }, []);

    const handleDelete = (id: any) => {
      dispatch(deleteToActionSyn(id));
    };

    const onSubmit = (evt: any) => {
      evt.preventDefault();

      if (!todo) {
        setIsEmpty(true);
        return;
      }
    
      const updatedTodo: Todo = {
        id: todoToUpdate!.id,
        todo,
        isCompleted: todoToUpdate!.isCompleted,
        createdDt: todoToUpdate!.createdDt,
      };
    
      dispatch(updateTodoActionSyn(updatedTodo, todoToUpdate!.id));
      handleClose();
    };

    const showModalAlert = (id: any) => {
      Swal.fire({
        title: 'Are you sure to delete todo?',
        showDenyButton: true,
        icon: 'warning',
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(id);
          Swal.fire(`Todo record delete successfully!.`, '', 'success')
        }
      })
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo Title"
            type="text"
            value={todo}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            error={isEmpty}
            fullWidth
            variant="standard"
            InputProps={{
              endAdornment: isEmpty && (
                  <span style={{ color: 'red' }}>Required!</span>
              ),
            }}
            required 
          />          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
           type="submit" onClick={onSubmit}
          >Save</Button>
        </DialogActions>
      </Dialog>
      {todosList.map((item, index)=>(
        <Card key={index} sx={{ minWidth: 275, marginTop: '20px'}}>
        <CardContent>
          <div style={{
                display: 'flex', 
                color: 'gray', 
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif', 
                fontSize: '1rem',
                fontWeight: 400
              }}
          >
          Title Todo: 
            <Typography sx={{ textDecoration: item.isCompleted ? 'line-through' : 'none', ml: 1 }}>
              {item.todo}
            </Typography> 
          </div>
          <div style={{display: 'flex'}}>
          <p style={{
            color: 'gray', 
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif', 
            fontSize: '1rem', 
            fontWeight: 400
            }}
            > Status Todo: </p>
              <Tooltip 
                title={item.isCompleted ? 'Mark as Uncomplete' : 'Mark as Complete'} 
                placement="right-start"
              >
                <CheckIcon color={item.isCompleted ? 'primary' : 'error'} sx={{ mt: 1.5 }}
                  onClick={(event: any) => handleCompletedChange(item, event)} 
                />
              </Tooltip> 
          </div>
          <Typography sx={{ mb: 1.5}} color="text.secondary">
            Created Date: {item.createdDt}
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Remove">
            <IconButton color="error" 
              onClick={(e) => {
                  e.stopPropagation()
                    showModalAlert(item.id)
                  }}>
              <DeleteOutlineIcon  sx={{marginRight: '0px'}} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => handleOpen(item)}>
              <EditOutlinedIcon sx={{ marginRight: '0px' }} />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      ))}
      </>
    )
}

export default memo(CardComponent);