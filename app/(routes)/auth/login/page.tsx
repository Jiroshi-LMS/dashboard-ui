"use client"
import InstructorLoginForm from "@/feature/instructor/components/InstructorLoginForm"
import Link from "next/link"


const LoginPage = () => {

  return (
    <>
      <main className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Aside */}
        <aside className="hidden lg:flex w-full lg:w-[40%] flex-col items-start justify-center bg-teal-700 text-white p-8 lg:p-12 pt-24 lg:pt-12">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Have any questions or suggestions?</h2>
          <p className="text-base lg:text-lg leading-relaxed text-left opacity-90">
            Share what you liked, what didn’t work for you, and how your experience has been so far.
            <br />
            <br />
            Tell us <Link href="https://forms.gle/cNtkxWTjX1jiXMe88" target="_blank" rel="noopener noreferrer" className="text-teal-200 hover:text-white underline underline-offset-4 decoration-current font-medium transition-colors">here</Link> what can be improved or request features that would make the platform more useful for your needs.
            <br />
            <br />
            Your feedback directly helps us improve Jiroshi for developers and instructors building real products.
          </p>
        </aside>

        {/* Right Section */}
        <section className="w-full lg:w-[60%] flex flex-col items-center justify-center p-6 lg:p-12 pt-24 lg:pt-12 bg-white">
          <div className="w-full max-w-md">
            <InstructorLoginForm />
          </div>
        </section>
      </main>
    </>
  )
}

export default LoginPage
