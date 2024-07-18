'use server'

import axios from "axios";
import { cookies } from "next/headers";

export default async function POST (req, res) {
    console.log(req.body)
    cookies().set('test', req.body, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
    })
}