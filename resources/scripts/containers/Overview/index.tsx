import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton/ListItemButton';
import { useDispatch } from 'react-redux';
import { selectBacklogTasks, taskActions } from '../../store/slices/taskSlice';
import { Task } from '../../interfaces/Task';
import { EMPTY_STRING, TASK_STATUS } from '../../configs/constants';
import TaskService from '../../services/TaskService';
import { AxiosResponse } from 'axios';
import PageContainer from '@components/PageContainer';
import Chip from '@mui/material/Chip';
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
        if (data?.taskId) {
          dispatch(taskActions.addTask({ taskId: data?.taskId, ...newTask } as Task));
          setTitle(EMPTY_STRING);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleConpleteTask = (taskId: string) => async () => {
    try {
      const { data }: AxiosResponse = await TaskService.deleteTask(taskId);
      if (data?.success) {
        dispatch(taskActions.completeTask(taskId));
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
            <Card sx={{ mr: 1 }}>
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
                  <ListItem
                    key={task.taskId}

                  >
                    <ListItemButton
                      onClick={handleConpleteTask(task.taskId)}
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
            </Card>
          </Grid>
          <Grid item md={5} lg={6}>
            <Card>
              <CalendarPicker date={new Date()} onChange={() => {}} />
            </Card>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </PageContainer>
  );
}
