"use client"
import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-4 h-16 bg-border text-foreground'>
      <span className="font-bold text-xl">Password Master</span>
      <ul className='flex gap-5 items-center'>
        <li>Home</li>
        <li>About</li>
        <li>Contact us</li>
        <li>Services</li>
      </ul>
      <div className="flex gap-2 items-center">
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Authentication Buttons */}
        <SignedOut>
          <Button variant="default">
            <SignInButton />
          </Button>
          <Button variant="outline">
            <SignUpButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
