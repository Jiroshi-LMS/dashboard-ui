import React from 'react';
import { ApiDoc } from '@/app/components/api-docs/ApiDoc';
import ApiSidebar, { ApiSectionLink } from '@/app/components/api-docs/ApiSidebar';
import { AlertCircle, Info } from 'lucide-react';
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



const sections: ApiSectionLink[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'api-keys', title: 'API Keys' },
      { id: 'api-key-usage', title: 'API Key Usage' },
      { id: 'response-format', title: 'Response Format' },
      { id: 'error-codes', title: 'Error Codes' },
      { id: 'pagination', title: 'Working with Pagination' },
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
      { id: 'update-student-details', title: 'Update Student Details' },
      { id: 'student-identifier-lookup', title: 'Student Identifier Lookup' }
    ]
  },
  {
    title: 'Courses',
    items: [
      { id: 'list-course-catalogue', title: 'List Catalogue' },
      { id: 'get-course-details', title: 'Get Course Details' },
      { id: 'list-course-lessons', title: 'List Course Lessons' },
      { id: 'enroll-to-course', title: 'Enroll to Course' },
      { id: 'get-lesson', title: 'Get Lesson' },
      { id: 'lesson-resources', title: 'Lesson Extra Resources' },
      { id: 'student-enrolled-courses', title: 'Student Enrolled Courses' }
    ]
  }
];

const ApiDocumentationPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight"><span className="text-teal-500">Jiroshi V1</span> API Reference</h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              The Jiroshi REST API provides a secure, scalable interface for managing instructors,
              students, courses, enrollments, and related platform operations.
              It is designed around standard REST principles, uses JSON for request and response
              payloads, and enforces strict authentication and authorization at every layer.
              The API is built to support multi-tenant instructor workflows, fine-grained access
              control, and extensibility for future features such as payments, analytics, and
              integrations.
              This documentation serves as a technical reference for developers integrating with
              Jiroshi or building internal services on top of its API layer.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl flex gap-12 py-12">
        {/* Sidebar */}
        <ApiSidebar sections={sections} />

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-24">
          <div className="max-w-4xl">

            {/* Introduction */}
            <Introduction />
            <ApiKeys />
            <ApiKeyUsage />
            <ResponseFormat />
            <ErrorCodes />
            <Pagination />
            <SelectionsAndFilters />

            {/* Instructor */}
            <GetInstructorProfile />
            <GetInstructorKPI />

            {/* Authentication */}
            <AuthIntro />
            <AuthTransport />
            <Signup />
            <Login />
            <RefreshToken />
            <Logout />
            <StudentProfileDetails />

            {/* List Course Catalogue */}
            <ApiDoc.Root id="list-course-catalogue">
              <ApiDoc.Header
                title="List Course Catalogue"
                method="GET"
                url="/courses/course-catalogue/"
                authKeyType="public"
              />
              <ApiDoc.Description>
                Returns a list of available courses in the catalogue.
              </ApiDoc.Description>
              <ApiDoc.Response
                code={JSON.stringify({
                  success: true,
                  data: [
                    {
                      id: "course_1",
                      title: "Advanced React Patterns",
                      description: "Master React with advanced patterns.",
                      price: 49.99
                    },
                    {
                      id: "course_2",
                      title: "Node.js Microservices",
                      description: "Build scalable microservices with Node.js.",
                      price: 59.99
                    }
                  ]
                }, null, 2)}
              />
            </ApiDoc.Root>

            {/* Get Course Details */}
            <ApiDoc.Root id="get-course-details">
              <ApiDoc.Header
                title="Get Course Details"
                method="GET"
                url="/courses/course-catalogue/{courseId}/"
                authKeyType="public"
              />
              <ApiDoc.Description>
                Retrieves detailed information about a specific course.
              </ApiDoc.Description>
              <ApiDoc.Parameters
                title="Path Parameters"
                parameters={[
                  { name: 'courseId', type: 'string', required: true, description: 'The unique identifier of the course.' },
                ]}
              />
              <ApiDoc.Response
                code={JSON.stringify({
                  success: true,
                  data: {
                    id: "course_1",
                    title: "Advanced React Patterns",
                    description: "Master React with advanced patterns.",
                    price: 49.99,
                    modules: [
                      { title: "Introduction", duration: "10m" },
                      { title: "HOCs and Render Props", duration: "45m" }
                    ]
                  }
                }, null, 2)}
              />
            </ApiDoc.Root>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ApiDocumentationPage;