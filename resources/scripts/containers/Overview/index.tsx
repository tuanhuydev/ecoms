import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, completeTask } from '../../slices/taskSlice';
import { RootState } from '../../store';
import { makeRandomString } from '../../utils/helpers';
import { Task } from '../../interfaces/Task';
import { TASK_STATUS } from '../../configs/constants';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const StyledGrid = styled(Grid)(({ theme }) => ({
  background: 'transparent',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

export default function Overview() {
  const [newTaskTitle, setTitle] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: makeRandomString(8),
      title: newTaskTitle,
      status: TASK_STATUS.PENDING
    };
    dispatch(addTask(newTask));
    setTitle('');
  };

  const handleConpleteTask = (taskId: string) => (event: any) => {
    setTimeout(() => {
      dispatch(completeTask(taskId));
    }, 300);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledGrid container spacing={3}>
        <Grid item md={4} lg={3}>
        </Grid>
        <Grid item md={5} lg={4}>
          <Card>
            <CalendarPicker date={new Date()} onChange={() => {}} />
          </Card>
        </Grid>
        <Grid item md={5} lg={5}>
          <Card>
            <Grid container spacing={2} sx={{ p: 4, display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                id="standard"
                label="Let do something"
                variant="standard"
                sx={{ flexGrow: 1, mr: 2 }}
                onChange={handleInputChange}
                value={newTaskTitle}
              />
              <Button variant="outlined" onClick={handleAddTask}>Add new task</Button>
            </Grid>
            <List>
              {tasks.map((task) => (
                <ListItem
                key={task.id}
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleConpleteTask(task.id)}
                  dense
                >
                <ListItemText id={task.id} primary={task.title} />
              </ListItemButton>
            </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </StyledGrid>
    </LocalizationProvider>
  );
}
