import React, { memo, useEffect, useState } from "react"
import {
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  Checkbox, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  FormControlLabel, 
  IconButton, 
  TextField, 
  Tooltip, 
  Typography
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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
    const { todosList } = useSelector((state: RootState) => state.todoMgt);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [todoToUpdate, setTodoToUpdate] = useState<Todo | null>(null);
    const [todo, setTodo] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const id = todosList.find((t) => t.id === todo);

    const handleOpen = (todo: Todo | undefined): void => {
      if (!todo) return;
      setOpen(true);
      setTodoToUpdate(todo || null);
      setTodo(todo && todo.todo ? todo.todo : '');
      setIsCompleted(todo && todo.isCompleted ? todo.isCompleted : false);
    };
    

    const handleClose = () => {
      setOpen(false);
      setTodoToUpdate(null);
      setTodo('');
      setIsCompleted(false);
    };

    const handleCompletedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      setIsCompleted(checked);
    };

    useEffect(() => {
        dispatch(fetchTodoActionSyn());
    }, []);

    const handleDelete = (id: any) => {
      dispatch(deleteToActionSyn(id));
    };

    const onSubmit = (evt: any) => {
      evt.preventDefault();
    
      const updatedTodo: Todo = {
        id: todoToUpdate!.id,
        todo,
        isCompleted,
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

    return (
      <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Todo Title"
            type="text"
            value={todo}
              onChange={(e) => setTodo(e.target.value)}
            fullWidth
            variant="standard"
          />
            <FormControlLabel
              control={<Checkbox checked={isCompleted} onChange={handleCompletedChange} />}
              label="Completed"
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
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Title Todo: {item.todo}
          </Typography>
          <div style={{display: 'flex'}}>
          <p style={{
            color: 'gray', 
            fontFamily: '"Roboto","Helvetica","Arial",sans-serif', 
            fontSize: '1rem', 
            fontWeight: 400
            }}
            > Status Todo: </p>
            {item.isCompleted === true 
              ? <Checkbox defaultChecked /> 
              : <Checkbox />
            }
          </div>
          <Typography sx={{ mb: 1.5}} color="text.secondary">
            Created Date: {item.createdDt}
          </Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Remove">
            <IconButton color="error">
              <DeleteOutlineIcon  sx={{marginRight: '0px'}}
                onClick={(e) => {
                  e.stopPropagation()
                    showModalAlert(item.id)
                  }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => handleOpen(item)}>
              <EditOutlinedIcon sx={{marginRight: '0px'}} />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      ))}
      </>
    )
}

export default memo(CardComponent);