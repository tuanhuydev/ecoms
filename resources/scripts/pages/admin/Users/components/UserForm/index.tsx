import { DefaultObjectType, User } from 'scripts/utils/interfaces';
import { LOADING_STATE } from 'scripts/configs/enums';
import { USER_PERMISSION_OPTIONS, USER_STATUS_OPTIONS } from 'scripts/configs/constants';
import { createSchema, editSchema } from './schema';
import { findOptionByValue } from 'scripts/utils/helpers';
import { httpClientWithAuth } from 'scripts/utils/httpClient';
import { selectLoadingUser, userActions } from 'scripts/store/slices/userSlice';
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
import FormInput from 'scripts/components/form/FormInput';
import FormSelect from 'scripts/components/form/FormSelect';
import FormTextarea from 'scripts/components/form/FormTextarea';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import React, { Fragment, useEffect, useState } from 'react';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import getStyles from './styles';
import isFunction from 'lodash/isFunction';

export interface UserFormInterface {
  onClose: Function;
  onSubmit: Function;
  open: boolean;
  user?: User;
}

const DEFAULT_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  bio: '',
  password: '',
  confirmPassword: '',
  status: USER_STATUS_OPTIONS[0],
  permission: USER_PERMISSION_OPTIONS[0]
};

const headerbuttonConfig: DefaultObjectType = {
  size: 'small',
  disableRipple: true,
  sx: { mr: 0.5 },
  disableFocusRipple: true
};

const UserForm = ({ onClose, onSubmit, user, open = false }: UserFormInterface) => {
  const dispatch = useDispatch();
  const styles = getStyles();
  const editable = !!user;
  const loading = selectLoadingUser() === LOADING_STATE.LOADING;

  // Form
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: DEFAULT_FORM,
    resolver: yupResolver(editable ? editSchema : createSchema)
  });
  const { isDirty } = useFormState({ control });

  // State
  const [editing, setEditing] = useState(false);
  const [file, setUploadFile] = useState(null);
  const [previewAvatar, setAvatar] = useState(null);
  const [avatarChanged, setAvatarChanged] = useState(false);

  const resetState = () => {
    setEditing(false);
    setUploadFile(null);
    setAvatarChanged(false);
  };
  const handleClose = () => {
    if (loading) return;
    // Reset current form data
    reset();
    // Reset all states
    resetState();
    setAvatar(null);
    // Callback
    if (isFunction(onClose)) onClose();
  };

  const uploadAvatar = (uploadFile: File) => {
    if (!uploadFile) return;
    const formData = new FormData();
    formData.append('avatar', uploadFile, uploadFile.name);
    return httpClientWithAuth.post('upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };

  const handleSubmitForm = async (data: any) => {
    if (loading) return;
    dispatch(userActions.setLoading(LOADING_STATE.LOADING));
    const formData = data;
    // perform upload if file exist
    formData.avatar = previewAvatar;
    if (file) {
      const { data: uploadedObject } = await uploadAvatar(file);
      formData.avatar = uploadedObject.path;
    }
    onSubmit(formData);
    handleClose();
  };

  const mapUserToForm = (user: User) => {
    if (user?.avatar) {
      setAvatar(user.avatar);
    }
    Object.entries(user).forEach(([key, value]: [key: any, value: any]) => {
      if (key === 'status') {
        setValue(key, findOptionByValue(USER_STATUS_OPTIONS, value));
      } else if (key === 'permission') {
        setValue(key, findOptionByValue(USER_PERMISSION_OPTIONS, value));
      } else {
        setValue(key, value);
      }
    });
  };

  const toogleEditing = (value: boolean) => () => {
    if (!value) {
      resetState();
    }
    setEditing(value);
  };
  const onChangeFile = (event: any) => {
    if (event.target.files.length) {
      setUploadFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (editable) mapUserToForm(user);
    setEditing(!editable);
  }, [open]);

  useEffect(() => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatar(previewUrl);
      if (!avatarChanged) {
        setAvatarChanged(!avatarChanged);
      }
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [file]);

  const title = user ? `User #${user.userId}` : 'New User';

  return (
    <Fragment>
      <Drawer anchor="right" sx={styles.drawerStyles} open={open} onClose={handleClose}>
        <Box sx={styles.toolbarStyles}>
          <Box sx={styles.titleStyles}>{title}</Box>
          <Box sx={styles.toolbarMenuStyles}>
            <Box>
              <IconButton {...headerbuttonConfig}>
                <ShareOutlinedIcon sx={styles.headerButtonIconStyles} />
              </IconButton>
              {!editing && (
                <IconButton {...headerbuttonConfig} onClick={toogleEditing(true)}>
                  <EditOutlinedIcon sx={styles.headerButtonIconStyles} />
                </IconButton>
              )}
              {editable &&
                editing &&
                avatarChanged && ( // record editable and user is editing
                <IconButton {...headerbuttonConfig} onClick={toogleEditing(false)}>
                  <EditOffOutlinedIcon sx={styles.headerButtonIconStyles} />
                </IconButton>
              )}
              {((editing && isDirty) || avatarChanged) && (
                <IconButton {...headerbuttonConfig} disabled={loading} onClick={handleSubmit(handleSubmitForm)}>
                  {loading
                    ? (
                      <CircularProgress classes={{ colorPrimary: 'text-white' }} size={14} />
                    )
                    : (
                      <CheckOutlinedIcon sx={styles.headerButtonIconStyles} />
                    )}
                </IconButton>
              )}
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
                ? (
                  <Avatar alt="user avatar" src={previewAvatar} sx={{ width: 96, height: 96 }} />
                )
                : (
                  <PhotoCamera sx={{ width: 96, height: 96 }} />
                )}
              <input accept="image/*" type="file" className="hidden" onChange={onChangeFile} />
            </IconButton>
          </Box>
          <Grid container rowSpacing={0} columnSpacing={1}>
            <Grid item xs={6}>
              <FormInput
                control={control}
                disabled={!editing}
                name="firstName"
                label="First Name"
                placeholder="Type first name..."
              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                control={control}
                disabled={!editing}
                name="lastName"
                label="Last Name"
                placeholder="Type last name..."
              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                control={control}
                disabled={!editing}
                name="email"
                type="email"
                placeholder="Type email..."
                label="Email"
              />
            </Grid>
            <Grid item xs={6}>
              <FormInput
                control={control}
                disabled={!editing}
                name="phone"
                label="Phone"
                type="tel"
                placeholder="Type phone..."
              />
            </Grid>
            {!editable && (
              <>
                <Grid item xs={12}>
                  <FormInput
                    control={control}
                    disabled={!editing}
                    name="password"
                    placeholder="Type password..."
                    label="Password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    control={control}
                    disabled={!editing}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Type password..."
                  />
                </Grid>
              </>
            )}
            <Grid item xs={6}>
              <FormSelect control={control} name="status" label="Status" options={USER_STATUS_OPTIONS} />
            </Grid>
            <Grid item xs={6}>
              <FormSelect control={control} name="permission" label="Permission" options={USER_PERMISSION_OPTIONS} />
            </Grid>
            <Grid item xs={12}>
              <FormTextarea placeholder="Bio" label="Bio" control={control} name="bio" sx={{ minHeight: 100 }} />
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export default UserForm;
