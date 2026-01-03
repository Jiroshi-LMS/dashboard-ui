"use client"

import React from 'react';
import { ApiDoc } from '@/app/components/api-docs/ApiDoc';
import ApiSidebar, { ApiSectionLink } from '@/app/components/api-docs/ApiSidebar';
import { AlertCircle, Info, Menu, Turtle } from 'lucide-react';
import Link from 'next/link';
import { SidebarInset } from "@/components/ui/sidebar";
import Introduction from './components/introduction/Introduction';
import ApiKeys from './components/introduction/ApiKeys';
import ApiKeyUsage from './components/introduction/ApiKeyUsage';
import ResponseFormat from './components/introduction/ResponseFormat';
import ErrorCodes from './components/introduction/ErrorCodes';
import Pagination from './components/introduction/Pagination';
import SelectionsAndFilters from './components/introduction/SelectionsAndFilters';
import GetInstructorProfile from './components/instructor/GetInstructorProfile';
import GetInstructorKPI from './components/instructor/GetInstructorKPI';
import AuthIntro from './components/authentication/AuthIntro';
import AuthTransport from './components/authentication/AuthTransport';
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login';
import RefreshToken from './components/authentication/RefreshToken';
import Logout from './components/authentication/Logout';
import StudentProfileDetails from './components/authentication/StudentProfileDetails';
import StudentUpdateDetails from './components/authentication/StudentUpdateDetails';
import StudentIdentifierLookup from './components/authentication/StudentIdentifierLookup';
import CourseCatalogueList from './components/courses/CourseCatalogueList';
import CourseDetails from './components/courses/CourseDetails';
import LessonList from './components/courses/LessonList';
import EnrollToCourse from './components/courses/EnrollToCourse';
import LessonDetails from './components/courses/LessonDetails';
import LessonResources from './components/courses/LessonResources';
import EnrolledCourseList from './components/courses/EnrolledCourseList';



const sections: ApiSectionLink[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'api-keys', title: 'API Keys' },
      { id: 'api-key-usage', title: 'API Key Usage' },
      { id: 'response-format', title: 'Response Format' },
      { id: 'error-codes', title: 'Error Codes' },
      { id: 'pagination', title: 'Pagination Usage' },
      { id: 'selections-and-filtering-options', title: 'Selections & Filters' }
    ]
  },
  {
    title: 'Instructor',
    items: [
      { id: 'get-instructor-profile', title: 'Get Instructor Profile' },
      { id: 'get-instructor-kpis', title: 'Get Instructor KPIs' },
    ]
  },
  {
    title: 'Student Authentication',
    items: [
      { id: 'authentication-intro', title: 'Introduction' },
      { id: 'authentication-transport', title: 'Auth Transport and Client Detection' },
      { id: 'signup', title: 'Signup' },
      { id: 'login', title: 'Login' },
      { id: 'refresh-token', title: 'Refresh Token' },
      { id: 'logout', title: 'Logout' },
      { id: 'student-profile-details', title: 'Student Profile Details' },
      { id: 'update-student-account', title: 'Update Student Details' },
      { id: 'student-identifier-lookup', title: 'Student Identifier Lookup' }
    ]
  },
  {
    title: 'Courses',
    items: [
      { id: 'list-course-catalogue', title: 'List Courses' },
      { id: 'get-course-details', title: 'Get Course Details' },
      { id: 'list-course-lessons', title: 'List Course Lessons' },
      { id: 'enroll-to-course', title: 'Enroll to Course' },
      { id: 'get-lesson', title: 'Get Lesson Details' },
      { id: 'lesson-resources', title: 'Lesson Extra Resources' },
      { id: 'student-enrolled-courses', title: 'Student Enrolled Courses' }
    ]
  }
];

const ApiDocumentationPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      {/* Mobile/Tablet Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[80] bg-white/90 backdrop-blur-xl border-b border-slate-200/60 px-6 h-16 flex items-center justify-between shadow-[0_1px_10px_-5px_rgba(0,0,0,0.1)]">
        <Link className="flex items-center gap-2" href="/instructor/dashboard">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <Turtle size={16} />
          </div>
          <span className="font-black text-slate-800 tracking-tight">Jiroshi Docs</span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 -mr-2 text-slate-500 hover:text-teal-600 bg-slate-50 rounded-lg transition-all"
        >
          <Menu size={20} />
        </button>
      </div>
      <SidebarInset className="w-full max-w-full bg-white">
        {/* Hero Header Section */}
        <div className="bg-[#fafafa] border-b border-slate-200/60 pt-28 md:pt-20 pb-12 overflow-x-hidden relative">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-12 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 text-[10px] font-bold uppercase tracking-widest border border-teal-100 italic">V1.0 Stable</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight break-words leading-tight">
                API <span className="text-teal-600 underline decoration-teal-200 underline-offset-8">Reference</span>
              </h1>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium max-w-2xl">
                Build powerful integrations with Jiroshi's professional LMS engine.
                Our REST API is designed for reliability, speed, and seamless multi-tenant operations.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-8 py-10 relative">
          {/* Sidebar */}
          <ApiSidebar
            sections={sections}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Content */}
          <main className="flex-1 min-w-0 pb-24 overflow-x-hidden">
            <div className="w-full max-w-full md:max-w-6xl overflow-x-hidden">
              {/* Introduction */}
              <Introduction />
              <ApiKeys />
              <ApiKeyUsage />
              <ResponseFormat />
              <ErrorCodes />
              <Pagination />
              <SelectionsAndFilters />

              {/* Instructor */}
              <div className="h-12 md:h-20" />
              <GetInstructorProfile />
              <GetInstructorKPI />

              {/* Authentication */}
              <div className="h-12 md:h-20" />
              <AuthIntro />
              <AuthTransport />
              <Signup />
              <Login />
              <RefreshToken />
              <Logout />
              <StudentProfileDetails />
              <StudentUpdateDetails />
              <StudentIdentifierLookup />

              {/* Courses */}
              <div className="h-12 md:h-20" />
              <CourseCatalogueList />
              <CourseDetails />
              <LessonList />
              <EnrollToCourse />
              <LessonDetails />
              <LessonResources />
              <EnrolledCourseList />
            </div>
          </main>
        </div>
      </SidebarInset>
    </div>
  );
};

export default ApiDocumentationPage;