import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { Message } from "@/model/User";

export async function POST(request:Request) {
    await dbConnect()
    const {username, content} = await request.json()

    try {
        const user = await UserModel.findOne({username})
        if(!user) {
            return Response.json({
                status: false,
                message: 'User not found'
            }, {status: 404})
        }

        // ===is user acceping messages=====
        if(!user.isAcceptingMessage) {
            return Response.json({
                status: false,
                message: 'User is not accepting messages'
            }, {status: 403})
        }

        const newMessage = { content, createdAt: new Date()}

        user.messages.push(newMessage as Message)
        await user.save()

        return Response.json({
            status: true,
            message: 'Message send successfully'
        }, {status: 200})
    } catch (err) {
        console.log('Error adding messages: ', err)
        return Response.json({
            status: false,
            message: 'Internal server error'
        }, {status: 500})
    }
}