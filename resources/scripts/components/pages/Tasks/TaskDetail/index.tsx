import './styles.scss';
import { APP_URL, TASK_STATUS_OPTIONS } from 'scripts/configs/constants';
import { AppDispatch } from '@store/index';
import { AxiosResponse } from 'axios';
import { TASK_STATUS } from '../../../../configs/enums';
import { Task } from '../../../../interfaces/Task';
import { grey } from '@mui/material/colors';
import { newTaskSchema } from '@containers/Tasks/schemas';
import { styled, useTheme } from '@mui/material/styles';
import { taskActions } from '@store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { useForm, useFormState, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box, { BoxProps } from '@mui/system/Box';
import Button from '@mui/material/Button';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FormSelect from '@components/form/FormSelect';
import FormTextarea from '@components/form/FormTextarea';
import IconButton from '@mui/material/IconButton';
import React, { Fragment, useEffect, useState } from 'react';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TaskService from '../../../../services/TaskService';
import getStyles from './styles';

export interface TaskDetailProps extends DrawerProps {
  task: Task;
  onClose: () => void;
}

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
  const editable = !!task;
  const styles = getStyles();

  // Hooks
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  // React hook form
  const { control, setValue, getValues, trigger } = useForm({
    defaultValues: {
      title: '',
      description: '',
      acceptance: '',
      status: TASK_STATUS_OPTIONS[0]
    },
    resolver: yupResolver(newTaskSchema)
  });
  const taskStatus = useWatch({ control, name: 'status' });

  const { isDirty } = useFormState({ control });

  const handleUpdateTask = async () => {
    try {
      const validated = await trigger();
      if (validated) {
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
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const copyTaskId = (taskId: number) => () => {
    handleCopy(taskId.toString());
  };

  const copyTaskLink = (taskId: number) => () => {
    handleCopy(`${APP_URL}/admin/tasks/${taskId.toString()}`);
  };

  const copyTaskBranch = (taskTitle: string) => () => {
    const nonSpecialCharactersString = taskTitle.trim().toLowerCase().replace(/[^\w\s]/g, '');
    const formatedString = nonSpecialCharactersString.split(/\s+/).join('-');
    handleCopy(formatedString);
  };

  useEffect(() => {
    if (task) {
      // Conflict react-hook-form type so have to mark as any
      Object.entries(task).forEach(([key, value]: [key: string, value: any]) => {
        if (key === 'status') {
          setValue(key, TASK_STATUS_OPTIONS.find((option) => option.value === value));
        } else {
          setValue((key as any), task[key as keyof Task]);
        }
      });
    }
  }, [task, setValue]);

  const taskIsDone = taskStatus.value === TASK_STATUS.DONE;

  const headerbuttonConfig: any = {
    size: 'small',
    disableRipple: true,
    sx: {
      mr: 0.5
    },
    disableFocusRipple: true
  };

  return <Fragment>
    <Drawer {...restProps} anchor="right" onClose={onClose} sx={styles.drawerStyles}>
      <Box sx={styles.toolbarStyles(taskStatus.value)}>
        <Box sx={styles.titleStyles(taskStatus.value)}>
          Task&nbsp;
          <Button
            variant="text"
            onClick={copyTaskId(task?.id)}
            sx={{
              backgroundColor: 'transparent',
              color: theme.palette.common.white,
              p: 0,
              ml: 0.25,
              minWidth: '1rem',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >#{task?.id}</Button>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Box>
            <IconButton
              {...headerbuttonConfig}
              onClick={copyTaskLink(task?.id)}>
              <ShareOutlinedIcon sx={styles.headerButtonIconStyles} />
            </IconButton>
            <IconButton {...headerbuttonConfig} onClick={copyTaskBranch(task?.title)}>
              <CodeOutlinedIcon sx={styles.headerButtonIconStyles} />
            </IconButton>
            {
              editable && (
                <IconButton {...headerbuttonConfig} onClick={onClose}>
                  <EditOutlinedIcon sx={styles.headerButtonIconStyles} />
                </IconButton>)
            }
          </Box>
          <Box sx={styles.titleStyles(taskStatus.value)}>
            <IconButton size="small" disableRipple={true} disableFocusRipple={true} onClick={onClose}>
              <CloseOutlinedIcon sx={styles.headerButtonIconStyles} />
            </IconButton>
          </Box>
        </Box>

      </Box>
      <Box sx={{ padding: theme.spacing(0, 0.75) }}>
        <FormTextarea
          name="title"
          placeholder="Title"
          control={control}
          onBlur={handleUpdateTask}
          className="task__title"
          disabled={taskIsDone}
        />
        <StyledFieldGroup>
          <label>Reporter:</label>
          Huy Nguyen Tuan
        </StyledFieldGroup>
        <StyledFieldGroup>
          <label>Assignee:</label>
          Huy Nguyen Tuan
        </StyledFieldGroup>
        <StyledFieldGroup>
          <label> Due date:</label>
          2022/06/06
        </StyledFieldGroup>
        <StyledFieldGroup sx={{ display: 'flex' }}>
          <label>Status:</label>
          <Box sx={{ flexGrow: 1 }}>
            <FormSelect
              name="status"
              control={control}
              options={TASK_STATUS_OPTIONS}
              defaultValue={TASK_STATUS_OPTIONS[0]}
            />
          </Box>
        </StyledFieldGroup>
        <StyledFieldGroup sx={{ display: 'flex' }}>
          <label>Type:</label>
          <Box sx={{ flexGrow: 1 }}>
            <FormSelect
              name="status"
              control={control}
              options={TASK_STATUS_OPTIONS}
              defaultValue={TASK_STATUS_OPTIONS[0]}
            />
          </Box>
        </StyledFieldGroup>
        <StyledFieldGroup>
          <label> Due date:</label>
          2022/06/06
        </StyledFieldGroup>
        <StyledFieldGroup>
          <label>Description:</label>
          <FormTextarea
            name="description"
            placeholder="Description"
            onBlur={handleUpdateTask}
            control={control}
            disabled={taskIsDone}
            className='task__description'
          />
        </StyledFieldGroup>
      </Box>
    </Drawer>
  </Fragment>;
};

export default TaskDetail;
