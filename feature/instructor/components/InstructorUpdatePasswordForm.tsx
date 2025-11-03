import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const InstructorUpdatePasswordForm = () => {
  return (
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
  )
}

export default InstructorUpdatePasswordForm