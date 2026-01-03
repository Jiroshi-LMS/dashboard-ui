"use client";
import CourseListData from "@/feature/courses/components/courses/CourseListData";

const courseManagementPage = () => {
  return (
    <main className="main-container">
      <h1 className="page-title">All Your Courses</h1>
      <CourseListData />
    </main>
  );
};

export default courseManagementPage;
