import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon, TrashIcon, UploadIcon } from "lucide-react"
import Image from "next/image"

const profilePage = () => {
  return (
    <main className="main-container">
        <h1 className="page-title">Instructor Profile</h1>

        <section className="flex flex-col justify-center items-start w-[80%] mx-auto">
            <h2 className="section-title">Profile Settings</h2>

            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col justify-start items-center my-2 gap-4">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <Image src="https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg" alt="instructor profile" height={150} width={150} className="rounded-full border-[2px] border-teal-700" />
                        <div className="flex flex-col justify-center items-center">
                            <h4 className="font-bold text-black text-[14px]">Profile Picture</h4>
                            <span className="font-medium text-gray-500 text-[12px]">PNG, JPEG under 15 MB</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer text-[12px]'><UploadIcon /> Upload</Button>
                        <Button className="bg-red-400 hover:bg-red-500 cursor-pointer text-[12px]"><TrashIcon />Delete</Button>
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
            <div className="flex justify-end items-center w-full">
                <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer my-4'>Save Changes</Button>
            </div>
        </section>

        <section className="flex flex-col justify-center items-start w-[80%] mx-auto">
            <h2 className="section-title">Account Settings</h2>

            <div className="flex justify-center items-center gap-4 w-full">
                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="url-title" className="text-[14px]">Full Name</Label>
                    <Input placeholder="Full Name" className="w-full" name="url-title" id="url-title" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="reference-url" className="text-[14px]">Username</Label>
                    <Input placeholder="Username" className="w-full" name="url-title" id="url-title" />
                </div>
            </div>
            <div className="flex justify-center items-center gap-4 w-full my-4">
                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="url-title" className="text-[14px]">Email</Label>
                    <Input placeholder="Email" className="w-full" name="url-title" id="url-title" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="url-title" className="text-[14px]">Phone Number</Label>
                    <div className="flex justify-center items-center gap-2">
                        <Input type="tel" placeholder="Phone Number" className="w-[4em]" name="url-title" id="url-title" value="+91" disabled/>
                        <Input placeholder="Phone Number" className="w-full" name="url-title" id="url-title" />
                    </div>
                </div>
            </div>
            <div className="flex justify-end items-center w-full">
                <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer my-4'>Save Changes</Button>
            </div>
        </section>

        <section className="flex flex-col justify-center items-start w-[80%] mx-auto">
            <h2 className="section-title">Password Settings</h2>
            
            <div className="flex justify-center items-center gap-4 w-full">
                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="url-title" className="text-[14px]">Current Password</Label>
                    <Input placeholder="Current Password" className="w-full" name="url-title" id="url-title" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <Label htmlFor="reference-url" className="text-[14px]">New Password</Label>
                    <Input placeholder="New Password" className="w-full" name="url-title" id="url-title" />
                </div>
            </div>
            <div className="flex justify-end items-center w-full">
                <Button className='bg-primary text-white hover:bg-teal-600 hover:text-white cursor-pointer my-4'>Save Changes</Button>
            </div>
        </section>
    </main>
  )
}

export default profilePage