'use server'

import axios from "axios"
import { getSession } from "./auth"

export async function getAllAuctions () {
    const res = await axios.get(process.env.ENDPOINT || '')
    return res.data
}

export async function getAuction (id) {
    const res = await axios.get(process.env.ENDPOINT || '')
    return res.data
}

export async function getUserAuctions () {
    const userId = await getSession().then(session => session?.id)

    if (!userId) return null

    const res = await axios.post(process.env.ENDPOINT + 'user/auctions', {
        "user-id": userId,
      })
    return res.data
}

export async function createAuction (formData: FormData) {
    const userId: any = await getSession().then(session => session?.id)

    if (!userId) return null

    formData.append('id', crypto.randomUUID())
    formData.append('user', userId)
    formData.append('status', '0')
    formData.append('date', 'now')

    console.log(formData)
    try {
        const res = await axios.post(process.env.ENDPOINT + 'auction/create', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        console.log(res)
        return res.status
    } catch (error) {
        console.log(error.response.data)
        return error
    }
}


export async function updateAuction (formData: FormData) {
    const user: any = await getSession()

    if (!user) return null

    formData.append('user', user.id)
    formData.append('hash', user.session)

    console.log(formData)
    console.log(JSON.stringify(Object.fromEntries(formData)))


    try {
        const res = await axios.post(process.env.ENDPOINT + 'auction/update', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        console.log(res)
        return res.status
    } catch (error) {
        console.log(error.response.data)
        return error
    }
}