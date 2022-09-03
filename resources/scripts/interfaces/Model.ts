
export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  permission?: string;
  status?: string;
};

export interface Account {
  accountId: string;
  age: number;
  status: string;
  availability: string;
  userId: string;
  user: User
}
