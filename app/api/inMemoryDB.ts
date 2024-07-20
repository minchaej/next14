// like user repo class
import {User, Status} from '../types/User'

  let users: User[] = [];
  let idCounter = 1;
  
  export function getUsers(page: number, limit: number): { users: User[], total: number } {
    const start = (page - 1) * limit;
    const end = page * limit;
    return { users: users.slice(start, end), total: users.length };
  }
  
  export function getUser(id: number): User | undefined {
    return users.find(user => user.id === id);
  }
  
  export function createUser(user: Omit<User, 'id' | 'status'>): User {
    const newUser: User = { id: idCounter++, status: Status.PENDING, ...user };
    users.push(newUser);
    return newUser;
  }
  
  export function updateUser(id: number, updatedUser: Partial<User>): User | null {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    return users[userIndex];
  }
  
  export function deleteUser(id: number): User | null {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    const deletedUser = users[userIndex];
    users = users.filter(user => user.id !== id);
    return deletedUser;
  }
