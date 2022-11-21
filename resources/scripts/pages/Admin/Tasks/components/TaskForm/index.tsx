import { APP_URL, TASK_SEVERITY_OPTIONS, TASK_STATUS_OPTIONS } from 'scripts/configs/constants';
import { AppDispatch, Task } from '@utils/interfaces';
import { LOADING_STATE, TASK_STATUS } from '@configs/enums';
import { formatDistance } from 'date-fns';
import { isFunction } from 'lodash';
import { isValidDate } from 'scripts/utils/helpers';
import { newTaskSchema } from '../../schemas';
import { selectTaskById, selectTaskLoading, taskActions } from '@store/slices/taskSlice';
import { useDispatch } from 'react-redux';
import { useForm, useFormState, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FormDatePicker from '@components/form/FormDatePicker';
import FormSelect from '@components/form/FormSelect';
import FormTextarea from '@components/form/FormTextarea';
import IconButton from '@mui/material/IconButton';
import React, { Fragment, useEffect, useState } from 'react';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import getStyles from './styles';

export interface TaskFormProps extends DrawerProps {
  task: Task;
  onClose: () => void;
}

const TaskForm = (props: TaskFormProps) => {
  const { task: currentTask, onClose, ...restProps } = props;
  const styles = getStyles();

  const dispatch: AppDispatch = useDispatch();
  const task: Task = selectTaskById(currentTask.id);
  const editable = !!task;
  const loading = selectTaskLoading();

  const [editMode, setEditMode] = useState(false);

  // React hook form
  const { control, setValue, getValues, trigger, reset } = useForm({
    defaultValues: {
      title: '',
      description: '',
      acceptance: '',
      dueDate: '',
      status: TASK_STATUS_OPTIONS[0],
      severity: TASK_SEVERITY_OPTIONS[0]
    },
    resolver: yupResolver(newTaskSchema)
  });
  const taskStatus = useWatch({ control, name: 'status' });

  const { isDirty } = useFormState({ control });

  const handleSave = async () => {
    const validated = await trigger();
    if (validated) {
      const { status, severity, dueDate, ...restTask }: any = getValues();
      let dateString = '';
      if (isValidDate(dueDate)) {
        dateString = new Date(dueDate).toISOString();
      }
      dispatch(
        taskActions.saveTask({
          ...restTask,
          status: status.value,
          severity: severity.value,
          dueDate: dateString
        })
      );
    }
  };

  /**
   * Copy content to clipboard
   * But only for localhost for https domain
   * @param content
   */
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
    const nonSpecialCharactersString = taskTitle
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, '');
    const formatedString = nonSpecialCharactersString.split(/\s+/).join('-');
    handleCopy(formatedString);
  };

  const toogleEditMode = () => {
    if (editMode) {
      reset();
    }
    setEditMode((prevState) => !prevState);
  };

  const handleClose = (event: any, reason: string) => {
    if (loading === LOADING_STATE.LOADING || reason === 'backdropClick') return;
    if (isFunction(onClose)) onClose();
  };

  useEffect(() => {
    if (task && !editMode) {
      // Conflict react-hook-form type so have to mark as any
      Object.entries(task).forEach(([key, value]: [key: string, value: any]) => {
        if (key === 'status') {
          setValue(
            key,
            TASK_STATUS_OPTIONS.find((option) => option.value === value)
          );
        } else if (key === 'severity') {
          setValue(
            key,
            TASK_SEVERITY_OPTIONS.find((option) => option.value === value)
          );
        } else if (key === 'dueDate') {
          setValue(key as any, isValidDate(task[key]) ? new Date(task[key]) : '');
        } else {
          setValue(key as any, task[key as keyof Task]);
        }
      });
    }
  }, [task, setValue, editMode]);

  useEffect(() => {
    if (loading === LOADING_STATE.SUCCESS) {
      setEditMode(false);
    }
  }, [loading]);

  const taskIsDone = taskStatus.value === TASK_STATUS.DONE;

  const headerbuttonConfig: any = {
    size: 'small',
    disableRipple: true,
    sx: { mr: 0.5 },
    disableFocusRipple: true
  };

  return (
    <Fragment>
      <Drawer {...restProps} anchor="right" onClose={handleClose} sx={styles.drawerStyles}>
        <Box sx={styles.toolbarStyles(taskStatus.value)}>
          <Box sx={styles.titleStyles(taskStatus.value)}>
            Task&nbsp;
            <Button variant="text" onClick={copyTaskId(task?.id)} sx={styles.taskIdStyles}>
              #{task?.id}
            </Button>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Box>
              <IconButton {...headerbuttonConfig} onClick={copyTaskLink(task?.id)}>
                <ShareOutlinedIcon sx={styles.headerButtonIconStyles} />
              </IconButton>
              <IconButton {...headerbuttonConfig} onClick={copyTaskBranch(task?.title)}>
                <CodeOutlinedIcon sx={styles.headerButtonIconStyles} />
              </IconButton>
              {editable && !editMode && (
                <IconButton {...headerbuttonConfig} onClick={toogleEditMode}>
                  <EditOutlinedIcon sx={styles.headerButtonIconStyles} />
                </IconButton>
              )}
              {editable && editMode && (
                <IconButton {...headerbuttonConfig} onClick={toogleEditMode}>
                  <EditOffOutlinedIcon sx={styles.headerButtonIconStyles} />
                </IconButton>
              )}
              {editable && editMode && isDirty && (
                <IconButton {...headerbuttonConfig} disabled={loading === LOADING_STATE.LOADING} onClick={handleSave}>
                  {loading === LOADING_STATE.LOADING ? (
                    <CircularProgress classes={{ colorPrimary: 'text-white' }} size={14} />
                  ) : (
                    <CheckOutlinedIcon sx={styles.headerButtonIconStyles} />
                  )}
                </IconButton>
              )}
            </Box>
            <Box sx={styles.titleStyles(taskStatus.value)}>
              <IconButton size="small" disableRipple={true} disableFocusRipple={true} onClick={onClose}>
                <CloseOutlinedIcon sx={styles.headerButtonIconStyles} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={styles.textareaStyles(editMode)}>
          <FormTextarea name="title" placeholder="Title" control={control} disabled={taskIsDone || !editMode} />
        </Box>
        <Box sx={styles.subTitleStyles}>
          <span className="mr-2">
            <label>Created by: </label>
            &nbsp;{`${task.createdBy.firstName} ${task.createdBy.lastName}`}
          </span>
          <span>
            <label>Created at:</label>&nbsp;{formatDistance(new Date(), new Date(task.createdAt))}
          </span>
        </Box>
        <Box sx={styles.inlineFieldGroupStyles}>
          <Box component="label" sx={styles.labelGroupStyles}>
            Status:
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <FormSelect name="status" control={control} options={TASK_STATUS_OPTIONS} disabled={!editMode} />
          </Box>
        </Box>
        <Box sx={styles.inlineFieldGroupStyles}>
          <Box component="label" sx={styles.labelGroupStyles}>
            Severity:
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <FormSelect name="severity" control={control} options={TASK_SEVERITY_OPTIONS} disabled={!editMode} />
          </Box>
        </Box>
        <Box sx={styles.inlineFieldGroupStyles}>
          <Box component="label" sx={styles.labelGroupStyles}>
            Due date:
          </Box>
          <FormDatePicker name="dueDate" control={control} disabled={taskIsDone || !editMode} />
        </Box>
        <Box sx={styles.fieldGroupStyles}>
          <Box component="label" sx={styles.labelGroupStyles}>
            Description:
          </Box>
          <Box sx={styles.textareaStyles(editMode)}>
            <FormTextarea
              name="description"
              placeholder="Description"
              control={control}
              disabled={taskIsDone || !editMode}
            />
          </Box>
        </Box>
        <Box sx={styles.fieldGroupStyles}>
          <Box component="label" sx={styles.labelGroupStyles}>
            Acceptance:
          </Box>
          <Box sx={styles.textareaStyles(editMode)}>
            <FormTextarea
              name="acceptance"
              placeholder="Acceptance"
              control={control}
              disabled={taskIsDone || !editMode}
              className="task__description"
            />
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default TaskForm;
