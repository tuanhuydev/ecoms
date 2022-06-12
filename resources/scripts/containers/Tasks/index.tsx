import { AppDispatch } from '@store/index';
import { AxiosResponse } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { LOADING_STATE, SEVERITY, TASK_STATUS } from '../../configs/enums';
import { Task } from '../../interfaces/Task';
import { newTaskSchema } from './schemas';
import { selectAllTasks, selectTaskLoading, taskActions } from '@store/slices/taskSlice';
import { selectCurrentUser } from '@store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import BaseSelect from '@components/base/Select';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import FormSelect from '@components/form/FormSelect';
import IconButton from '@mui/material/IconButton';
import Input from '@components/base/Input';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardControlKeyOutlinedIcon from '@mui/icons-material/KeyboardControlKeyOutlined';
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';
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

const TASK_STATUS_OPTIONS = [
  { label: 'Backlog', value: TASK_STATUS.BACKLOG },
  { label: 'Progress', value: TASK_STATUS.PROGRESS },
  { label: 'Done', value: TASK_STATUS.DONE }
];

const TASK_SEVERITY_OPTIONS = [
  { label: 'Medium', value: SEVERITY.MEDIUM },
  { label: 'Low', value: SEVERITY.LOW },
  { label: 'High', value: SEVERITY.HIGH },
  { label: 'Critical', value: SEVERITY.CRITICAL }
];

const INITIAL_FORM_VALUES = {
  title: '',
  description: '',
  status: TASK_STATUS_OPTIONS[0],
  severity: TASK_SEVERITY_OPTIONS[0]
};

const Tasks = () => {
  const styles = getStyles();
  const dispatch: AppDispatch = useDispatch();
  const tasks: Task[] = selectAllTasks();
  const currentUser = selectCurrentUser();
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
    const statusOption = getValues('status');
    const severityOption = getValues('severity');
    const newTask = {
      title,
      status: statusOption.value,
      severity: severityOption.value,
      createdBy: currentUser.userId
    };
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

  const getSeverityElement = (severity: string) => {
    switch (severity) {
      case SEVERITY.LOW:
        return (<KeyboardArrowDownOutlinedIcon color='info' />);
      case SEVERITY.HIGH:
        return (<KeyboardControlKeyOutlinedIcon color='warning' />);
      case SEVERITY.CRITICAL:
        return (<KeyboardDoubleArrowUpOutlinedIcon color='error' />);
      default:
        return (<DragHandleIcon color='primary'/>);
    }
  };

  const getTaskStatus = (status: string) => {
    switch (status) {
      case TASK_STATUS.DONE:
        return 'success';
      case TASK_STATUS.PROGRESS:
        return 'warning';
      default:
        return 'primary';
    }
  };

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
        <form onSubmit={handleSubmit(handleCreateTask)} className="flex items-center flex-wrap">
          <Box sx={{ mr: 2 }} className="w-25">
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  disabled={isLoading}
                  className="border-0 border-radius-4 mr-2 w-100"
                  placeholder="Create new task"
                />
              )}
            />
          </Box>
          <div className="mr-4">
            <FormSelect name='status' control={control} options={TASK_STATUS_OPTIONS} disabled={isLoading} />
          </div>
          <Box sx={{ mr: 2 }}>
            <Controller
              name="severity"
              control={control}
              render={({ field }) => (
                <BaseSelect
                  {...field}
                  options={TASK_SEVERITY_OPTIONS}
                  disabled={isLoading}
                />
              )}
            />
          </Box>
          <Button
            type='submit'
            variant="contained"
            endIcon={<AddOutlinedIcon />}
            sx={styles.createButtonStyles}>
            Create Task
          </Button>
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
                    disabled={isLoading}
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
                  <Typography noWrap sx={styles.typographyStyles}>{task.title}</Typography>
                  <Box className="flex mr-12">
                    <Box
                      sx={styles.labelStyles}>Status:</Box>
                    <Chip
                      size="small"
                      label={task?.status.toLowerCase()}
                      sx={styles.chipStyles}
                      color={getTaskStatus(task.status)} />
                  </Box>
                  <Box className="flex mr-12">
                    <Box
                      sx={styles.labelStyles}>Severity:</Box>
                    {getSeverityElement(task.severity)}
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
