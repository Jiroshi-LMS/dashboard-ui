'use client'

import Loader from "@/app/components/atoms/Loader"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import InstructorUpdateAccountDetails from "@/feature/instructor/components/InstructorUpdateAccountDetails"
import InstructorUpdatePasswordForm from "@/feature/instructor/components/InstructorUpdatePasswordForm"
import InstructorUpdateProfileForm from "@/feature/instructor/components/InstructorUpdateProfileForm"
import { logoutService } from "@/feature/instructor/instructorServices"
import { useAppSelector } from "@/hooks/useRedux"
import { page } from "@/lib/constants/RouteConstants"
import { RootState } from "@/store"
import { LogOutIcon, PlusIcon, TrashIcon, UploadIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

const profilePage = () => {
  const router = useRouter()

  const { data: instructor, status, loggedIn, error: fetchingError } = useAppSelector(
    (state: RootState) => state.instructor
  );

  const [isLoading, setLoading] = useState<boolean>(false)


  const handleLogout = async () => {
    setLoading(true)
    const loggedOut = await logoutService()
    if (loggedOut) {
      localStorage.removeItem("access")
      router.push(page.LOGIN)
    }
    setLoading(false)
  }

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
              <InstructorUpdatePasswordForm setIsUpdatingProfile={setLoading} />
              <div className="flex justify-end items-center w-full">
                <AlertDialog>
                  <AlertDialogTrigger className="flex justify-center items-center gap-2 bg-red-400 hover:bg-red-500 cursor-pointer
                  text-white px-4 py-2 font-semibold text-[13px] rounded-md mt-10 mx-8">Logout <LogOutIcon className="w-4" /></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure, you want to log out ?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-red-400 hover:bg-red-500 cursor-pointer text-white">
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
      }
    </main>
  )
}

export default profilePage