import { AppDispatch } from '@store/index';
import { AxiosResponse } from 'axios';
import { TASK_STATUS } from '../../../../configs/constants';
import { Task } from '../../../../interfaces/Task';
import { amber, blue, green, grey } from '@mui/material/colors';
import { newTaskSchema } from '@containers/Tasks/schemas';
import { styled, useTheme } from '@mui/material/styles';
import { taskActions } from '@store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box, { BoxProps } from '@mui/system/Box';
import Button from '@mui/material/Button';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import FormSelect from '@components/form/FormSelect';
import FormTextarea from '@components/form/FormTextarea';
import IconButton from '@mui/material/IconButton';
import React, { Fragment, useEffect } from 'react';
import TaskService from '../../../../services/TaskService';
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar';
import styles from './styles.module.scss';

export interface TaskDetailProps extends DrawerProps {
  task: Task;
  onClose: () => void;
}

interface StyledDrawerProps extends ToolbarProps {
  status?: TASK_STATUS;
}

const StyledDrawer = styled(Drawer)<DrawerProps>(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 400
  }
}));

const statusOptions = [
  { value: TASK_STATUS.BACKLOG, label: 'Backlog' },
  { value: TASK_STATUS.PROGRESS, label: 'In Progress' },
  { value: TASK_STATUS.DONE, label: 'Done' }
];

const StyledToolbar = styled(Toolbar)<StyledDrawerProps>(({ theme, status = TASK_STATUS.BACKLOG }) => {
  const statusColor = status === TASK_STATUS.DONE
    ? green[400]
    : status === TASK_STATUS.PROGRESS
      ? amber[400]
      : blue[400];
  return {
    backgroundColor: statusColor,
    color: theme.palette.common.white,
    minHeight: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0)
    }
  };
});

const StyledFieldGroup = styled(Box)<BoxProps>(({ theme }) => ({
  marginBottom: theme.spacing(0.75),
  fontSize: theme.typography.htmlFontSize,
  label: {
    display: 'inline-block',
    color: grey[500],
    minWidth: 42,
    fontWeight: theme.typography.fontWeightLight,
    fontSize: theme.typography.fontSize,
    marginRight: theme.spacing(1.125),
    marginBottom: theme.spacing(0.5)
  }
}));

const TaskDetail = (props: TaskDetailProps) => {
  const { task, onClose, ...restProps } = props;
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();

  // React hook form
  const { control, setValue, getValues, trigger } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: statusOptions[0]
    },
    resolver: yupResolver(newTaskSchema)
  });
  const taskStatus = useWatch({ control, name: 'status' });

  const handleUpdateTask = async () => {
    try {
      const validated = await trigger();
      if (task.status !== TASK_STATUS.DONE && validated) {
        const { status, ...restTask }: any = getValues();
        const { data }: AxiosResponse = await TaskService.updateTask({
          ...restTask,
          status: status.value
        });
        if (data?.success) {
          dispatch(taskActions.updateTask({
            ...restTask,
            status: status.value
          } as Task));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (task) {
      // Conflict react-hook-form type so have to mark as any
      Object.entries(task).forEach(([key, value]: [key: string, value: any]) => {
        if (key === 'status') {
          setValue(key, statusOptions.find((option) => option.value === value));
        } else {
          setValue((key as any), task[key as keyof Task]);
        }
      });
    }
  }, [task, setValue]);

  useEffect(() => {
    handleUpdateTask();
  }, [taskStatus]);

  const taskIsDone = taskStatus.value === TASK_STATUS.DONE;
  const taskIsProgress = taskStatus.value === TASK_STATUS.PROGRESS;

  return <Fragment>
    <StyledDrawer {...restProps} anchor="right" onClose={onClose}>
      <StyledToolbar variant='dense' status={taskStatus.value}>
        <Box sx={{
          backgroundColor: taskIsDone ? green[700] : taskIsProgress ? amber[700] : blue[700],
          padding: theme.spacing(0, 0.5),
          fontSize: theme.typography.fontSize,
          display: 'flex',
          alignItems: 'center',
          height: '100%'
        }}>
            Task:
          <Button
            variant="text"
            sx={{ backgroundColor: 'transparent', color: theme.palette.common.white, padding: 0, minWidth: '1rem' }}
          >#{task?.id}</Button>
        </Box>
        <IconButton size="small" disableRipple onClick={onClose} sx={{ borderRadius: theme.shape.borderRadius }}>
          <CloseOutlinedIcon style={{ fill: theme.palette.common.white, width: 14, height: 14 }} />
        </IconButton>
      </StyledToolbar>
      <Box sx={{ padding: theme.spacing(0, 0.75) }}>
        <FormTextarea
          name="title"
          placeholder="Title"
          control={control}
          onBlur={handleUpdateTask}
          className={styles.task__title}
          disabled={taskIsDone}
        />
        <StyledFieldGroup>
          <label>Author:</label>
          Huy Nguyen Tuan
        </StyledFieldGroup>
        <StyledFieldGroup sx={{ display: 'flex' }}>
          <label>Status:</label>
          <Box sx={{ flexGrow: 1 }}>
            <FormSelect
              name="status"
              control={control}
              options={statusOptions}
            />
          </Box>
        </StyledFieldGroup>
        {/* <StyledFieldGroup>
          <label>Tags:</label>
          Render tags
        </StyledFieldGroup> */}
        <StyledFieldGroup>
          <label>Description:</label>
          <FormTextarea
            name="description"
            placeholder="Description"
            onBlur={handleUpdateTask}
            control={control}
            disabled={taskIsDone}
            className={styles.task__description}
          />
        </StyledFieldGroup>
      </Box>
    </StyledDrawer>
  </Fragment>;
};

export default TaskDetail;
