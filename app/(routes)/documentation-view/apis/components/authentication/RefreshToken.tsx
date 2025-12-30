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

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Request Body (Browser Environment)
            </h4>

            <ApiDoc.Description>
                No request body is required when the client is detected as a browser.
                The refresh token is automatically extracted from an
                <strong> HTTP-only cookie</strong>.
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Request Body (Non-Browser / Forced API Mode)
            </h4>

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

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Response (Browser Environment)
            </h4>

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

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Response (Non-Browser / Forced API Mode)
            </h4>

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

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Token Lifetime & Rotation Rules
            </h4>

            <ApiDoc.Description>
                <ul>
                    <li>
                        Access tokens are valid for <strong>15 minutes</strong>.
                    </li>
                    <li>
                        Refresh tokens are valid for up to <strong>7 days</strong> if not
                        rotated.
                    </li>
                    <li>
                        Every successful refresh request rotates the refresh token.
                    </li>
                    <li>
                        Once rotated, the previous refresh token is permanently invalid
                        and cannot be reused.
                    </li>
                </ul>
            </ApiDoc.Description>

            <ApiDoc.Description>
                Reusing an invalidated or expired refresh token will result in an
                authentication error and requires the student to re-authenticate.
            </ApiDoc.Description>
        </ApiDoc.Root>

    )
}

export default RefreshToken