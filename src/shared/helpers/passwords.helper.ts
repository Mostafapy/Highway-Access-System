import { compare, hash } from 'bcrypt';
import { SALT } from '../constants/common.constant';

export const hashPassword = (password: string) => {
  return hash(password, SALT);
};

export const comparePasswords = (password: string, hashValue: string): Promise<boolean> => {
  return compare(password, hashValue);
};
