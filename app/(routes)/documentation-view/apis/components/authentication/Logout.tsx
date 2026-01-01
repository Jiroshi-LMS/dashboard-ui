import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const Logout = () => {
    return (
        <ApiDoc.Root id="logout">
            <ApiDoc.Header
                title="Student Logout"
                method="POST"
                url="/students/logout/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Logs out the authenticated student by invalidating the active refresh
                token associated with the current session.
            </ApiDoc.Description>

            <ApiDoc.Description>
                This endpoint is intended primarily for browser-based clients where the
                refresh token is stored in an HTTP-only cookie and cannot be cleared
                directly by client-side code.
            </ApiDoc.Description>

            <ApiDoc.Description>
                <strong>Selections:</strong> Not supported<br />
                <strong>Filters:</strong> Not supported
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Authentication Requirements
            </h4>

            <ApiDoc.Description>
                A valid <strong>student access token</strong> must be provided to call
                this endpoint. The access token is used to identify the session being
                terminated.
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Request Body
            </h4>

            <ApiDoc.Description>
                No request body is required.
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Client-Specific Behavior
            </h4>

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                <li>
                    <strong>Browser Clients:</strong> Calling this endpoint invalidates
                    the refresh token stored in the HTTP-only cookie, effectively ending
                    the session.
                </li>
                <li>
                    <strong>Non-Browser Clients:</strong> This endpoint is not required.
                    Clients should discard access and refresh tokens locally.
                </li>
            </ul>

            <ApiDoc.Description>
                Calling this endpoint from non-browser environments has no additional
                effect beyond local token disposal.
            </ApiDoc.Description>

            <ApiDoc.SubHeader>
                Response
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Logout Response"
                language="json"
                code={JSON.stringify(
                    {
                        status: true,
                        results: true,
                        message: "Logged out successfully",
                        data: null,
                        error_code: null
                    },
                    null,
                    2
                )}
            />
        </ApiDoc.Root>

    )
}

export default Logout