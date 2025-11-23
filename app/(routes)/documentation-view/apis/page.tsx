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
    title: 'User Management',
    items: [
      { id: 'get-users', title: 'Get All Users' },
      { id: 'create-user', title: 'Create User' },
      { id: 'get-user-details', title: 'Get User Details' },
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
                  <p>All API requests should be made to <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-900 font-mono">https://api.jiroshi.com/v1</code></p>
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
                code={`Authorization: Bearer <YOUR_API_KEY>`}
                language="bash"
              />
              <hr className="mt-12 border-slate-100" />
            </div>

            {/* Get Users - Composable Example */}
            <ApiDoc.Root id="get-users">
              <ApiDoc.Header
                title="Get All Users"
                method="GET"
                url="/users"
              />
              <ApiDoc.Description>
                Returns a list of users. The users are returned in sorted order, with the most recently created users appearing first.
              </ApiDoc.Description>

              <ApiDoc.Custom>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3 text-amber-800 text-sm mb-6">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-500" />
                  <p>
                    <strong>Note:</strong> This endpoint is rate limited to 100 requests per minute.
                  </p>
                </div>
              </ApiDoc.Custom>

              <ApiDoc.Parameters
                parameters={[
                  { name: 'limit', type: 'integer', required: false, description: 'A limit on the number of objects to be returned. Limit can range between 1 and 100.' },
                  { name: 'starting_after', type: 'string', required: false, description: 'A cursor for use in pagination. ' },
                ]}
              />
              <ApiDoc.Response
                code={JSON.stringify({
                  object: 'list',
                  data: [
                    { id: 'usr_123', object: 'user', name: 'Jane Doe', email: 'jane@example.com' },
                    { id: 'usr_456', object: 'user', name: 'John Smith', email: 'john@example.com' }
                  ],
                  has_more: true,
                  url: '/v1/users'
                }, null, 2)}
              />
            </ApiDoc.Root>

            {/* Create User - Composable Example */}
            <ApiDoc.Root id="create-user">
              <ApiDoc.Header
                title="Create User"
                method="POST"
                url="/users"
              />
              <ApiDoc.Description>
                Creates a new user object.
              </ApiDoc.Description>
              <ApiDoc.Body
                code={JSON.stringify({
                  name: 'New User',
                  email: 'new.user@example.com',
                  role: 'member'
                }, null, 2)}
              />
              <ApiDoc.Response
                code={JSON.stringify({
                  id: 'usr_789',
                  object: 'user',
                  name: 'New User',
                  email: 'new.user@example.com',
                  role: 'member',
                  created_at: 1698393600
                }, null, 2)}
              />
            </ApiDoc.Root>

            {/* Get User Details - Composable Example */}
            <ApiDoc.Root id="get-user-details">
              <ApiDoc.Header
                title="Get User Details"
                method="GET"
                url="/users/{id}"
              />
              <ApiDoc.Description>
                Retrieves the details of an existing user. You need only supply the unique user identifier that was returned upon user creation.
              </ApiDoc.Description>
              <ApiDoc.Parameters
                title="Path Parameters"
                parameters={[
                  { name: 'id', type: 'string', required: true, description: 'The identifier of the user to be retrieved.' },
                ]}
              />
              <ApiDoc.Response
                code={JSON.stringify({
                  id: 'usr_123',
                  object: 'user',
                  name: 'Jane Doe',
                  email: 'jane@example.com',
                  role: 'admin'
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