"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"
// import { useEffect, useState } from "react"
// import { Sun, Moon, User } from "lucide-react"
import Image from "next/image"
import { Instructor } from "@/feature/instructor/instructorTypes"
import { staticFiles } from "@/lib/constants/FileConstants"
import { Turtle } from "lucide-react"

export const SidebarHeaderContent = () => {
  const { setOpen } = useSidebar();
  return (
    <header>
      <h3 className="text-md font-bold p-3 text-teal-600">
        <Link
          className="flex items-center gap-2"
          href="/instructor/dashboard"
          onClick={() => setOpen(false)}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center text-white shadow-md shadow-primary/20 shrink-0">
            <Turtle size={12} />
          </div>
          <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap overflow-hidden">Jiroshi</span>
        </Link>
      </h3>
    </header>
  )
}

export const SidebarFooterContent = ({ profile }: { profile: Instructor | null }) => {
  const { setOpen } = useSidebar();

  return (
    <footer className="flex justify-start items-center p-3 gap-3">
      <Link
        href={`/instructor/dashboard/profile`}
        className="shrink-0"
        onClick={() => setOpen(false)}
      >
        <Avatar>
          <AvatarImage
            src={profile?.profile?.profile_picture_url || staticFiles.PROFILE_PLACEHOLDER}
            alt={profile?.full_name || "Instructor"}
          />
          <AvatarFallback>{(profile?.full_name) ? profile?.full_name[0] : "I"}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
        <p className="font-semibold text-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-slate-700">Hey, {profile?.full_name || "Instructor"}</p>
        <p className="text-[11px] text-slate-500 truncate whitespace-nowrap overflow-hidden">Instructor</p>
      </div>
    </footer>
  )
}