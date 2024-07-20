import { NextRequest, NextResponse } from 'next/server';
import { getUser, updateUser, deleteUser } from '../../inMemoryDB';

export async function GET(req: NextRequest) {
    const id = parseInt(req.nextUrl.pathname.split('/').pop() || '', 10);
    const user = getUser(id);
    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
}

export async function PUT(req: NextRequest) {
    const id = parseInt(req.nextUrl.pathname.split('/').pop() || '', 10);
    const updatedUser = await req.json();
    const user = updateUser(id, updatedUser);
    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
}

export async function DELETE(req: NextRequest) {
    const id = parseInt(req.nextUrl.pathname.split('/').pop() || '', 10);
    const user = deleteUser(id);
    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
}
