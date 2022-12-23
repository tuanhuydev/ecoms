import { Account, User } from 'scripts/utils/interfaces';
import { SignIn } from 'scripts/services/AuthService';
import { Typography } from '@mui/material';
import { USER_AVAILABILITY_OPTIONS } from 'scripts/configs/constants';
import { accountActions, selectCurrentAccount } from 'scripts/store/slices/accountSlice';
import { selectCurrentUser } from 'scripts/store/slices/userSlice';
import { useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import BaseSelect from '../Select';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { Fragment, useEffect } from 'react';
import getStyles from './styles';

const AccountMenu = () => {
  const currentUser: User = selectCurrentUser();
  const currentAccount: Account = selectCurrentAccount();
  const selectedAvailability = USER_AVAILABILITY_OPTIONS.find((option) => option.value === currentAccount.availability);
  const styles = getStyles();

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    SignIn.clearAuth();
    window.location.href = '/';
  };

  const handleChangeAvailability = (option: any) => {
    dispatch(accountActions.patchAccount({ accountId: currentAccount.accountId, availability: option.value }));
  };

  useEffect(() => {
    if (!currentAccount) {
      handleLogout();
    }
  }, [currentAccount]);

  return (
    <Fragment>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Badge
          overlap="circular"
          sx={styles.statusBadgeStyles(currentAccount.availability)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt={currentUser.firstName} sx={styles.avatarSize} src={currentUser?.avatar} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: styles.paperStyles
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Grid container sx={{ px: 1, pb: 0.5, pt: 1 }}>
          <Grid item xs={3} sx={styles.avatarStyles}>
            <Avatar alt={currentUser.firstName} sx={styles.avatarSize} src={currentUser?.avatar} />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1" sx={styles.nameStyles} noWrap>
              {`${currentUser.firstName} ${currentUser.lastName}`}
            </Typography>
            <Typography variant="body2" sx={styles.emailStyles} noWrap>
              {currentUser.email}
            </Typography>
            <BaseSelect
              options={USER_AVAILABILITY_OPTIONS}
              onChange={handleChangeAvailability}
              defaultValue={selectedAvailability}
              placeholder="Select status"
              styles={styles.selectStyles}
            />
          </Grid>
        </Grid>
        <MenuItem onClick={handleLogout} sx={styles.signOutStyles}>
          Sign Out
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default AccountMenu;
