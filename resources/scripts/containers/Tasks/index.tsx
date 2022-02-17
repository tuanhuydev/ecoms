import { AppDispatch } from '@store/index';
import { AxiosResponse } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { TASK_STATUS } from '../../configs/constants';
import { Task } from '../../interfaces/Task';
import { newTaskSchema } from './schemas';
import { selectAllTasks, taskActions } from '@store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import PageContainer from '@components/base/PageContainer';
import React, { useEffect, useState } from 'react';
import TaskDetail from '@components/pages/Tasks/TaskDetail';
import TaskService from '../../services/TaskService';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const INITIAL_FORM_VALUES = {
  title: '',
  description: '',
  status: TASK_STATUS.BACKLOG
};

const Tasks = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks: Task[] = selectAllTasks();

  const [selectedTask, setSelectedTask] = useState<Task>();

  // Form
  const { control, getValues, reset, formState: { errors } } = useForm({
    defaultValues: INITIAL_FORM_VALUES,
    resolver: yupResolver(newTaskSchema)
  });

  const onSubmitForm = async () => {
    try {
      const title = getValues('title');
      const newTask = { title, status: TASK_STATUS.BACKLOG };
      const { data }: AxiosResponse = await TaskService.createTask(newTask);
      dispatch(taskActions.addTask({ id: data?.id, ...newTask } as Task));
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnterTitle = (e: any) => {
    if (e.code === 'Enter') {
      onSubmitForm();
    }
  };

  const handleCompleteTask = (task: Task) => async () => {
    try {
      const taskStatus = task.status === TASK_STATUS.DONE ? TASK_STATUS.BACKLOG : TASK_STATUS.DONE;
      const { data }: AxiosResponse = await TaskService.updateTask({ id: task.id, status: taskStatus });
      if (data?.success) dispatch(taskActions.updateTask({ ...task, status: taskStatus }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenTask = (task: Task) => () => setSelectedTask(task);
  const handleCloseTask = () => setSelectedTask(null);

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
                  key={task.id}
                  secondaryAction={(
                    <Checkbox
                      onChange={handleCompleteTask(task)}
                      checked={task.status === TASK_STATUS.DONE}
                    />
                  )}
                >
                  <ListItemButton onClick={handleOpenTask(task)} disabled={task.status === TASK_STATUS.DONE}>
                    <Typography noWrap>{task.title}</Typography>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Card>
      {selectedTask && (<TaskDetail open={!!selectedTask} task={selectedTask} onClose={handleCloseTask} />)}
    </PageContainer>
  );
};

export default Tasks;
