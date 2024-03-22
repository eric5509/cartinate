'use client'
import { FetchUserCartRedux } from "@/actions/FetchUserRedux"
import { GetSession } from "@/actions/GetSession"

export const Fetch = async () => {
    const session: any = await GetSession()
    const products = FetchUserCartRedux(session.id)
    return products
}