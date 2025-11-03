'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TrashIcon, UploadIcon } from 'lucide-react'
import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Instructor } from '../instructorTypes'
import { instructorProfileInfoSchema } from '../instructorSchemas'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { constantFilenames, fileContentTypes, fileUploadPrefixes, PUBLIC_UPLOAD, staticFiles } from '@/lib/constants/FileConstants'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { units } from '@/lib/constants/common'
import toast from 'react-hot-toast'
import { usePresignedUpload } from '@/hooks/usePresignedUpload'
import { Progress } from '@/components/ui/progress'
import { setInstructorProfileService } from '../instructorServices'
import { useAppDispatch } from '@/hooks/useRedux'
import { fetchInstructor } from '../instructorSlice'

const InstructorUpdateProfileForm = ({ 
    instructor,
    setIsUpdatingProfile
}: { 
    instructor: Instructor | null,
    setIsUpdatingProfile: Dispatch<SetStateAction<boolean>>
}) => {
  const allowedFileSize = 5
  const dispatch = useAppDispatch()
  const { uploadFile } = usePresignedUpload(
          constantFilenames.PROFILE, 
          fileUploadPrefixes.PROFILE,
          PUBLIC_UPLOAD
      )
  const form = useForm<z.infer<typeof instructorProfileInfoSchema>>({
    resolver: zodResolver(instructorProfileInfoSchema),
    defaultValues: {
      profileImg: '',
      location: instructor?.profile?.location || '',
      bio: instructor?.profile?.bio || '',
    },
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [profileUploadProgress, setProfileUploadProgress] = useState<number>(0)

  useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!imageFile) return;
            e.preventDefault()
            e.returnValue = "" // required for Chrome to trigger the prompt
        }
        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
        }
    }, [])

    useEffect(() => {
        const uploadTimeout = setTimeout(() => {
            if (profileUploadProgress === 100) setProfileUploadProgress(0);
        }, 500)
        return () => {clearTimeout(uploadTimeout)}
    }, [profileUploadProgress, setProfileUploadProgress])

  const updateProfileFormHandler = async (values: z.infer<typeof instructorProfileInfoSchema>) => {
   try {
        setIsUpdatingProfile(true);
        const resp = await setInstructorProfileService(values)
        if (!resp?.status) return toast.error(resp?.msg ?? "Unable to update profile! Please try again later.");
        dispatch(fetchInstructor(true))
        setIsUpdatingProfile(false);
    } catch (err: any) {
        setIsUpdatingProfile(false);
        toast.error(err?.message || "Couldn't save your profile info! Please try again later.")
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
        const file = e.target.files?.[0];
        if (!file) return;
        const contentType = file.type
        if (file.type !== fileContentTypes.PNG && 
            file.type !== fileContentTypes.JPG && 
            file.size > allowedFileSize * units.MB) 
            throw new Error("Please provide a valid file format.");
        const {objectKey} = await uploadFile(file, contentType, setProfileUploadProgress)
        setImageFile(file)
        form.setValue("profileImg", objectKey as string)
    } catch (err: any) {
        toast.error(err?.message ?? "Something went wrong! Please try again later.")
    }
  }

  const handleDelete = () => {
    setImageFile(null)
    form.setValue('profileImg', undefined)
  }

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-8 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-8">Profile Settings</h2>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-4 md:w-[40%] relative group">
          <div className="relative">
            <Image
              src={(imageFile) ? URL.createObjectURL(imageFile) : instructor?.profile?.profile_picture_url || staticFiles.PROFILE_PLACEHOLDER}
              alt="instructor profile"
              height={160}
              width={160}
              className="rounded-full border-2 border-teal-600 object-cover transition-transform duration-300 group-hover:scale-105 h-[10em] w-[10em]"
            />

            {/* Hover Upload Button */}
            <label
              htmlFor="profile-upload"
              className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md text-teal-600 cursor-pointer hover:bg-teal-50 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
              title="Upload Profile Picture"
            >
              <UploadIcon size={16} />
              <input
                type="file"
                id="profile-upload"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="text-center space-y-1">
            {
                (profileUploadProgress > 0) ? 
                <div className="w-full py-3">
                    <Progress value={profileUploadProgress} className="w-full" />
                </div>
                : null
            }
            <h4 className="font-semibold text-gray-800 text-sm">Profile Picture</h4>
            <p className="text-gray-500 text-xs">PNG or JPEG under {allowedFileSize} MB</p>
          </div>

          <Button
            variant="outline"
            className={`text-sm font-medium flex items-center gap-1 border-red-500 text-red-600 hover:bg-red-50 transition-all duration-200 ${!imageFile ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleDelete}
            disabled={!imageFile}
          >
            <TrashIcon size={14} /> Delete
          </Button>
        </div>

        {/* Info Form Section */}
        <div className="flex flex-col gap-6 w-full md:w-[60%]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(updateProfileFormHandler)} className="space-y-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a short bio about yourself..."
                        className="h-28 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default InstructorUpdateProfileForm
