'use client'

import Loader from "@/app/components/atoms/Loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import InstructorUpdateAccountDetails from "@/feature/instructor/components/InstructorUpdateAccountDetails"
import InstructorUpdatePasswordForm from "@/feature/instructor/components/InstructorUpdatePasswordForm"
import InstructorUpdateProfileForm from "@/feature/instructor/components/InstructorUpdateProfileForm"
import { useAppSelector } from "@/hooks/useRedux"
import { RootState } from "@/store"
import { PlusIcon, TrashIcon, UploadIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const profilePage = () => {
    const { data: instructor, status, loggedIn, error: fetchingError } = useAppSelector(
        (state: RootState) => state.instructor
    );

    const [isLoading, setLoading] = useState<boolean>(false)

  return (
    <main className="main-container">
        <h1 className="page-title">Instructor Profile</h1>
        {
        (isLoading || status === 'loading') ? <Loader className="h-[75vh]" /> : 
        (status === 'failed') ? 
        <div className="flex justify-center items-center min-h-[75vh] w-full">
          <h1 className="text-red-500 font-semibold text-lg text-center max-w-md">
            Unable to fetch course information. Please try again later...
          </h1>
        </div>
        :
        <>
            <InstructorUpdateProfileForm instructor={instructor} setIsUpdatingProfile={setLoading} />
            <InstructorUpdateAccountDetails instructor={instructor} setIsUpdatingProfile={setLoading} />
            <InstructorUpdatePasswordForm />
        </>
        }
    </main>
  )
}

export default profilePage