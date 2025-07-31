import fs from 'fs';
import path from 'path';

const USERS_FILE_PATH = path.join(process.cwd(), 'src/app/api/users.json');

interface User {
  email: string;
  password: string;
  verified: boolean;
  createdAt: string;
  verificationToken?: string;
}

interface UsersData {
  users: User[];
}

// Чтение данных пользователей из файла
export function getUsers(): UsersData {
  try {
    if (!fs.existsSync(USERS_FILE_PATH)) {
      return { users: [] };
    }
    const data = fs.readFileSync(USERS_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return { users: [] };
  }
}

// Запись данных пользователей в файл
export function saveUsers(usersData: UsersData): void {
  try {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(usersData, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
  }
}

// Проверка существования пользователя по email
export function userExists(email: string): boolean {
  const usersData = getUsers();
  return usersData.users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// Получение пользователя по email
export function getUserByEmail(email: string): User | null {
  const usersData = getUsers();
  return usersData.users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

// Добавление нового пользователя
export function addUser(user: Omit<User, 'createdAt'>): void {
  const usersData = getUsers();
  const newUser: User = {
    ...user,
    createdAt: new Date().toISOString()
  };
  usersData.users.push(newUser);
  saveUsers(usersData);
}

// Обновление статуса верификации пользователя
export function updateUserVerification(email: string, verified: boolean): void {
  const usersData = getUsers();
  const userIndex = usersData.users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());
  
  if (userIndex !== -1) {
    usersData.users[userIndex].verified = verified;
    if (verified) {
      delete usersData.users[userIndex].verificationToken;
    }
    saveUsers(usersData);
  }
}

// Обновление пароля пользователя
export function updateUserPassword(email: string, newPassword: string): void {
  const usersData = getUsers();
  const userIndex = usersData.users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());
  
  if (userIndex !== -1) {
    usersData.users[userIndex].password = newPassword;
    saveUsers(usersData);
  }
}

// Проверка пароля пользователя
export function verifyUserPassword(email: string, password: string): boolean {
  const user = getUserByEmail(email);
  return user ? user.password === password : false;
} 