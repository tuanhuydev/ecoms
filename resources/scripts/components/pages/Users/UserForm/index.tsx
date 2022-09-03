import { LOADING_STATE } from 'scripts/configs/enums';
import { USER_PERMISSION_OPTIONS, USER_STATUS_OPTIONS } from 'scripts/configs/constants';
import { User } from 'scripts/interfaces/Model';
import { httpClientWithAuth } from 'scripts/configs/httpClient';
import { selectLoadingUser, userActions } from '@store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Drawer from '@mui/material/Drawer';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FormInput from '@components/form/FormInput';
import FormSelect from '@components/form/FormSelect';
import FormTextarea from '@components/form/FormTextarea';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import React, { Fragment, useEffect, useState } from 'react';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import getStyles from './styles';
import isFunction from 'lodash/isFunction';
import schema from './schema';

export interface UserFormInterface {
  onClose: () => void;
  onSubmit: Function;
  open: boolean;
  user?: User;
}
const UserForm = ({ onClose, user, open = false }: UserFormInterface) => {
  const styles = getStyles();

  const loadingState = selectLoadingUser();
  const isLoading = loadingState === LOADING_STATE.LOADING;
  const editable = !!user;

  const dispatch = useDispatch();

  // Form handling
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bio: '',
      password: '',
      confirmPassword: '',
      status: USER_STATUS_OPTIONS[0],
      permission: USER_PERMISSION_OPTIONS[0]
    },
    resolver: yupResolver(schema)
  });
  const { isDirty } = useFormState({ control });

  // State
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [previewAvatar, setupAvatar] = useState(null);

  const handleClose = () => {
    if (isLoading) {
      return;
    }
    reset();
    if (isFunction(onClose)) {
      resetState();
      onClose();
    }
  };

  const resetState = () => {
    setEditing(false);
    setSubmitting(false);
    setUploadFile(null);
    setupAvatar(null);
  };

  const uploadAvatar = (uploadFile: File) => {
    if (!uploadFile) return;
    const formData = new FormData();
    formData.append('avatar', uploadFile, uploadFile.name);
    return httpClientWithAuth.post('upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  const submitForm = async ({ status, permission, firstName, lastName, ...restFormData }: any) => {
    setSubmitting(true);
    const payload = {
      ...restFormData,
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`,
      status: status.value,
      permission: permission.value
    };
    if (uploadFile) {
      const { data: fileUrl } = await uploadAvatar(uploadFile);
      payload.avatar = fileUrl;
    }
    dispatch(userActions.saveUser(payload));
  };

  const mapUserToForm = (user: User) => {
    // Map user to form
    console.log('mapUserToForm');
  };

  const toogleEditing = (value: boolean) => () => {
    setEditing(value);
  };
  const onChangeFile = (event: any) => {
    if (event.target.files.length) {
      setUploadFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      mapUserToForm(user);
    } else {
      setEditing(true);
    }
  }, [open]);

  useEffect(() => {
    if (loadingState === LOADING_STATE.SUCCESS && submitting) {
      setSubmitting(!submitting);
      handleClose();
    }
  }, [loadingState]);

  useEffect(() => {
    if (uploadFile) {
      // create the preview
      const objectUrl = URL.createObjectURL(uploadFile);
      setupAvatar(objectUrl);

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [uploadFile]);

  const headerbuttonConfig: any = {
    size: 'small',
    disableRipple: true,
    sx: { mr: 0.5 },
    disableFocusRipple: true
  };

  const title = user ? `User #${user.userId}` : 'New User';

  return (
    <Fragment>
      <Drawer
        anchor="right"
        sx={styles.drawerStyles}
        open={open}
        onClose={handleClose}
      >
        <Box sx={styles.toolbarStyles}>
          <Box sx={styles.titleStyles}>{title}</Box>
          <Box sx={styles.toolbarMenuStyles}>
            <Box>
              <IconButton {...headerbuttonConfig}>
                <ShareOutlinedIcon sx={styles.headerButtonIconStyles} />
              </IconButton>
              {
                !editing && (
                  <IconButton {...headerbuttonConfig} onClick={toogleEditing(true)}>
                    <EditOutlinedIcon sx={styles.headerButtonIconStyles} />
                  </IconButton>)
              }
              {
                editable && editing && ( // record editable and user is editing
                  <IconButton {...headerbuttonConfig} onClick={toogleEditing(false)}>
                    <EditOffOutlinedIcon sx={styles.headerButtonIconStyles} />
                  </IconButton>
                )
              }
              {
                editing && isDirty && (
                  <IconButton
                    {...headerbuttonConfig}
                    disabled={isLoading}
                    onClick={handleSubmit(submitForm)}>
                    { isLoading
                      ? (<CircularProgress classes={{ colorPrimary: 'text-white' }} size={14} />)
                      : (<CheckOutlinedIcon sx={styles.headerButtonIconStyles} />)}
                  </IconButton>
                )
              }
            </Box>
            <Box sx={styles.titleStyles}>
              <IconButton size="small" disableRipple={true} disableFocusRipple={true} onClick={handleClose}>
                <CloseOutlinedIcon sx={styles.headerButtonIconStyles} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ px: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <IconButton color="primary" aria-label="upload picture" component="label" size="large">
              {previewAvatar
                ? (<Avatar
                  alt="user avatar"
                  src={previewAvatar}
                  sx={{ width: 96, height: 96 }}
                />)
                : (<PhotoCamera sx={{ width: 96, height: 96 }} />)}
              <input accept="image/*" type="file" className='hidden' onChange={onChangeFile} />
            </IconButton>
          </Box>
          <Grid container rowSpacing={0} columnSpacing={1}>
            <Grid item xs={6}>
              <FormInput
                control={control}
                disabled={!editing}
                name="firstName"
                label='First Name'
                placeholder='Type first name...'
              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                control={control}
                disabled={!editing}
                name="lastName"
                label='Last Name'
                placeholder="Type last name..."
              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                control={control}
                disabled={!editing}
                name="email"
                type='email'
                placeholder="Type email..."
                label='Email'
              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                control={control}
                disabled={!editing}
                name="phone"
                label='Phone'
                type='tel'
                placeholder="Type phone..."
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                control={control}
                disabled={!editing}
                name="password"
                placeholder="Type password..."
                label='Password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                control={control}
                disabled={!editing}
                name="confirmPassword"
                label='Confirm Password'
                placeholder="Type password..."
              />
            </Grid>
            <Grid item xs={6}>
              <FormSelect
                control={control}
                name="status"
                label="Status"
                options={USER_STATUS_OPTIONS}
              />
            </Grid>
            <Grid item xs={6}>
              <FormSelect
                control={control}
                name="permission"
                label="Permission"
                options={USER_PERMISSION_OPTIONS}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextarea placeholder='Bio' label="Bio" control={control} name="bio" sx={{ minHeight: 100 }} />
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default UserForm;
