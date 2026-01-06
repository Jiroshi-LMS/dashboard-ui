import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const RefreshToken = () => {
    return (
        <ApiDoc.Root id="refresh-token">
            <ApiDoc.Header
                title="Student Refresh Access Token"
                method="POST"
                url="/students/refresh-token/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Issues a new access token by validating a refresh token. On every successful
                refresh, a new refresh token is also issued and the previous refresh token
                is immediately invalidated.
            </ApiDoc.Description>

            <ApiDoc.Description>
                This endpoint is used to maintain authenticated sessions without requiring
                the student to re-enter credentials.
            </ApiDoc.Description>

            <ApiDoc.Description>
                <strong>Selections:</strong> Not supported<br />
                <strong>Filters:</strong> Not supported
            </ApiDoc.Description>

            <ApiDoc.SubHeader>
                Request Body (Browser Environment)
            </ApiDoc.SubHeader>

            <ApiDoc.Description>
                No request body is required when the client is detected as a browser.
                The refresh token is automatically extracted from an
                <strong> HTTP-only cookie</strong>.
            </ApiDoc.Description>

            <ApiDoc.Info title="Cross-Origin Requests">
                For the browser to include these secure cookies in cross-origin API requests, you must set
                <code> credentials: 'include'</code> (Fetch API) or <code>withCredentials: true</code> (Axios) in your request configuration.
            </ApiDoc.Info>

            <ApiDoc.SubHeader>
                Request Body (Non-Browser / Dev Mode / Forced API)
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Refresh Token Payload"
                language="json"
                code={JSON.stringify(
                    {
                        refresh_token: "<refresh_token>"
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                For non-browser clients, the refresh token must be explicitly provided
                in the request body.
            </ApiDoc.Description>

            <ApiDoc.SubHeader>
                Response (Browser Environment)
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Browser Response"
                language="json"
                code={JSON.stringify(
                    {
                        access_token: "<new_access_token>"
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                A new refresh token is issued via an HTTP-only cookie. The previous refresh
                token becomes invalid immediately after rotation.
            </ApiDoc.Description>

            <ApiDoc.SubHeader>
                Response (Non-Browser / Dev Mode / Forced API)
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="API Client Response"
                language="json"
                code={JSON.stringify(
                    {
                        access_token: "<new_access_token>",
                        refresh_token: "<new_refresh_token>"
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                In API mode, both the new access token and rotated refresh token are
                returned in the response payload.
            </ApiDoc.Description>

            <ApiDoc.SubHeader>
                Token Lifetime & Rotation Rules
            </ApiDoc.SubHeader>

            <div className="space-y-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h4 className="font-medium text-slate-800 mb-2">1. Token Lifetimes</h4>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 ml-2">
                        <li>Access tokens: <strong>15 minutes</strong></li>
                        <li>Refresh tokens: <strong>7 days</strong> (sliding window)</li>
                    </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-900 mb-2">2. Rotation Policy (Important)</h4>
                    <p className="text-blue-800 mb-3 text-sm">
                        Jiroshi implements strict <strong>Refresh Token Rotation</strong>.
                        Every time a refresh token is used to get a new access token,
                        a <strong>new refresh token</strong> is issued in the response.
                    </p>
                    <ul className="list-disc list-inside text-blue-800 space-y-1 ml-2 text-sm">
                        <li>You must replace the old refresh token with the new one immediately.</li>
                        <li>The old refresh token becomes <strong>instantly invalid</strong>.</li>
                    </ul>
                </div>

                <ApiDoc.Warning title="Security: Reuse Detection">
                    Attempting to reuse an old/invalidated refresh token is treated as a
                    <strong> security breach</strong> (potential token theft).
                    <br /><br />
                    If a reused token is detected, the system will:
                    <ul className="list-disc list-inside mt-2 ml-2">
                        <li>Immediately revoke the <strong>entire family</strong> of tokens (including the valid one).</li>
                        <li>Force the user to sign in again.</li>
                    </ul>
                </ApiDoc.Warning>
            </div>
        </ApiDoc.Root>

    )
}

export default RefreshToken