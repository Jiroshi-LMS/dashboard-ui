"use client"

import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { z } from "zod"
import { useForm } from "react-hook-form"
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
import { UploadIcon } from "lucide-react"

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.email().refine((val) => !!val, {
    message: "Enter a valid email address.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters."),
  phoneNumber: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number."),
})

const SetProfilePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form Submitted:", values)
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
          <div className="w-full space-y-8">
            <h1 className="text-3xl font-semibold text-center">Setup Instructor Profile</h1>
            
            <div className="flex flex-col justify-center items-start w-[80%] mx-auto">

                <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col justify-start items-center my-2 gap-4">
                        <div className="flex flex-col justify-center items-center gap-4">
                            <Image src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg" alt="instructor profile" height={150} width={150} className="rounded-full border-[2px] border-teal-700" />
                            <div className="flex flex-col justify-center items-center">
                                <h4 className="font-bold text-black text-[14px]">Profile Picture</h4>
                                <span className="font-medium text-gray-500 text-[12px]">PNG, JPEG under 15 MB</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer text-[12px]'><UploadIcon /> Upload</Button>
                        </div>
                    </div>

                    <div className="my-2 flex flex-col justify-center items-start gap-4 w-[50%]">
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="url-title" className="text-[14px]">Location</Label>
                            <Input placeholder="Location" className="w-full" name="url-title" id="url-title" />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label htmlFor="reference-url" className="text-[14px]">Bio</Label>
                            <Textarea placeholder="Bio" className="w-full h-[7em]" name="reference-url" id="reference-url"></Textarea>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center w-full my-6">
                    {/* <Button className='bg-gray-300 text-gray-500 hover:bg-gray-400 hover:text-white cursor-pointer my-4'>Skip</Button> */}
                    <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer my-4'>Next</Button>
                </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default SetProfilePage
