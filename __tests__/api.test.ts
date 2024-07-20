import { createUser, getUser, getUsers, updateUser, deleteUser } from '../app/api/inMemoryDB';
import { User, Status } from '../app/types/User';

describe('User Repository', () => {
    let user1: Omit<User, 'id' | 'status'>;
    let user2: Omit<User, 'id' | 'status'>;

    beforeEach(() => {
        user1 = { firstName: "Test", lastName: "User1", email: "test.user1@example.com", linkedin: "https://linkedin.com/in/testuser1", visasInterested: "None", resume: "resume1.txt", openInput: "None" };
        user2 = { firstName: "Test", lastName: "User2", email: "test.user2@example.com", linkedin: "https://linkedin.com/in/testuser2", visasInterested: "None", resume: "resume2.txt", openInput: "None" };
    });

    test('should create a new user', () => {
        const newUser = createUser(user1);
        expect(newUser.id).toBeDefined();
        expect(newUser.status).toBe(Status.PENDING);
        expect(newUser.firstName).toBe(user1.firstName);
    });

    test('should get a user by id', () => {
        const newUser = createUser(user1);
        const foundUser = getUser(newUser.id);
        expect(foundUser).toEqual(newUser);
    });

    test('should update a user by id', () => {
        const newUser = createUser(user1);
        const updatedUser = updateUser(newUser.id, { firstName: "Updated" });
        expect(updatedUser).not.toBeNull();
        expect(updatedUser?.firstName).toBe("Updated");
    });

    test('should delete a user by id', () => {
        const newUser = createUser(user1);
        const deletedUser = deleteUser(newUser.id);
        expect(deletedUser).not.toBeNull();
        expect(deletedUser?.id).toBe(newUser.id);
        expect(getUser(newUser.id)).toBeUndefined();
    });
});
