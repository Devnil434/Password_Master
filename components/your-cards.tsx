"use client"

import { useState } from "react"
import { Copy, CreditCard, Eye, EyeOff, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner" // ✅ Import toast instead of using Toaster

// Mock data for demonstration
const mockCards = [
  {
    id: "1",
    cardName: "Main Credit Card",
    cardNumber: "4111111111111111",
    expiryDate: "12/25",
    cvv: "123",
    cardType: "visa",
  },
  {
    id: "2",
    cardName: "Business Card",
    cardNumber: "5555555555554444",
    expiryDate: "10/24",
    cvv: "321",
    cardType: "mastercard",
  },
]

export function YourCards() {
  const [cards, setCards] = useState(mockCards)
  const [showCardDetails, setShowCardDetails] = useState<Record<string, boolean>>({})

  const toggleCardDetails = (id: string) => {
    setShowCardDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})/g, "$1 ").trim()
  }

  const maskCardNumber = (number: string) => {
    return "•••• ".repeat(3) + number.slice(-4)
  }

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text)
    toast(`${description} copied to clipboard`) // ✅ Corrected
  }

  const deleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id))
    toast("Card deleted successfully") // ✅ Corrected
  }

  return (
    <div className="space-y-4">
      {cards.length === 0 ? (
        <div className="text-center py-8">
          <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No cards saved yet</h3>
          <p className="text-sm text-muted-foreground">Add your first card to see it here.</p>
        </div>
      ) : (
        cards.map((card) => (
          <Card key={card.id} className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <CardTitle className="text-lg">{card.cardName}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Card options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => copyToClipboard(card.cardNumber, "Card number")}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Card Number
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteCard(card.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Card
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>Expires {card.expiryDate}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Card Number</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleCardDetails(card.id)}>
                    {showCardDetails[card.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showCardDetails[card.id] ? "Hide" : "Show"} card details</span>
                  </Button>
                </div>
                <p className="font-mono text-lg">
                  {showCardDetails[card.id] ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 flex justify-between">
              <div>
                <span className="text-xs text-muted-foreground">CVV</span>
                <p className="font-mono">{showCardDetails[card.id] ? card.cvv : "•••"}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard(card.cardNumber, "Card number")}>
                <Copy className="mr-2 h-3 w-3" />
                Copy
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
