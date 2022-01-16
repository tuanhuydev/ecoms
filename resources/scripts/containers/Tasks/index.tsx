import PageContainer from '@components/PageContainer';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { TASK_STATUS } from '../../configs/constants';
import { Task } from '../../interfaces/Task';
import { AppDispatch } from '../../store';
import { selectAllTasks, taskActions } from '../../store/slices/taskSlice';
import { newTaskSchema } from './schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosResponse } from 'axios';
import TaskService from '../../services/TaskService';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Radio from '@mui/material/Radio';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

const INITIAL_FORM_VALUES = {
  title: '',
  status: TASK_STATUS.BACKLOG
};

const Tasks = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks: Task[] = selectAllTasks();

  // Form
  const { control, getValues, resetField, formState: { errors } } = useForm({
    defaultValues: INITIAL_FORM_VALUES,
    resolver: yupResolver(newTaskSchema)
  });

  const onSubmitForm = async () => {
    try {
      const title = getValues('title');
      const newTask = { title, status: TASK_STATUS.BACKLOG };
      const { data }: AxiosResponse = await TaskService.createTask(newTask);
      dispatch(taskActions.addTask({ taskId: data?.taskId, ...newTask } as Task));
      resetField('title');
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnterTitle = (e: any) => {
    if (e.code === 'Enter') {
      onSubmitForm();
    }
  };

  const handleCompleteTask = (task: Task) => async (e: any) => {
    try {
      const { data }: AxiosResponse = await TaskService.updateTask({ task_id: task.taskId, status: TASK_STATUS.DONE });
      if (data?.success) {
        dispatch(taskActions.updateTask({
          ...task,
          status: TASK_STATUS.DONE
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(taskActions.fetchTasks());
  }, []);

  return (
    <PageContainer title='Tasks'>
      <Card sx={{ px: 2 }}>
        <Box sx={{ display: 'flex', width: '100%', py: 2 }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, name, ref, value } }) => (
                  <TextField
                    fullWidth
                    label="New Task"
                    id="newTaskForm"
                    value={value}
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onKeyDown={handleEnterTitle}
                  />
                )}
              />
              {errors.title && <div>This is required</div>}
            </Box>
          </div>
        </Box>
        <Box>
          <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {tasks.map((task) => {
              return (
                <ListItem
                  key={task.taskId}
                  disabled={task.status === TASK_STATUS.DONE}
                  secondaryAction={(
                    <Radio
                      edge="end"
                      onChange={handleCompleteTask(task)}
                      checked={task.status === TASK_STATUS.DONE}
                    />
                  )}
                >
                  <ListItemButton>
                    <Typography noWrap>{task.title}</Typography>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Card>
    </PageContainer>
  );
};

export default Tasks;
