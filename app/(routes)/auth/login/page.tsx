"use client"
import InstructorLoginForm from "@/feature/instructor/components/InstructorLoginForm"
import Link from "next/link"


const LoginPage = () => {

  return (
    <>
      <main className="flex w-screen min-h-screen">
        {/* Left Aside */}
        <aside className="w-[40%] flex flex-col items-start justify-center bg-teal-700 text-white p-10">
          <h2 className="text-3xl font-bold mb-4">Have any questions or suggestions?</h2>
          <p className="text-lg leading-relaxed text-left">
            Share what you liked, what didn’t work for you, and how your experience has been so far.
            <br />
            <br />
            Tell us <Link href="https://forms.gle/cNtkxWTjX1jiXMe88" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline">here</Link> what can be improved or request features that would make the platform more useful for your needs.
            <br />
            <br />
            Your feedback directly helps us improve Jiroshi for developers and instructors building real products.
          </p>
        </aside>

        {/* Right Section */}
        <section className="w-[60%] flex flex-col items-center justify-center h-full p-10">
          <InstructorLoginForm />
        </section>
      </main>
    </>
  )
}

export default LoginPage
