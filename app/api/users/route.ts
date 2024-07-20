import { NextRequest, NextResponse } from 'next/server';
import { getUsers, createUser } from '../inMemoryDB';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const { users, total } = getUsers(page, limit);
  return NextResponse.json({ users, total, page, limit });
}

export async function POST(req: NextRequest) {
  const newUser = await req.json();
  const createdUser = createUser(newUser);
  return NextResponse.json(createdUser);
}
