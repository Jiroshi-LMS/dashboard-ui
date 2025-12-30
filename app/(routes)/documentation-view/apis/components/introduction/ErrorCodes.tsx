import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const ErrorCodes = () => {
    return (
        <div id="error-codes" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Error Codes
            </h2>

            <p className="text-slate-600 mb-6 leading-relaxed">
                Jiroshi APIs use standardized error codes to help clients reliably identify
                and handle different failure scenarios. Error codes are string literals
                that remain consistent across API versions and environments, even if the
                human-readable error message changes.
            </p>

            <p className="text-slate-600 mb-8 leading-relaxed">
                Whenever an error occurs, the response includes a non-null
                <code className="mx-1 font-mono">error_code</code> field along with an
                appropriate HTTP status code and message.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Data & Validation Errors
            </h3>

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-8">
                <li>
                    <strong>INTEGRITY_ERR</strong> — Database integrity constraint violations,
                    such as foreign key or uniqueness mismatches.
                    <ApiDoc.Body
                        title="INTEGRITY_ERR"
                        code={`{
                            "status": false,
                            "results": false,
                            "message": "Database integrity error !",
                            "data": null,
                            "error_code": "INTEGRITY_ERR"
                        }`}
                        language="json"
                    />
                </li>
                <li>
                    <strong>VALIDATION_ERR</strong> — Invalid input data or failed validation
                    rules based on the request payload.
                    <ApiDoc.Body
                        title="VALIDATION_ERR"
                        code={`{
                            "status": false,
                            "results": false,
                            "message": "API key missing",
                            "data": null,
                            "error_code": "VALIDATION_ERR"
                        }`}
                        language="json"
                    />
                </li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Authentication & Authorization Errors
            </h3>

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-8">
                <li>
                    <strong>API_KEY_ERR</strong> — Issues related to API key authentication,
                    including missing, invalid, malformed, or expired API keys.
                    <ApiDoc.Body
                        title="API_KEY_ERR"
                        code={`{
                            "status": false,
                            "results": false,
                            "message": "API key missing",
                            "data": null,
                            "error_code": "API_KEY_ERR"
                        }`}
                        language="json"
                    />
                </li>
                <li>
                    <strong>INVALID_TOKEN_ERR</strong> — Student authentication failures due
                    to missing, invalid, malformed, or expired access or refresh tokens.
                    <ApiDoc.Body
                        title="INVALID_TOKEN_ERR"
                        code={`{
                            "status": false,
                            "results": false,
                            "message": "Student not authenticated",
                            "data": null,
                            "error_code": "INVALID_TOKEN_ERR"
                        }`}
                        language="json"
                    />
                </li>
                <li>
                    <strong>ACCESS_DENIED_ERR</strong> — Unauthorized access attempts to
                    resources that do not belong to the requesting tenant.
                    <ApiDoc.Body
                        title="ACCESS_DENIED_ERR"
                        code={`{
                            "status": false,
                            "results": false,
                            "message": "Access denied to this resource !",
                            "data": null,
                            "error_code": "ACCESS_DENIED_ERR"
                        }`}
                        language="json"
                    />
                </li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Resource State Errors
            </h3>

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-8">
                <li>
                    <strong>ALREADY_EXISTS_ERR</strong> — Attempt to create a resource that
                    already exists.
                    <ApiDoc.Body
                        title="ALREADY_EXISTS_ERR"
                        code={`{
                            "status": false,
                            "results": false,
                            "message": "Record already exists !",
                            "data": null,
                            "error_code": "ALREADY_EXISTS_ERR"
                        }`}
                        language="json"
                    />
                </li>
                <li>
                    <strong>NOT_FOUND_ERR</strong> — Requested resource could not be found.
                    <ApiDoc.Body
                        title="NOT_FOUND_ERR"
                        code={`{
                            "status": false,
                            "results": false,
                            "message": "Record not found !",
                            "data": null,
                            "error_code": "NOT_FOUND_ERR"
                        }`}
                        language="json"
                    />
                </li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Server Errors
            </h3>

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-8">
                <li>
                    <strong>INTERNAL_ERR</strong> — An unhandled server-side exception.
                    If this error is encountered, please report it with request details
                    as soon as possible.
                    <ApiDoc.Body
                        title="INTERNAL_ERR"
                        code={`{
                            "status": false,
                            "results": false,
                            "message": "Internal Server Error",
                            "data": null,
                            "error_code": "INTERNAL_ERR"
                        }`}
                        language="json"
                    />
                </li>
            </ul>

            <p className="text-slate-600 leading-relaxed">
                Clients are strongly encouraged to rely on
                <code className="mx-1 font-mono">error_code</code> values and HTTP Response
                codes for programmatic
                error handling rather than parsing response messages, which are intended
                primarily for human readability.
            </p>

            <hr className="mt-12 border-slate-100" />
        </div>

    )
}

export default ErrorCodes