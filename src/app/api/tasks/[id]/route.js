import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


export async function GET( request, {params}) {
    try{
        const {id} = params;
        const task = await prisma.task.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        console.log(task);
        return NextResponse.json(task, {status: 200});
    } catch (err) {
        console.log(err);
        return NextResponse.json({message: 'Task not found'}, {status: 404});
    }
    
}

export async function DELETE(request, {params}) {
    try{
        const {id} = params;
        const task = await prisma.task.delete({
            where: {
                id: parseInt(id)
            }
        });
        return NextResponse.json(task, {status: 200});
    } catch (err) {
        console.log(err);
        return NextResponse.error(err, {status: 500});
    }
}

export async function PUT(request, {params}) {
    try{
        const {id} = params;
        const {title, content} = await request.json();
        const task = await prisma.task.update({
            where: {
                id: parseInt(id)
            },
            data: {
                title,
                content
            }
        });
        console.log(task);
        return NextResponse.json(task, {status: 200});
    } catch (err) {
        console.log(err);
        return NextResponse.error(err, {status: 500});
    }
}