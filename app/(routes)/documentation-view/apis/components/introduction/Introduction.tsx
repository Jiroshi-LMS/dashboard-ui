import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import { Info } from 'lucide-react'
import React from 'react'

const Introduction = () => {
    return (
        <div id="introduction" className="mb-16 scroll-mt-32">
            <ApiDoc.OverviewHeader>
                Introduction
            </ApiDoc.OverviewHeader>

            <p className="text-muted-foreground mb-4 leading-relaxed">
                The Jiroshi REST API provides programmatic access to all core platform
                resources, including instructors, students, courses, enrollments, and
                related operational data. It is intended for building custom integrations,
                instructor-facing tools, internal services, and automated workflows on top
                of the Jiroshi platform.
            </p>

            <p className="text-muted-foreground mb-4 leading-relaxed">
                The API follows standard REST conventions, uses JSON for all request and
                response payloads, and is versioned to ensure backward compatibility as the
                platform evolves. Authentication, authorization, and rate limiting are
                enforced consistently across all endpoints.
            </p>

            <p className="text-muted-foreground mb-6 leading-relaxed">
                This documentation describes the available endpoints, request/response
                formats, authentication mechanisms, error handling conventions, and
                operational constraints. All the API endpoints are <b>subject to change </b>
                as this is a MVP Version of the API and new platform capabilities will be introduced.
            </p>

            <ApiDoc.Body
                title="Active Base URL for Jiroshi V1"
                code={`https://api.jiroshi.com/api/v1/public`}
                language="bash"
            />

            <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900 rounded-lg p-4 flex gap-3 text-sky-800 dark:text-sky-300 text-sm">
                <div>
                    <p className="font-semibold mb-1">Base URL</p>
                    <p>
                        All API requests should be made to{" "}
                        <code className="bg-sky-100 dark:bg-sky-900/50 px-1.5 py-0.5 rounded text-sky-900 dark:text-sky-200 font-mono break-all">
                            https://api.jiroshi.com/api/v1/public
                        </code>
                    </p>
                    <p className="mt-2 text-sky-700 dark:text-sky-400">
                        <span className="font-semibold">Note:</span> Future versions will be
                        exposed under separate versioned paths (for example,
                        <code className="ml-1 bg-sky-100 dark:bg-sky-900/50 px-1 rounded font-mono">/api/v2/public</code>).
                    </p>
                </div>
            </div>

            <hr className="mt-12 border-border" />
        </div>

    )
}

export default Introduction