'use server'

import axios from "axios"

export async function getAllAuctions () {
    const res = await axios.get(process.env.ENDPOINT || '')
    return res.data
}