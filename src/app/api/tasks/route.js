import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma';

export async function GET() {
    try{
        const tasks = await prisma.task.findMany();
        console.log(tasks);
        return NextResponse.json(tasks, {status: 200});
    } catch (err) {
        console.log(err);
        return NextResponse.error(err, {status: 500});
    }
}

export async function POST(request) {
    try{
        const {title, content} = await request.json();
        const task = await prisma.task.create({
            data: {
                title,
                content
            }
        });
        console.log(task);
        return NextResponse.json(task, {status: 201});
    } catch (err) {
        console.log(err);
        return NextResponse.error(err, {status: 500});
    }
}