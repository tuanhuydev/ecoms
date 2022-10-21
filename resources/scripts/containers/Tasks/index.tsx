import { AppDispatch } from '@store/index';
import { Controller, useForm } from 'react-hook-form';
import { DefaultObjectType } from 'scripts/interfaces/Meta';
import { LOADING_STATE, SEVERITY, SORT_TYPE, TASK_STATUS } from '../../configs/enums';
import { TASK_SEVERITY_OPTIONS, TASK_STATUS_OPTIONS } from 'scripts/configs/constants';
import { Task } from '../../interfaces/Task';
import {
  TaskFilter,
  TaskPaginator,
  TaskParams,
  TaskSorter,
  selectAllTasks,
  selectTaskFilter,
  selectTaskLoading,
  selectTaskPaginator,
  selectTaskParams,
  selectTaskSorter,
  taskActions
} from '@store/slices/taskSlice';
import { User } from 'scripts/interfaces/Model';
import { newTaskSchema } from './schemas';
import { selectCurrentUser } from '@store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import PageContainer from '@components/base/PageContainer';
import Radio from '@mui/material/Radio';
import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Skeleton from '@mui/material/Skeleton';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import TaskForm from '@components/pages/Tasks/TaskForm';
import Typography from '@mui/material/Typography';
import getStyles from './styles';
import omit from 'lodash/omit';
import useDebounce from 'scripts/hooks/useDebounce';

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

const TaskSortByOptions = [
  { label: 'Date', value: 'createdAt' },
  { label: 'Status', value: 'status' },
  { label: 'Severity', value: 'severity' }
];

const Tasks = () => {
  const styles = getStyles();
  // Hook
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  // Selectors
  const tasks: Task[] = selectAllTasks();
  const taskParams: TaskParams = selectTaskParams();
  const taskFilter: TaskFilter = selectTaskFilter();
  const taskSorter: TaskSorter = selectTaskSorter();
  const taskPaginator: TaskPaginator = selectTaskPaginator();
  const currentUser: User = selectCurrentUser();
  const loading: string = selectTaskLoading();

  const taskSortOption = TaskSortByOptions.find((option) => option.value === taskSorter.field);
  const isLoading = loading === LOADING_STATE.LOADING;

  const [selectedTask, setSelectedTask] = useState<Task>();
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [search, setSearch] = useState('');
  const debounceSearch: string = useDebounce(search);
  const openMenu = Boolean(menuAnchor);

  const observer = useRef<any>();
  const currentPage = taskPaginator.currentPage;
  const hasMorePage = taskPaginator.hasMorePage;
  const lastItemObserver = useCallback((node: any) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMorePage) { // Visible somewhere
        dispatch(taskActions.setTaskParams({
          paginator: {
            ...taskPaginator,
            currentPage: currentPage + 1
          }
        }));
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, taskPaginator.hasMorePage]);

  const { enqueueSnackbar } = useSnackbar();
  const isAscending = taskSorter.value === String(SORT_TYPE.ASCENDING);

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
    dispatch(taskActions.updateTask({ ...task, status: taskStatus }));
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
        return (<DragHandleIcon color='primary' />);
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
        {tasks.map((task, index) => {
          if ((index + 1) === tasks.length) {
            return (
              <ListItem
                sx={styles.listItemStyles}
                disablePadding
                ref={lastItemObserver}
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
          }
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
      // Remove Filter in case all filters
      const removedStatusFilter = omit(taskFilter, [field]);
      dispatch(taskActions.setTaskParams({ filter: removedStatusFilter }));
    } else {
      dispatch(taskActions.setTaskParams({
        filter: {
          ...taskFilter,
          [field]: value
        }
      }));
    }
  };

  const handleChangeOrderValue = () => {
    const value = isAscending ? SORT_TYPE.DESCENDING : SORT_TYPE.ASCENDING;
    dispatch(taskActions.setTaskParams({ sorter: { ...taskSorter, value } }));
  };

  const handleChangeOrderSelect = ({ value: field }: { value: SORT_TYPE }) => {
    dispatch(taskActions.setTaskParams({ sorter: { ...taskSorter, field } }));
  };

  useEffect(() => {
    if (loading === LOADING_STATE.FAIL) {
      enqueueSnackbar('Error', { variant: 'error' });
    }
  }, [loading]);

  useEffect(() => {
    if (debounceSearch.length) {
      dispatch(taskActions.setTaskParams({
        filter: {
          ...taskFilter,
          search: debounceSearch
        }
      }));
    }
  }, [debounceSearch]);

  useEffect(() => {
    if (taskPaginator.currentPage <= taskPaginator.lastPage) {
      dispatch(taskActions.fetchTasks(taskParams));
    }
  }, [taskFilter, taskSorter, taskPaginator.currentPage]);

  // Handle Deeplinking
  useEffect(() => {
    const { id } = params;
    if (id) {
      const deepLinkingTask: Task = tasks.find((task: Task) => task.id === Number(id));
      if (deepLinkingTask) {
        setSelectedTask(deepLinkingTask);
      }
      const cleanUrl = location.pathname.substring(0, location.pathname.length - 2);
      navigate(cleanUrl, { replace: true });
    }
  }, [tasks.length]);

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
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <Box sx={{ mr: 1 }}>Filter by:</Box>
          <Box sx={{ mr: 1 }}>
            <BaseSelect
              name='status'
              options={TaskStatusOptions}
              defaultValue={TaskStatusOptions[0]}
              disabled={isLoading}
              onChange={handleChangeFilterSelect('status')} />
          </Box>
          <BaseSelect
            name='severity'
            options={TaskSeverityOptions}
            defaultValue={TaskSeverityOptions[0]}
            disabled={isLoading}
            onChange={handleChangeFilterSelect('severity')}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 1 }}>Order by</Box>
          <BaseSelect
            name='order'
            options={TaskSortByOptions}
            defaultValue={TaskSortByOptions[0]}
            disabled={isLoading}
            value={taskSortOption}
            onChange={handleChangeOrderSelect}
          />
          <IconButton size="small" sx={{ ml: 1 }} onClick={handleChangeOrderValue}>
            {isAscending ? <NorthOutlinedIcon fontSize="small" /> : <SouthOutlinedIcon fontSize="small" />}
          </IconButton>
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
      {selectedTask && (<TaskForm open={!!selectedTask} task={selectedTask} onClose={handleCloseTask} />)}
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
