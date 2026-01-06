import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const Login = () => {
    return (
        <ApiDoc.Root id="login">
            <ApiDoc.Header
                title="Student Login"
                method="POST"
                url="/students/login/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Authenticates an existing student under the authenticated instructor
                tenant. Upon successful login, the student is issued new access and
                refresh tokens based on the client environment.
            </ApiDoc.Description>

            <ApiDoc.Description>
                This endpoint mirrors the signup authentication flow and differs only
                in that it validates existing credentials instead of creating a new
                student record.
            </ApiDoc.Description>

            <ApiDoc.Description>
                <strong>Selections:</strong> Not supported<br />
                <strong>Filters:</strong> Not supported
            </ApiDoc.Description>

            <ApiDoc.SubHeader>
                Request Body
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Login Payload"
                language="json"
                code={JSON.stringify(
                    {
                        identifier: "muteen@mail.com",
                        password: "12345678"
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                The <code>identifier</code> must match the value used during signup and
                must be unique within the instructor tenant.
            </ApiDoc.Description>

            <ApiDoc.SubHeader>
                Response (Browser Environment)
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Browser Response"
                language="json"
                code={JSON.stringify(
                    {
                        access_token: "<access_token>"
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                In browser environments, the refresh token is issued via an
                <strong> HTTP-only cookie</strong> and is not accessible to client-side
                JavaScript.
            </ApiDoc.Description>

            <ApiDoc.Info title="Cross-Origin Requests">
                For the browser to include these secure cookies in cross-origin API requests, you must set
                <code> credentials: 'include'</code> (Fetch API) or <code>withCredentials: true</code> (Axios) in your request configuration.
            </ApiDoc.Info>

            <ApiDoc.SubHeader>
                Response (Non-Browser / Dev Mode / Forced API Mode)
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="API Client Response"
                language="json"
                code={JSON.stringify(
                    {
                        access_token: "<access_token>",
                        refresh_token: "<refresh_token>"
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                For non-browser clients or when API mode is explicitly forced, both
                access and refresh tokens are returned in the response payload.
            </ApiDoc.Description>

            <ApiDoc.Description>
                Token transport behavior follows the same rules described in the
                Authentication section.
            </ApiDoc.Description>
        </ApiDoc.Root>

    )
}

export default Login