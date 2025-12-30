import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const Signup = () => {
    return (
        <ApiDoc.Root id="signup">
            <ApiDoc.Header
                title="Student Signup"
                method="POST"
                url="/students/signup/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Registers a new student under the authenticated instructor tenant.
                Upon successful signup, the student is authenticated immediately and
                issued access and refresh tokens based on the client environment.
            </ApiDoc.Description>

            <ApiDoc.Description>
                The signup flow currently requires only an identifier and password.
                Additional student attributes may be introduced in future versions
                of the API.
            </ApiDoc.Description>

            <ApiDoc.Description>
                <strong>Selections:</strong> Not supported<br />
                <strong>Filters:</strong> Not supported
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Request Body
            </h4>

            <ApiDoc.Body
                title="Signup Payload"
                language="json"
                code={JSON.stringify(
                    {
                        identifier: "dummy@mail.com",
                        password: "12345678"
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                <strong>identifier</strong> is a flexible, tenant-defined unique identifier.
                It may represent an email address, mobile number, student ID, or any other
                identifier scheme required by the instructor.
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Server-Side Validation Rules
            </h4>

            <ApiDoc.Warning title="Server-side Validations">
                The server performs only minimal validation during signup:
                <ul className="list-disc list-inside">
                    <li className="mt-1">
                        The <code className='font-mono text-slate-900 bg-slate-100 p-1'>identifier</code> must be unique within the instructor
                        tenant.
                    </li>
                    <li className="mt-1">
                        <code className='font-mono text-slate-900 bg-slate-100 p-1'>identifier</code> length must be between 1 and 255 characters.
                    </li>
                    <li className="mt-1">
                        <code className='font-mono text-slate-900 bg-slate-100 p-1'>password</code> length must be between 8 and 72 characters.
                    </li>
                </ul>
                <br />
                <b>All additional identifier validation (format, pattern, semantics) must
                    be enforced on the client side.</b>
            </ApiDoc.Warning>

            <ApiDoc.Description>
                Passwords are securely hashed and never stored or transmitted in
                plain text.
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Response (Browser Environment)
            </h4>

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

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Response (Non-Browser / Forced API Mode)
            </h4>

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
                For non-browser clients (mobile, desktop, server-side applications) or
                when API mode is explicitly forced, both access and refresh tokens are
                returned in the response payload.
            </ApiDoc.Description>

            <ApiDoc.Description>
                The exact token transport behavior depends on client detection and
                headers, as described in the Authentication Transport and Client Detection section.
            </ApiDoc.Description>
        </ApiDoc.Root>

    )
}

export default Signup