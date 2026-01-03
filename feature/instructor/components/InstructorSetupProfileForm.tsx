"use client"

import { useAppDispatch } from "@/hooks/useRedux"
import { useRouter } from "next/navigation"
import { useRedirectForLoggedOut } from "../instructorHooks"
import { usePresignedUpload } from "@/hooks/usePresignedUpload"
import { constantFilenames, fileContentTypes, fileUploadPrefixes, PUBLIC_UPLOAD, staticFiles } from "@/lib/constants/FileConstants"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { instructorProfileInfoSchema } from "../instructorSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import toast from "react-hot-toast"
import Image from "next/image"
import { setInstructorProfileService } from "../instructorServices"
import { fetchInstructor } from "../instructorSlice"
import { page } from "@/lib/constants/RouteConstants"
import { profile_completion } from "@/lib/constants/instructorConstants"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { units } from "@/lib/constants/common"
import Loader from "@/app/components/atoms/Loader"
import { Progress } from "@/components/ui/progress"
import { Camera } from "lucide-react"

const InstructorSetupProfileForm = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const allowedFileSize = 5;
    const { instructor, status: instructorFetchingStatus } = useRedirectForLoggedOut()
    const { uploadFile } = usePresignedUpload(
        constantFilenames.PROFILE,
        fileUploadPrefixes.PROFILE,
        PUBLIC_UPLOAD
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
        const uploadTimeout = setTimeout(() => {
            if (profileUploadProgress === 100) setProfileUploadProgress(0);
        }, 500)
        return () => { clearTimeout(uploadTimeout) }
    }, [profileUploadProgress, setProfileUploadProgress])

    useEffect(() => {
        if (instructor) {
            if (instructor.profile_completion_status !== profile_completion.PENDING) router.replace(page.DASHBOARD_HOME)
        }
    }, [instructor])

    const profileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;
            const contentType = file.type
            if (file.type !== fileContentTypes.PNG &&
                file.type !== fileContentTypes.JPG &&
                file.size > allowedFileSize * units.MB)
                throw new Error("Please provide a valid file format.");
            const { objectKey } = await uploadFile(file, contentType, setProfileUploadProgress)
            setImageFile(file)
            form.setValue("profileImg", objectKey as string)
        } catch (err: any) {
            toast.error(err?.message ?? "Something went wrong! Please try again later.")
        }
    }

    const onSubmit = async (values: z.infer<typeof instructorProfileInfoSchema>) => {
        try {
            setIsUpdatingProfile(true);
            const resp = await setInstructorProfileService(values)
            if (!resp?.status) return toast.error(resp?.msg ?? "Unable to update profile! Please try again later.");
            dispatch(fetchInstructor(true))
            setIsUpdatingProfile(false);
            router.replace(page.DASHBOARD_HOME)
        } catch (err: any) {
            setIsUpdatingProfile(false);
            toast.error(err?.message || "Couldn't save your profile info! Please try again later.")
        }
    }

    return (
        <>
            {
                (isUpdatingProfile || instructorFetchingStatus === "loading") ? <Loader className="h-full" /> :
                    <div className="w-full space-y-8">
                        <h1 className="text-3xl font-semibold text-center">Setup Instructor Profile</h1>

                        <div className="flex flex-col justify-center items-start w-full lg:w-[90%] xl:w-[80%] mx-auto">

                            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full gap-8 lg:gap-12">
                                <div className="flex flex-col justify-start items-center my-2 gap-4 w-full lg:w-auto">
                                    <input type="file" className="hidden"
                                        ref={(el) => { profileImageInput.current = el; }}
                                        onChange={profileImageChange} accept=".png,.jpg,.jpeg" />
                                    <div className="flex flex-col justify-center items-center gap-4">
                                        <div className="relative group">
                                            <Image
                                                src={(imageFile) ? URL.createObjectURL(imageFile) :
                                                    ((instructor?.profile?.profile_picture_url) ? instructor?.profile?.profile_picture_url :
                                                        staticFiles.PROFILE_PLACEHOLDER)}
                                                alt="instructor profile" height={160} width={160}
                                                className="rounded-full border-2 border-teal-700 object-cover w-40 h-40 min-w-40 min-h-40 aspect-square shrink-0 shadow-sm"
                                                priority />
                                            <button
                                                type="button"
                                                onClick={() => profileImageInput?.current?.click()}
                                                className="absolute bottom-1 right-1 bg-teal-700 text-white p-2.5 rounded-full shadow-lg hover:bg-teal-800 transition-all transform hover:scale-110 active:scale-95 z-10 border-2 border-white"
                                                title="Upload Profile Picture"
                                            >
                                                <Camera size={20} />
                                            </button>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            {
                                                (profileUploadProgress > 0) ?
                                                    <div className="w-full py-3">
                                                        <Progress value={profileUploadProgress} className="w-full" />
                                                    </div>
                                                    : null
                                            }
                                            <h4 className="font-bold text-black text-[14px]">Profile Picture</h4>
                                            <span className="font-medium text-gray-500 text-[12px]">PNG, JPEG under {allowedFileSize} MB</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="my-2 flex flex-col justify-center items-center lg:items-start gap-4 w-full lg:w-[60%]">
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
                                            <div className="flex justify-center lg:justify-end items-center w-full my-6">
                                                <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer my-4 w-full lg:w-auto transition-all'>Set Profile</Button>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                            <div className="flex justify-center lg:justify-end items-center w-full my-6">
                                <Button
                                    onClick={form.handleSubmit(onSubmit)}
                                    className='bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer my-4 w-full lg:w-auto transition-all'>Skip for now</Button>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default InstructorSetupProfileForm