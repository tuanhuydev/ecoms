import { DefaultObjectType, User } from '@utils/interfaces';
import { EMPTY_ARRAY, EMPTY_USER } from 'scripts/configs/constants';
import { LOADING_STATE } from 'scripts/configs/enums';
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { useSelector } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

export interface UserSliceType {
  users: User[];
  currentUser?: User;
  loading: string,
  filter: DefaultObjectType
}

const initialState: UserSliceType = {
  users: EMPTY_ARRAY,
  currentUser: EMPTY_USER,
  loading: LOADING_STATE.IDLE,
  filter: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading(state: any, action: PayloadAction<LOADING_STATE>) {
      state.loading = action.payload;
    },
    setCurrentUser(state: any, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    setUsers(state: any, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setFilter(state: any, action: PayloadAction<DefaultObjectType>) {
      state.filter = { ...state.filter, ...action.payload };
    },
    addUser(state: any, action: PayloadAction<User>) {
      state.users.unshift(action.payload);
    },
    updateUser(state: any, action: PayloadAction<any>) {
      const { userId, ...restUser } = action.payload;
      state.users = state.users.map((user: User) => {
        if (user.userId === userId) {
          return { ...user, ...restUser };
        }
        return user;
      });
    }
  }
});

// Actions
const fetchUsers = createAction('user/fetch');
const postUser = createAction<Partial<User>>('user/post');
const patchUser = createAction<Partial<User>>('user/patch');

export const userActions = { ...userSlice.actions, fetchUsers, patchUser, postUser };

// selector
export const selectCurrentUser = () => useSelector((state: RootState) => state.user.currentUser);
export const selectUsers = () => useSelector((state: RootState) => state.user.users);
export const selectLoadingUser = () => useSelector((state: RootState) => state.user.loading);
export const selectUserFilter = () => useSelector((state: RootState) => state.user.filter);
export const selectFilteredUsers = () => useSelector(({ user: slice }: RootState) => {
  const { users, filter } = slice;
  let filteredUsers = cloneDeep(users);
  if (filter?.search) {
    filteredUsers = filteredUsers.filter((user: User) => {
      const firstName = user.firstName.toLowerCase().trim();
      const lastName = user.lastName.toLowerCase().trim();
      return firstName.includes(filter.search) || lastName.includes(filter.search);
    });
  }
  return filteredUsers;
});

export default userSlice.reducer;
