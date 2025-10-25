import CourseCreationForm from "@/feature/courses/components/courses/CourseCreationForm"

const addCoursePage = () => {
  return (
    <main className="main-container">
      <h1 className="page-title">Add New Course</h1>
      <hr />
      <CourseCreationForm />
    </main>
  )
}

export default addCoursePage