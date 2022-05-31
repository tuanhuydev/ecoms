import { AppDispatch } from '@store/index';
import { AxiosResponse } from 'axios';
import { LOADING_STATE, TASK_STATUS } from '../../configs/enums';
import { Task } from '../../interfaces/Task';
import { grey } from '@mui/material/colors';
import { newTaskSchema } from './schemas';
import { selectAllTasks, selectTaskLoading, taskActions } from '@store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormTextField from '@components/form/FormTextField';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PageContainer from '@components/base/PageContainer';
import Radio from '@mui/material/Radio';
import React, { useEffect, useState } from 'react';
import TaskDetail from '@components/pages/Tasks/TaskDetail';
import TaskService from '../../services/TaskService';
import Typography from '@mui/material/Typography';

const INITIAL_FORM_VALUES = {
  title: '',
  description: '',
  status: TASK_STATUS.BACKLOG
};

const Tasks = () => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const tasks: Task[] = selectAllTasks();
  const loading: string = selectTaskLoading();

  const [selectedTask, setSelectedTask] = useState<Task>();
  const { enqueueSnackbar } = useSnackbar();

  // Form
  const { control, getValues, reset } = useForm({
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
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  const handleCreateTask = (e: any) => {
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
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  const handleOpenTask = (task: Task) => () => setSelectedTask(task);
  const handleCloseTask = () => setSelectedTask(null);

  useEffect(() => {
    dispatch(taskActions.fetchTasks());
  }, []);

  return (
    <PageContainer title='Tasks' loading={loading === LOADING_STATE.LOADING}>
      <Box sx={{ pt: 2, pb: 1 }}>
        <FormTextField control={control} name="title" onKeyDown={handleCreateTask} />
      </Box>
      <Box>
        <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {tasks.map((task) => {
            return (
              <ListItem
                sx={{
                  backgroundColor: grey[200],
                  minHeight: 48,
                  marginBottom: theme.spacing(0.25),
                  borderRadius: theme.spacing(0.25)
                }}
                disablePadding
                key={task.id}
                secondaryAction={(
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                )}
              >
                <Radio
                  onClick={handleCompleteTask(task)}
                  checked={task?.status === TASK_STATUS.DONE}
                />
                <ListItemButton
                  disableRipple
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent'
                    },
                    '&:focus': {
                      backgroundColor: 'transparent'
                    }
                  }}
                  onClick={handleOpenTask(task)}
                >
                  <Typography noWrap sx={{ width: 400 }}>{task.title}</Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        WebkitAlignItems: 'center',
                        marginRight: theme.spacing(0.5),
                        color: grey[400]
                      }}><AutorenewIcon sx={{ color: grey[400], width: 18, height: 18 }} />:</Box>
                    <Chip
                      size="small"
                      label={task?.status.toLowerCase()}
                      sx={{
                        textTransform: 'capitalize',
                        width: 80
                      }}

                      color={
                        task.status === TASK_STATUS.DONE
                          ? 'success'
                          : task.status === TASK_STATUS.PROGRESS
                            ? 'warning'
                            : 'primary'
                      } />
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      {selectedTask && (<TaskDetail open={!!selectedTask} task={selectedTask} onClose={handleCloseTask} />)}
    </PageContainer>
  );
};

export default Tasks;
