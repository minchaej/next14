import { NextResponse } from 'next/server';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';

const pump = promisify(pipeline);

// todo add a unlinked file clean up service...

export async function POST(req, res) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');
        const uniqueKey = uuidv4();
        const fileName = `${uniqueKey}-${file.name}`
        const filePath = `./public/file/${fileName}`;

        await pump(file.stream(), fs.createWriteStream(filePath));
        
        return NextResponse.json({
            size: file.size,
            key: fileName
        });
    }
    catch (e) {
        return NextResponse.json({
            status: "File Upload Error",
            data: e.toString()
        });
    }
}
