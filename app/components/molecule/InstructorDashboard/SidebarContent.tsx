// 'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// import { useEffect, useState } from "react"
// import { Sun, Moon, User } from "lucide-react"
import Image from "next/image"

export const SidebarHeaderContent = () => {
  return (
    <header>
      <h3 className="text-md font-bold p-3">
        Jiroshi Dashboard
      </h3>
    </header>
  )
}

export const SidebarFooterContent = () => {

  return (
    <footer className="flex justify-end items-center p-3">
      <p className="font-semibold text-[13px] ">Hey, Instructor</p>
      <Avatar className="ml-2">
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </footer>
  )
}