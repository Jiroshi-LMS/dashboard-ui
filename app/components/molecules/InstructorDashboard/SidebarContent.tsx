// 'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
// import { useEffect, useState } from "react"
// import { Sun, Moon, User } from "lucide-react"
import Image from "next/image"
import { Instructor } from "@/feature/instructor/instructorTypes"
import { staticFiles } from "@/lib/constants/FileConstants"

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

export const SidebarFooterContent = ({ profile }: { profile: Instructor | null }) => {

  return (
    <footer className="flex justify-end items-center p-3">
      <p className="font-semibold text-[13px] overflow-hidden whitespace-nowrap text-ellipsis">Hey, {profile?.full_name || "Instructor"}</p>
      <Link href={`/instructor/dashboard/profile`}>
        <Avatar className="ml-2">
          <AvatarImage
            src={profile?.profile?.profile_picture_url || staticFiles.PROFILE_PLACEHOLDER}
            alt={profile?.full_name || "Instructor"}
          />
          <AvatarFallback>{(profile?.full_name) ? profile?.full_name[0] : "I"}</AvatarFallback>
        </Avatar>
      </Link>
    </footer>
  )
}