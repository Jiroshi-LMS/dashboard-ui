"use client"

import InstructorRegistrationForm from "@/feature/instructor/components/InstructorRegistrationForm"
import Loader from "@/app/components/atoms/Loader"


const RegisterPage = () => {

  return (
    <>
      <main className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Aside */}
        <aside className="hidden lg:flex w-full lg:w-[40%] flex-col items-start justify-center bg-teal-700 text-white p-8 lg:p-12 pt-24 lg:pt-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-left">What is Jiroshi?</h2>
          <p className="text-base lg:text-lg leading-relaxed text-left opacity-90">
            <strong>Jiroshi is a headless learning platform that lets you build and run your own course system using flexible APIs and tools.</strong>
            <br />
            <br />
            You handle the experience — Jiroshi handles the backend.
          </p>
        </aside>

        {/* Right Section */}
        <section className="w-full lg:w-[60%] flex flex-col items-center justify-center p-6 lg:p-12 pt-24 lg:pt-12 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-2xl lg:text-3xl font-bold text-center mb-8 text-slate-900">Register as an Instructor</h1>
            <InstructorRegistrationForm />
          </div>
        </section>
      </main>
    </>
  )
}

export default RegisterPage
