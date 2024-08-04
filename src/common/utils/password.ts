import * as bcrypt from 'bcrypt';

export const generateRandomString = (length = 8) => {
  let password = '';
  const symbols =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }
  return password;
};

export const generatePasswordHash = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const validatePasswordHash = (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
