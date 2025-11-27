import React from 'react';
import { ApiDoc } from '@/app/components/api-docs/ApiDoc';
import ApiSidebar, { ApiSectionLink } from '@/app/components/api-docs/ApiSidebar';
import { AlertCircle, Info } from 'lucide-react';

const sections: ApiSectionLink[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'authentication', title: 'Authentication' },
    ]
  },
  {
    title: 'Instructor',
    items: [
      { id: 'get-instructor-profile', title: 'Get Profile' },
    ]
  },
  {
    title: 'Courses',
    items: [
      { id: 'list-course-catalogue', title: 'List Catalogue' },
      { id: 'get-course-details', title: 'Get Course Details' },
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
            <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">API Reference</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Welcome to the Jiroshi API documentation. Our API is organized around REST. Our API has predictable resource-oriented URLs, accepts form-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.
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

            {/* Introduction - Custom Section Example */}
            <div id="introduction" className="mb-16 scroll-mt-32">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Introduction</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                The Jiroshi API provides programmatic access to all data in your account. You can use the API to integrate Jiroshi with your existing workflows, build custom dashboards, or automate repetitive tasks.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-800 text-sm">
                <Info className="w-5 h-5 flex-shrink-0 text-blue-500" />
                <div>
                  <p className="font-semibold mb-1">Base URL</p>
                  <p>All API requests should be made to <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-900 font-mono">https://api.jiroshi.com/api/v1</code></p>
                </div>
              </div>
              <hr className="mt-12 border-slate-100" />
            </div>

            {/* Authentication - Custom Section Example */}
            <div id="authentication" className="mb-16 scroll-mt-32">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Authentication</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                The Jiroshi API uses API keys to authenticate requests. You can view and manage your API keys in the Jiroshi Dashboard.
              </p>
              <ApiDoc.Body
                title="Authentication Header"
                code={`x-api-key: <YOUR_API_KEY>`}
                language="bash"
              />
              <hr className="mt-12 border-slate-100" />
            </div>

            {/* Instructor Profile */}
            <ApiDoc.Root id="get-instructor-profile">
              <ApiDoc.Header
                title="Get Instructor Profile"
                method="GET"
                url="/instructor/profile/"
              />
              <ApiDoc.Description>
                Retrieves the profile details of the authenticated instructor.
              </ApiDoc.Description>
              <ApiDoc.Response
                code={JSON.stringify({
                  success: true,
                  data: {
                    id: "inst_123",
                    name: "John Doe",
                    email: "john@example.com",
                    specialization: "Web Development"
                  }
                }, null, 2)}
              />
            </ApiDoc.Root>

            {/* List Course Catalogue */}
            <ApiDoc.Root id="list-course-catalogue">
              <ApiDoc.Header
                title="List Course Catalogue"
                method="GET"
                url="/courses/course-catalogue/"
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