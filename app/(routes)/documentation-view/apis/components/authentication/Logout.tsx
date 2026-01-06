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
                token associated with the current session. All clients should call this
                endpoint to ensure tokens are blacklisted on the server.
            </ApiDoc.Description>

            <ApiDoc.Description>
                For browser-based clients, the refresh token is stored in an HTTP-only
                cookie and is cleared automatically upon a successful logout. For
                Non-Browser clients and Dev Mode, the refresh token must be passed
                explicitly in the request body.
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
                For <strong>Browser clients</strong>, no request body is required as the
                refresh token is picked up from the HTTP-only cookie.
            </ApiDoc.Description>

            <ApiDoc.Description>
                For <strong>Non-Browser clients</strong>, <strong>Forced API Mode</strong> and <strong>Dev Mode</strong>, the
                refresh token must be provided in the request body to be blacklisted:
            </ApiDoc.Description>

            <ApiDoc.Body
                title="Logout Request Body (Non-Browser / Dev / Forced API Mode)"
                language="json"
                code={JSON.stringify(
                    {
                        refresh_token: "<token>"
                    },
                    null,
                    2
                )}
            />

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Client-Specific Behavior
            </h4>

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                <li>
                    <strong>Browser Clients:</strong> Calling this endpoint invalidates
                    the refresh token stored in the HTTP-only cookie. You must set <code> credentials: 'include'</code> (Fetch) or <code>withCredentials: true</code> (Axios)
                    to ensure the cookie is sent. Clients should also
                    manually flush the <strong>access token</strong> from local storage.
                </li>
                <li>
                    <strong>Non-Browser & Dev Mode:</strong> These clients <strong>must</strong> call
                    this endpoint passing the `refresh_token` in the request body. This blacklists
                    the token to reduce the blast radius in case of compromise. Clients should then
                    flush <strong>both access and refresh tokens</strong> from local storage.
                </li>
            </ul>

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