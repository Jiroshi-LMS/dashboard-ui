"use client"

import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Loader from "@/app/components/atoms/Loader"
import { useRedirectForLoggedOut } from "@/feature/instructor/instructorHooks"
import { page, route } from "@/lib/constants/RouteConstants"
import { constantFilenames, fileContentTypes, fileUploadPrefixes, PUBLIC_UPLOAD } from "@/lib/constants/FileConstants"
import toast from "react-hot-toast"
import { usePresignedUpload } from "@/hooks/usePresignedUpload"
import { instructorProfileInfoSchema } from "@/feature/instructor/instructorSchemas"
import { fetchInstructorService, setInstructorProfileService } from "@/feature/instructor/instructorServices"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/hooks/useRedux"
import { fetchInstructorStrict } from "@/feature/instructor/instructorSlice"
import { profile_completion } from "@/lib/constants/instructorConstants"



const SetProfilePage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {instructor, status: instructorFetchingStatus} = useRedirectForLoggedOut()
  const { uploadFile } = usePresignedUpload(
    constantFilenames.PROFILE, 
    fileUploadPrefixes.PROFILE,
    PUBLIC_UPLOAD, 
    instructor?.uuid
  )

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [profileUploadProgress, setProfileUploadProgress] = useState<number>(0)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false)

  const profileImageInput = useRef<HTMLInputElement | null>(null)

  const form = useForm<z.infer<typeof instructorProfileInfoSchema>>({
    resolver: zodResolver(instructorProfileInfoSchema),
    defaultValues: {
      profileImg: undefined,
      location: "",
      bio: "",
    },
  })

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (instructor?.profile_completion_status !== profile_completion.PENDING) return;
      e.preventDefault()
      e.returnValue = "" // required for Chrome to trigger the prompt
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    if (profileUploadProgress === 100) setProfileUploadProgress(0)
  }, [profileUploadProgress, setProfileUploadProgress])

  const profileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const contentType = file.type || fileContentTypes.OCTET_STREAM
      const {objectKey} = await uploadFile(file, contentType, setProfileUploadProgress)
      setImageFile(file)
      form.setValue("profileImg", objectKey)
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong! Please try again later.")
    }
  }

  const onSubmit = async (values: z.infer<typeof instructorProfileInfoSchema>) => {
    try {
      setIsUpdatingProfile(true);
      const resp = await setInstructorProfileService(values)
      if (!resp?.status) return toast.error(resp?.msg ?? "Unable to update profile! Please try again later.");
      dispatch(fetchInstructorStrict())
      setIsUpdatingProfile(false);
      router.replace(page.DASHBOARD_HOME)
    } catch (err: any) {
      toast.error(err?.message || "Couldn't save your profile info! Please try again later.")
    }
  }

  return (
    <>
      <main className="flex w-screen min-h-screen">
        {/* Left Aside */}
        <aside className="w-[40%] flex flex-col items-start justify-center bg-teal-700 text-white p-10">
          <h2 className="text-3xl font-bold mb-4">This is a Minimum Viable Product (MVP) of Jiroshi</h2>
          <p className="text-lg leading-relaxed text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum exercitationem earum sequi
            dicta atque deleniti, aliquid nesciunt suscipit consectetur fuga beatae magnam!
          </p>
        </aside>


        {/* Right Section */}
        <section className="w-[60%] flex flex-col items-center justify-center h-full p-10">
          {
            (isUpdatingProfile) ? <Loader className="h-full" /> : 
          <div className="w-full space-y-8">
            <h1 className="text-3xl font-semibold text-center">Setup Instructor Profile</h1>
            
            <div className="flex flex-col justify-center items-start w-[80%] mx-auto">

                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col justify-start items-center my-2 gap-4">
                        <input type="file" className="hidden" 
                        ref={(el) => {profileImageInput.current = el;}}
                        onChange={profileImageChange} accept=".png,.jpg,.jpeg" />
                        <div className="flex flex-col justify-center items-center gap-4">
                            <Image 
                              src={(imageFile) ? URL.createObjectURL(imageFile) : 
                                "https://jiroshi-static-dev.s3.ap-south-1.amazonaws.com/defaults/profile-default.png"}
                              alt="instructor profile" height={150} width={150} 
                              className="rounded-full border-[2px] border-teal-700 object-cover object-center
                              h-[10em] w-[10em]"
                              onClick={() => {profileImageInput?.current?.click()}}
                              priority />
                            <div className="flex flex-col justify-center items-center">
                                {
                                  (profileUploadProgress !== 0) ? 
                                    <span>
                                      <b>PROGRESS: </b>
                                      {profileUploadProgress}%
                                    </span>
                                    : null
                                }
                                <h4 className="font-bold text-black text-[14px]">Profile Picture</h4>
                                <span className="font-medium text-gray-500 text-[12px]">PNG, JPEG under 5 MB</span>
                            </div>
                        </div>
                    </div>

                    <div className="my-2 flex flex-col justify-center items-start gap-4 w-[50%]">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                              {/* Email */}
                              <FormField
                                  control={form.control}
                                  name="location"
                                  render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Location</FormLabel>
                                      <FormControl>
                                      <Input type="location" placeholder="location" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                                  )}
                              />

                              {/* Password */}
                              <FormField
                                  control={form.control}
                                  name="bio"
                                  render={({ field }) => (
                                  <FormItem>
                                      <FormLabel>Bio</FormLabel>
                                      <FormControl>
                                      <Textarea placeholder="Bio" {...field}></Textarea>
                                      </FormControl>
                                      <FormMessage />
                                  </FormItem>
                                  )}
                              />
                              <div className="flex justify-end items-center w-full my-6">
                                  {/* <Button className='bg-gray-300 text-gray-500 hover:bg-gray-400 hover:text-white cursor-pointer my-4'>Skip</Button> */}
                                  <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer my-4'>Set Profile</Button>
                              </div>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className="flex justify-end items-center w-full my-6">
                    {/* <Button className='bg-gray-300 text-gray-500 hover:bg-gray-400 hover:text-white cursor-pointer my-4'>Skip</Button> */}
                    <Button 
                    onClick={form.handleSubmit(onSubmit)}
                    className='bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer my-4'>Skip for now</Button>
                </div>
            </div>
          </div>
        }
        </section>
      </main>
    </>
  )
}

export default SetProfilePage
