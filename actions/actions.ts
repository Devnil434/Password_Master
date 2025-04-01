"use server"

import { clerkClient } from '@clerk/nextjs/server'

interface Card {
    cardNo: string,
    expiry: string,
    cvv: number
}

export async function addCardServer(cardNo: string, expiry: string, cvv: number, userId: string) {
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    let cards: Card[] = []
    
    if (Array.isArray(user.privateMetadata.cards)) {
        cards = user.privateMetadata.cards || []
    }
    
    cards.push({ cardNo, expiry, cvv })

    await client.users.updateUserMetadata(userId, {
        privateMetadata: {
            cards: cards
        },
    })
}
