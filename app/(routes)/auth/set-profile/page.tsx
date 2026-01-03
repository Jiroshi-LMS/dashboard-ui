"use client"

import InstructorSetupProfileForm from "@/feature/instructor/components/InstructorSetupProfileForm"



const SetProfilePage = () => {
  return (
    <>
      <main className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Aside */}
        <aside className="hidden lg:flex w-full lg:w-[40%] flex-col items-start justify-center bg-teal-700 text-white p-8 lg:p-12 pt-24 lg:pt-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Complete Your Profile</h2>
          <p className="text-base lg:text-lg leading-relaxed text-left opacity-90">
            Tell us more about yourself to get started with Jiroshi. This information will help us tailor your experience as an instructor.
          </p>
        </aside>

        {/* Right Section */}
        <section className="w-full lg:w-[60%] flex flex-col items-center justify-center p-6 lg:p-12 pt-24 lg:pt-12 bg-white">
          <div className="w-full">
            <InstructorSetupProfileForm />
          </div>
        </section>
      </main>
    </>
  )
}

export default SetProfilePage
