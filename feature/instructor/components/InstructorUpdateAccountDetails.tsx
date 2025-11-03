import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const InstructorUpdateAccountDetails = () => {
  return (
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
  )
}

export default InstructorUpdateAccountDetails