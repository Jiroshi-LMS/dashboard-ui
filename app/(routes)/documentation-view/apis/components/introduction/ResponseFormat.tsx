import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const ResponseFormat = () => {
    return (
        <div id="response-format" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Response Format
            </h2>

            <p className="text-slate-600 mb-6 leading-relaxed">
                All Jiroshi API responses follow a consistent, envelope-based JSON structure.
                This applies to both successful and failed requests, allowing clients to
                reliably parse and handle responses across all endpoints.
            </p>

            <ApiDoc.Body
                title="Standard Response Structure"
                code={JSON.stringify({
                    "status": true,
                    "results": true,
                    "message": "Success",
                    "data": {
                        "id": "c1a2b3d4-e89b-12d3-a456-426614174000",
                        "name": "Introduction to Backend Development",
                        "is_active": true,
                        "created_at": "2025-01-12T10:42:31Z"
                    },
                    "error_code": null
                }, null, 2)}
                language="json"
            />

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-8">
                <li>
                    <strong>status</strong> — Indicates whether the request was successfully
                    processed (<code>true</code>) or failed (<code>false</code>).
                </li>
                <li>
                    <strong>results</strong> — Indicates whether the
                    <code className="mx-1 font-mono">data</code> field is non-null.
                </li>
                <li>
                    <strong>message</strong> — A human-readable success or error message.
                </li>
                <li>
                    <strong>data</strong> — The response payload containing resource data.
                </li>
                <li>
                    <strong>error_code</strong> — A machine-readable error identifier, or
                    <code className="mx-1 font-mono">null</code> for successful responses.
                </li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Paginated Response Structure
            </h3>

            <p className="text-slate-600 mb-4 leading-relaxed">
                Endpoints that return collections use a paginated response format.
                Pagination metadata is included alongside the result set.
            </p>

            <ApiDoc.Body
                title="Paginated Response Structure"
                code={JSON.stringify({
                    "status": true,
                    "results": true,
                    "message": "Successfully Fetched",
                    "data": {
                        "results": [
                            {
                                "uuid": "a12f3c9b-4e91-44de-bf6a-9f1a2a6d90ab",
                                "title": "Advanced Django Course",
                                "description": "",
                                "thumbnail": "<thumbnail_url>",
                                "duration": "39600.9667",
                                "created_at": "2025-10-02T14:20:11.544767Z",
                                "is_enrolled": false
                            },
                            {
                                "uuid": "a12f3c9b-4e91-44de-bf6a-9f1a2a6d90ab",
                                "title": "Learn Python",
                                "description": "",
                                "thumbnail": "<thumbnail_url>",
                                "duration": "15876.9667",
                                "created_at": "2025-10-02T14:20:11.544767Z",
                                "is_enrolled": false
                            },
                            {
                                "uuid": "a12f3c9b-4e91-44de-bf6a-9f1a2a6d90ab",
                                "title": "Learn JavaScript",
                                "description": "",
                                "thumbnail": "<thumbnail_url>",
                                "duration": "15876.9667",
                                "created_at": "2025-10-02T14:20:11.544767Z",
                                "is_enrolled": false
                            }
                        ],
                        "pagination": {
                            "count": 3,
                            "total_pages": 1,
                            "current_page": 1,
                            "next": null,
                            "previous": null
                        }
                    },
                    "error_code": null
                }, null, 2)}
                language="json"
            />

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-8">
                <li>
                    <strong>results</strong> — A list of resource objects for the current page.
                </li>
                <li>
                    <strong>pagination</strong> — Metadata used to navigate large result sets.
                </li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Error Response Structure
            </h3>

            <p className="text-slate-600 leading-relaxed">
                Error responses use the same envelope structure, with
                <code className="mx-1 font-mono">status</code> and
                <code className="mx-1 font-mono">results</code> set to
                <code className="mx-1 font-mono">false</code>,
                <code className="mx-1 font-mono">data</code> set to
                <code className="mx-1 font-mono">null</code>
                or maybe some structured error, and a non-null
                <code className="mx-1 font-mono">error_code</code>.
            </p>

            {/* Placeholder: Add full error response examples */}
            <ApiDoc.Body
                title="Sample Error Response"
                code={JSON.stringify({
                    "status": false,
                    "results": false,
                    "message": "API key missing",
                    "data": null,
                    "error_code": "INVALID_TOKEN_ERR"
                }, null, 2)}
                language="json"
            />

            {/* Placeholder: Add HTTP status code to error_code mapping */}
            {/* Placeholder: Add empty-state pagination behavior */}

            <hr className="mt-12 border-slate-100" />
        </div>

    )
}

export default ResponseFormat