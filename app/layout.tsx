import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Navbar from "./components/Navbar"

export const metadata: Metadata = {
  title: "PokéApp",
  description: "Una aplicación para explorar información sobre Pokémon",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}