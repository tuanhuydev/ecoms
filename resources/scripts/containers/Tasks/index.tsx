import { AppDispatch } from '@store/index';
import { AxiosResponse } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { LOADING_STATE, TASK_STATUS } from '../../configs/enums';
import { Task } from '../../interfaces/Task';
import { newTaskSchema } from './schemas';
import { selectAllTasks, selectTaskLoading, taskActions } from '@store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import Input from '@components/base/Input';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PageContainer from '@components/base/PageContainer';
import Radio from '@mui/material/Radio';
import React, { useEffect, useState } from 'react';
import TaskDetail from '@components/pages/Tasks/TaskDetail';
import TaskService from '../../services/TaskService';
import Typography from '@mui/material/Typography';
import getStyles from './styles';

const INITIAL_FORM_VALUES = {
  title: '',
  description: '',
  status: TASK_STATUS.BACKLOG
};

const Tasks = () => {
  const styles = getStyles();
  const dispatch: AppDispatch = useDispatch();
  const tasks: Task[] = selectAllTasks();
  const loading: string = selectTaskLoading();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedTask, setSelectedTask] = useState<Task>();
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const openMenu = Boolean(menuAnchor);

  // Form
  const { control, getValues, handleSubmit, reset } = useForm({
    defaultValues: INITIAL_FORM_VALUES,
    resolver: yupResolver(newTaskSchema)
  });

  const handleCreateTask = () => {
    const title = getValues('title');
    const newTask = { title, status: TASK_STATUS.BACKLOG };
    dispatch(taskActions.createTask(newTask));
    reset();
  };

  const handleCompleteTask = (task: Task) => async () => {
    const taskStatus = task.status === TASK_STATUS.DONE ? TASK_STATUS.BACKLOG : TASK_STATUS.DONE;
    const { data }: AxiosResponse = await TaskService.updateTask({ id: task.id, status: taskStatus });
    if (data?.success) dispatch(taskActions.updateTask({ ...task, status: taskStatus }));
  };

  const handleDeleteTask = () => {
    handleCloseMenu();
    dispatch(taskActions.deleteTask(deleteTaskId));
  };

  const handleOpenTask = (task: Task) => () => setSelectedTask(task);

  const handleCloseTask = () => setSelectedTask(null);

  const handleOpenMenu = (taskId: number) => (event?: React.MouseEvent<HTMLButtonElement>) => {
    setDeleteTaskId(taskId);
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => setMenuAnchor(null);

  useEffect(() => {
    if (!tasks.length) {
      dispatch(taskActions.fetchTasks());
    }
  }, []);

  useEffect(() => {
    if (loading === LOADING_STATE.FAIL) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  }, [loading]);

  const isLoading = loading === LOADING_STATE.LOADING;

  return (
    <PageContainer title='Tasks' loading={isLoading}>
      <Box sx={styles.toolbarStyles}>
        <form onSubmit={handleSubmit(handleCreateTask)}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                autoComplete="off"
                disabled={isLoading}
                className="border-0 border-radius-4 mr-2 w-50"
                placeholder="Create new task"
              />
            )}
          />
        </form>
      </Box>
      <Box sx={styles.listContainerStyles}>
        <List dense>
          {tasks.map((task) => {
            return (
              <ListItem
                sx={styles.listItemStyles}
                disablePadding
                key={task.id}
                secondaryAction={(
                  <IconButton
                    sx={styles.buttonStyles}
                    onClick={handleOpenMenu(task.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )}
              >
                <Radio
                  onClick={handleCompleteTask(task)}
                  checked={task?.status === TASK_STATUS.DONE}
                  sx={styles.buttonStyles}
                  disabled={isLoading}
                />
                <ListItemButton
                  disableRipple
                  disabled={isLoading}
                  sx={styles.buttonStyles}
                  onClick={handleOpenTask(task)}
                >
                  <Typography noWrap sx={{ width: 400 }}>{task.title}</Typography>
                  <Box className="flex">
                    <Box
                      sx={styles.labelStyles}><AutorenewIcon sx={styles.renewIconStyles} /></Box>
                    <Chip
                      size="small"
                      label={task?.status.toLowerCase()}
                      sx={styles.chipStyles}
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
      {deleteTaskId && (<Menu
        anchorEl={menuAnchor}
        open={openMenu}
        onClose={handleCloseMenu}
      >
        <MenuItem
          sx={{ display: 'flex', alignItems: 'center' }}
          onClick={handleDeleteTask}
        >
          <DeleteOutlineIcon fontSize='small' sx={{ mr: 0.5 }} />
          Delete
        </MenuItem>
      </Menu>)}
    </PageContainer>
  );
};

export default Tasks;
