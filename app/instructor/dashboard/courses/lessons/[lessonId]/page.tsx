interface LessonDetailsPageProps {
  params: Promise<{ lessonId: string }>;
}
const lessonDetailsPage = async ({params}: LessonDetailsPageProps) => {
  const { lessonId } = await params
  return (
    <main className="main-container">
      <h1 className="page-title">Lesson Details</h1>
      <div className="flex justify-center items-center w-full h-screen">
        <section className="h-full w-[60%]"></section>
        <aside className="bg-gray-50 h-full w-[40%]"></aside>
      </div>
    </main>
  )
}

export default lessonDetailsPage