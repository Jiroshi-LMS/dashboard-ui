interface CourseDetailsPageProps {
  params: { slug: string };
}

const courseDetailsPage = ({params}: CourseDetailsPageProps) => {
  const { slug } = params
  return (
    <main className="main-container">
      <h1 className="page-title">Course Details</h1>
      <div className="flex justify-center items-center w-full h-screen">
        <section className="h-full w-[60%]"></section>
        <aside className="bg-gray-50 h-full w-[40%]"></aside>
      </div>
    </main>
  )
}

export default courseDetailsPage