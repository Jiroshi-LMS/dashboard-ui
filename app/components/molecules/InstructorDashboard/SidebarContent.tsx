// 'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
// import { useEffect, useState } from "react"
// import { Sun, Moon, User } from "lucide-react"
import Image from "next/image"

export const SidebarHeaderContent = () => {
  return (
    <header>
      <h3 className="text-md font-bold p-3 text-teal-600">
        <Link href="/instructor/dashboard">
          Jiroshi Dashboard
        </Link>
      </h3>
    </header>
  )
}

export const SidebarFooterContent = () => {

  return (
    <footer className="flex justify-end items-center p-3">
      <p className="font-semibold text-[13px] ">Hey, Instructor</p>
      <Link href={`/instructor/dashboard/profile`}>
        <Avatar className="ml-2">
          <AvatarImage
            src="https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </Link>
    </footer>
  )
}