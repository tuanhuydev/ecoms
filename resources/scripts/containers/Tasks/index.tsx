import { AppDispatch } from '@store/index';
import { AxiosResponse } from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { DefaultObjectType } from 'scripts/interfaces/Meta';
import { LOADING_STATE, SEVERITY, TASK_STATUS } from '../../configs/enums';
import { TASK_SEVERITY_OPTIONS, TASK_STATUS_OPTIONS } from 'scripts/configs/constants';
import { Task } from '../../interfaces/Task';
import { newTaskSchema } from './schemas';
import { selectCurrentUser } from '@store/slices/userSlice';
import { selectFilteredTasks, selectTaskFilter, selectTaskLoading, taskActions } from '@store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseSelect from '@components/base/Select';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragHandleIcon from '@mui/icons-material/DragHandle';
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
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Skeleton from '@mui/material/Skeleton';
import TaskDetail from '@components/pages/Tasks/TaskDetail';
import TaskService from '../../services/TaskService';
import Typography from '@mui/material/Typography';
import getStyles from './styles';
import omit from 'lodash/omit';

const INITIAL_FORM_VALUES = {
  title: ''
};

const TaskStatusOptions = [
  { label: 'All Status', value: 'ALL' },
  ...TASK_STATUS_OPTIONS
];

const TaskSeverityOptions = [
  { label: 'All Severity', value: 'ALL' },
  ...TASK_SEVERITY_OPTIONS
];

const Tasks = () => {
  const styles = getStyles();
  const dispatch: AppDispatch = useDispatch();
  const tasks: Task[] = selectFilteredTasks();
  const taskFilter = selectTaskFilter();
  const currentUser = selectCurrentUser();
  const loading: string = selectTaskLoading();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedTask, setSelectedTask] = useState<Task>();
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [search, setSearch] = useState('');
  const openMenu = Boolean(menuAnchor);

  // Form
  const { control, getValues, handleSubmit, reset } = useForm({
    defaultValues: INITIAL_FORM_VALUES,
    resolver: yupResolver(newTaskSchema)
  });

  const handleCreateTask = () => {
    const title = getValues('title');
    const newTask = {
      title,
      status: TASK_STATUS.BACKLOG,
      severity: SEVERITY.LOW,
      createdBy: currentUser,
      createdAt: new Date().toISOString(),
      description: '',
      acceptance: '',
      dueDate: ''
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

  const handleSearchTask: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };

  const renderTaskList = () => {
    if (!tasks.length && loading !== LOADING_STATE.LOADING) {
      return (<Box sx={styles.emptyRecordStyles}>no records</Box>);
    } else if (!tasks.length) {
      const placeholders: number[] = new Array(10).fill(0);
      return (
        <Box>
          {
            placeholders.map((_: number, index: number) => (
              <Box sx={{ display: 'flex', mx: 1, mb: 1 }} key={index}>
                <Skeleton variant="circular" height={40} width={40} sx={{ mr: 1 }} />
                <Skeleton variant="rectangular" height={40} sx={styles.skeletonStyles} />
              </Box>
            ))
          }
        </Box>
      );
    }
    return (
      (<List dense>
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
      </List>)
    );
  };

  const handleChangeFilterSelect = (field: string) => ({ value }: DefaultObjectType) => {
    if (value === 'ALL') {
      const updatedFilter = omit(taskFilter, [field]);
      dispatch(taskActions.setTaskFilter(updatedFilter));
    } else {
      dispatch(taskActions.setTaskFilter({ ...taskFilter, [field]: value }));
    }
  };

  useEffect(() => {
    if (!tasks.length) {
      dispatch(taskActions.fetchTasks());
    }
  }, []);

  useEffect(() => {
    if (loading === LOADING_STATE.FAIL) {
      enqueueSnackbar('Error', { variant: 'error' });
    }
  }, [loading]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      dispatch(taskActions.setTaskFilter({ ...taskFilter, search }));
    }, 300);
    return () => clearTimeout(debounceSearch);
  }, [search]);

  const isLoading = loading === LOADING_STATE.LOADING;

  return (
    <PageContainer title='Tasks' loading={isLoading}>
      <Box sx={styles.toolbarStyles}>
        <Box className="w-25 mr-4">
          <Input
            autoComplete="off"
            type="search"
            disabled={isLoading}
            placeholder="Search task"
            icon={<SearchOutlinedIcon />}
            value={search}
            onChange={handleSearchTask}
          />
        </Box>
        <Box sx={{ mr: 2 }}>
          <BaseSelect
            name='status'
            options={TaskStatusOptions}
            defaultValue={TaskStatusOptions[0]}
            disabled={isLoading}
            onChange={handleChangeFilterSelect('status')} />
        </Box>
        <Box sx={{ mr: 2 }}>
          <BaseSelect
            name='severity'
            options={TaskSeverityOptions}
            defaultValue={TaskSeverityOptions[0]}
            disabled={isLoading}
            onChange={handleChangeFilterSelect('severity')}
          />
        </Box>
      </Box>
      <Box sx={styles.listContainerStyles}>
        <Box sx={styles.quickSearchStyles}>
          <form onSubmit={handleSubmit(handleCreateTask)} className="flex items-center flex-wrap">
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  disabled={isLoading}
                  className="border-0 border-radius-4 w-100"
                  placeholder="Quick Create Task"
                  style={{ height: '2.5rem' }}
                />
              )}
            />
          </form>
        </Box>{renderTaskList()}</Box>
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
