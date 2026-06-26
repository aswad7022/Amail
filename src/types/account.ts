export interface Account {
  id: string;

  fullName: string;

  email: string;

  avatar?: string;

  color: string;

  signature: string;

  unread: number;

  primary: boolean;
}