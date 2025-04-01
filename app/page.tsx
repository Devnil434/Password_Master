import { AddCard } from "@/components/add-card"
import { AddPassword } from "@/components/add-password"
import { YourCards } from "@/components/your-cards"
import { YourPasswords } from "@/components/your-passwords"
import type { Metadata } from 'next'
import { currentUser} from "@clerk/nextjs/server"


export const metadata: Metadata = {
  title: 'Password Master - Home',
  description: 'This is homepage of my password master'
}

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Password Master</h1>

      {/* Add Items Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Add a Credit Card</h2>
          <AddCard />
        </div>

        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Add a Password</h2>
          <AddPassword />
        </div>
      </div>

      {/* Saved Items Section */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Your Cards</h2>
          <YourCards />
        </div>

        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Your Passwords</h2>
          <YourPasswords />
        </div>
      </div>
    </main>
  )
}
