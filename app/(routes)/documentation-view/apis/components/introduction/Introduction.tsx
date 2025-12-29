import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import { Info } from 'lucide-react'
import React from 'react'

const Introduction = () => {
    return (
        <div id="introduction" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Introduction</h2>

            <p className="text-slate-600 mb-4 leading-relaxed">
                The Jiroshi REST API provides programmatic access to all core platform
                resources, including instructors, students, courses, enrollments, and
                related operational data. It is intended for building custom integrations,
                instructor-facing tools, internal services, and automated workflows on top
                of the Jiroshi platform.
            </p>

            <p className="text-slate-600 mb-4 leading-relaxed">
                The API follows standard REST conventions, uses JSON for all request and
                response payloads, and is versioned to ensure backward compatibility as the
                platform evolves. Authentication, authorization, and rate limiting are
                enforced consistently across all endpoints.
            </p>

            <p className="text-slate-600 mb-6 leading-relaxed">
                This documentation describes the available endpoints, request/response
                formats, authentication mechanisms, error handling conventions, and
                operational constraints. All the API endpoints are <b>subject to change </b>
                as this is a MVP Version of the API and new platform capabilities will be introduced.
            </p>

            <ApiDoc.Body
                title="Active Base URL for Jiroshi V1"
                code={`https://api.jiroshi.com/api/v1`}
                language="bash"
            />

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-800 text-sm">
                <Info className="w-5 h-5 flex-shrink-0 text-blue-500" />
                <div>
                    <p className="font-semibold mb-1">Base URL</p>
                    <p>
                        All API requests should be made to{" "}
                        <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-900 font-mono">
                            https://api.jiroshi.com/api/v1
                        </code>
                    </p>
                    <p className="mt-2 text-blue-700">
                        <span className="font-semibold">Note:</span> Future versions will be
                        exposed under separate versioned paths (for example,
                        <code className="ml-1 bg-blue-100 px-1 rounded font-mono">/api/v2</code>).
                    </p>
                </div>
            </div>

            <hr className="mt-12 border-slate-100" />
        </div>

    )
}

export default Introduction