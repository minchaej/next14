'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateUserStatus, setPage, setLimit } from '../lib/userSlice';
import { RootState, AppDispatch } from '../lib/store';
import { User, Status } from '../types/User';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, page, limit, total } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers({ page, limit }));
  }, [page, limit, dispatch]);

  const markUserAsReachedOut = async (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const updatedUser = { ...user, status: Status.REACHED_OUT };

    dispatch(updateUserStatus(updatedUser));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="z-10 w-full max-w-4xl">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>LinkedIn</th>
              <th>Visas Interested</th>
              <th>Open Input</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.linkedin}</td>
                <td>{user.visasInterested}</td>
                <td>{user.openInput}</td>
                <td>{user.resume}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => markUserAsReachedOut(user.id)} className="text-white bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded">
                    Mark as Reached Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button className="text-gray-900 bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium" onClick={() => dispatch(setPage(page - 1))} disabled={page === 1}>
            Previous
          </button>
          <button className="text-gray-900 bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded-md text-sm font-medium" onClick={() => dispatch(setPage(page + 1))} disabled={page >= Math.ceil(total / limit)}>
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
