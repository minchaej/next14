import { NextRequest } from 'next/server';
import { GET, PUT, DELETE } from '../../../app/api/users/[id]/route';
import { createUser, getUser, getUsers, updateUser, deleteUser } from '../../../app/api/inMemoryDB';

describe('API Routes', () => {
    let user: any;

    beforeEach(() => {
        user = createUser({ firstName: "Test", lastName: "User", email: "test.user@example.com", linkedin: "https://linkedin.com/in/testuser", visasInterested: "None", resume: "resume.txt", openInput: "None" });
    });

    test('GET /api/users/[id] should return a user by id', async () => {
        const req = new NextRequest(`http://localhost/api/users/${user.id}`);
        const res = await GET(req);
        const json = await res.json();
        expect(res.status).toBe(200);
        expect(json.id).toBe(user.id);
    });

    test('PUT /api/users/[id] should update a user by id', async () => {
        const req = new NextRequest(`http://localhost/api/users/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify({ firstName: "Updated" }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await PUT(req);
        const json = await res.json();
        expect(res.status).toBe(200);
        expect(json.firstName).toBe("Updated");
    });

    test('DELETE /api/users/[id] should delete a user by id', async () => {
        const req = new NextRequest(`http://localhost/api/users/${user.id}`, {
            method: 'DELETE'
        });
        const res = await DELETE(req);
        const json = await res.json();
        expect(res.status).toBe(200);
        expect(json.id).toBe(user.id);
        expect(json.firstName).toBe(user.firstName);
    });
});
