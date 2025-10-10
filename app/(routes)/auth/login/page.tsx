"use client"

import { useRedirectForLoggedIn } from "@/feature/instructor/instructorHooks"
import InstructorLoginForm from "@/feature/instructor/components/InstructorLoginForm"



const LoginPage = () => {
  const {instructor, status, loggedIn, fetchingError} = useRedirectForLoggedIn()

  return (
    <>
      <main className="flex w-screen min-h-screen">
        {/* Left Aside */}
        <aside className="w-[40%] flex flex-col items-start justify-center bg-teal-700 text-white p-10">
          <h2 className="text-3xl font-bold mb-4">Have any questions or suggestions?</h2>
          <p className="text-lg leading-relaxed text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum exercitationem earum sequi
            dicta atque deleniti, aliquid nesciunt suscipit consectetur fuga beatae magnam!
          </p>
        </aside>

        {/* Right Section */}
        <section className="w-[60%] flex flex-col items-center justify-center h-full p-10">
          <div className="w-full max-w-md space-y-8 pt-[9rem]">
            <h1 className="text-3xl font-semibold text-center">Sign In</h1>
            <InstructorLoginForm />
          </div>
        </section>
      </main>
    </>
  )
}

export default LoginPage
