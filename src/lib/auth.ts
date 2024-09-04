'use server'

import axios from "axios"
import { SignJWT, decodeJwt, jwtVerify } from "jose"
import { cookies } from "next/headers"
import shajs from "sha.js"

const key = new TextEncoder().encode(process.env.JOSEKEY)

export async function encrypt (payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(key)
} 

export async function decrypt (input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256']
    })

    return payload
} 


export async function login (formData: FormData) {
    const hashedPassword = shajs('SHA256').update(formData.get('password')).digest('hex')
    formData.set('password', hashedPassword)

    const res = await axios.post(process.env.ENDPOINT + 'user/login', formData)

    if (res.data.code === 1) {
        return
    }

    if (res.data.code === 0) {
        const user = res.data
        const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        const session = await encrypt({user, expires})

        cookies().set('session', session, { expires, httpOnly: true})
        return "User Logged In"
    }
}

export async function logout () {
    const session = await getSession()

    if (!session) return null

    const formData = new FormData()
    formData.append('id', session.id.toString())
    formData.append('hash', session.session)


    const res = await axios.post(process.env.ENDPOINT + 'user/logout', formData)
    
    if (res.data.code === 0) {
        cookies().delete('session')
        return "User Logged Out"
    }
}

export async function register (formData: FormData) {
    const hashedPassword = shajs('SHA256').update(formData.get('password')).digest('hex')
    formData.set('password', hashedPassword)
    const res = await axios.post(process.env.ENDPOINT + 'user/register', formData)
    console.log(res)
    if (res.data.code === 0) {
        console.log(res.data)
        return "User Registered"
    }
}

export async function deleteAccount () {
    const session = await getSession()

    if (!session) return null

    const formData = new FormData()
    formData.append('id', session.id.toString())
    formData.append('hash', session.session)


    const res = await axios.post(process.env.ENDPOINT + 'user/delete', formData)
    
    if (res.data.code === 0) {
        cookies().delete('session')
        return "User Successfully Deleted"
    }
}

export async function getSession (): Promise<Session | null> {
    const session = cookies().get('session')?.value as any

    if (!session) return null

    const parsed = await decrypt(session)
    const userData = await decodeJwt(parsed.user.user) as any

    return {
        id: userData?.id,
        username: userData?.username,
        email: userData?.email,
        facebook: userData?.facebook,
        number: userData?.number,
        session: userData?.session
    }
}

export async function getUser (): Promise<User | null> {
    const session = cookies().get('session')?.value as any

    if (!session) return null

    const parsed = await decrypt(session)
    const userData = await decodeJwt(parsed.user.user) as any

    return {
        id: userData?.id,
        username: userData?.username,
        email: userData?.email,
        facebook: userData?.facebook,
        number: userData?.number,
    }
}

interface Session {
    id: number
    username: string
    email: string
    facebook: string
    number: string
    session: string
}

interface User {
    id: number
    username: string
    email: string
    facebook: string
    number: string
}