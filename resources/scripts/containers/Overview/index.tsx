import { AxiosResponse } from 'axios';
import { EMPTY_STRING } from '../../configs/constants';
import { TASK_STATUS } from '../../configs/enums';
import { Task } from '../../interfaces/Task';
import { selectBacklogTasks, taskActions } from '@store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Button from '@mui/material/Button';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PageContainer from '@components/base/PageContainer';
import React, { useEffect, useState } from 'react';
import TaskService from '@services/TaskService';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Overview() {
  const dispatch = useDispatch();
  const tasks = selectBacklogTasks();

  useEffect(() => {
    dispatch(taskActions.fetchTasks());
  }, []);

  const [taskTitle, setTitle] = useState(EMPTY_STRING);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleAddTask = async () => {
    try {
      if (taskTitle) {
        const newTask: Partial<Task> = { title: taskTitle, status: TASK_STATUS.BACKLOG };
        const { data }: AxiosResponse = await TaskService.createTask(newTask);
        if (data?.id) {
          dispatch(taskActions.addTask({ id: data?.id, ...newTask } as Task));
          setTitle(EMPTY_STRING);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleConpleteTask = (id: number) => async () => {
    try {
      const { data }: AxiosResponse = await TaskService.deleteTask(id);
      if (data?.success) {
        dispatch(taskActions.completeTask(id));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <PageContainer title="Overview">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container>
          <Grid item md={5} lg={6}>
            <Grid container spacing={2} sx={{ p: 4, display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                id="standard"
                label="Let do something"
                variant="standard"
                sx={{ flexGrow: 1, mr: 2, mb: 2 }}
                onChange={handleInputChange}
                value={taskTitle}
              />
              <Button variant="outlined" onClick={handleAddTask}>Add new task</Button>
            </Grid>
            <List>
              {tasks.map((task: Task) => (
                <ListItem key={task.id}>
                  <ListItemButton
                    onClick={handleConpleteTask(task.id)}
                    dense
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <Typography noWrap sx={{ overflowWrap: 'break-word', width: 350 }}>{task.title}</Typography>
                    <Chip label={task.status} color={
                      task.status === TASK_STATUS.PROGRESS
                        ? 'warning'
                        : task.status === TASK_STATUS.DONE
                          ? 'success'
                          : 'primary'} variant="outlined" />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item md={5} lg={6}>
            <CalendarPicker date={new Date()} onChange={() => {}} />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </PageContainer>
  );
}
