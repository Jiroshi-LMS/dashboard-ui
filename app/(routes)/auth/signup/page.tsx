"use client"

import { useRedirectForLoggedIn } from "@/feature/instructor/instructorHooks"
import InstructorRegistrationForm from "@/feature/instructor/components/InstructorRegistrationForm"
import Loader from "@/app/components/atoms/Loader"


const RegisterPage = () => {
  const {status: instructorFetchingStatus} = useRedirectForLoggedIn()

  return (
    <>
      <main className="flex w-screen min-h-screen">
        {/* Left Aside */}
        <aside className="w-[40%] flex flex-col items-start justify-center bg-teal-700 text-white p-10">
          <h2 className="text-3xl font-bold mb-4">What is Jiroshi?</h2>
          <p className="text-lg leading-relaxed text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum exercitationem earum sequi
            dicta atque deleniti, aliquid nesciunt suscipit consectetur fuga beatae magnam!
          </p>
        </aside>

        {/* Right Section */}
        <section className="w-[60%] flex flex-col items-center justify-center h-full p-10">
            {
              (instructorFetchingStatus === 'loading' || instructorFetchingStatus === 'succeeded') ?
                <Loader /> : 
                <>
                  <h1 className="text-3xl font-semibold text-center">Register as an Instructor</h1>
                  <InstructorRegistrationForm />
                </>
            }
        </section>
      </main>
    </>
  )
}

export default RegisterPage
