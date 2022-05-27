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
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const tasks: Task[] = selectAllTasks();
  const loading: string = selectTaskLoading();

  const [selectedTask, setSelectedTask] = useState<Task>();

  // Form
  const { control, getValues, reset } = useForm({
    defaultValues: INITIAL_FORM_VALUES,
    resolver: yupResolver(newTaskSchema)
  });

  const handleSubmitForm = async () => {
    try {
      const title = getValues('title');
      const newTask = { title, status: TASK_STATUS.BACKLOG };
      dispatch(taskActions.createTask(newTask));
      reset();
    } catch (err) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  const handleCreateTask = (e: any) => {
    if (e.code === 'Enter') {
      handleSubmitForm();
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

  const RowMenu = ({ taskId }: { taskId: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLELement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleDeleteTask = (id: string) => async () => {
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
      <>
        <IconButton sx={styles.buttonStyles} onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <MenuItem onClick={handleDeleteTask(taskId)}>Delete</MenuItem>
        </Menu>
      </>
    );
  };

  return (
    <PageContainer title='Tasks' loading={loading === LOADING_STATE.LOADING}>
      <Box sx={styles.wrapperStyles}>
        <Box sx={styles.formStyles}>
          <FormTextField control={control} name="title" onKeyDown={handleCreateTask} />
        </Box>
        <Box sx={styles.listWrapperStyles}>
          <List dense sx={styles.listStyles}>
            {tasks.map((task) => {
              return (
                <ListItem
                  sx={styles.listItemStyles}
                  disablePadding
                  key={task.id}
                  secondaryAction={(<RowMenu taskId={task.id} />)}
                >
                  <Radio
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                    onClick={handleCompleteTask(task)}
                    sx={{ p: 0, mr: 2 }}
                    checked={task?.status === TASK_STATUS.DONE}
                  />
                  <ListItemButton
                    disableRipple
                    sx={styles.buttonStyles}
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
                        }}><AutorenewIcon sx={{ color: grey[400], width: 18, height: 18 }} /></Box>
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
      </Box>
      {selectedTask && (<TaskDetail open={Boolean(selectedTask)} task={selectedTask} onClose={handleCloseTask} />)}
    </PageContainer>
  );
};

export default Tasks;
