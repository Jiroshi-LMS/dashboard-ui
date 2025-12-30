import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const StudentUpdateDetails = () => {
    return (
        <ApiDoc.Root id="update-student-account">
            <ApiDoc.Header
                title="Update Student Account Details"
                method="PUT"
                url="/students/account/update/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Updates account-level details for the authenticated student. This endpoint
                can be used to update the student identifier and/or password.
            </ApiDoc.Description>

            <ApiDoc.Description>
                For security reasons, all update operations require verification using
                the student’s current password.
            </ApiDoc.Description>

            <ApiDoc.Description>
                <strong>Selections:</strong> Not supported<br />
                <strong>Filters:</strong> Not supported
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Authentication Requirements
            </h4>

            <ApiDoc.Description>
                A valid <strong>student access token</strong> must be provided with the
                request. Requests without a valid token will be rejected.
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Request Body
            </h4>

            <ApiDoc.Body
                title="Update Account Payload"
                language="json"
                code={JSON.stringify(
                    {
                        identifier: "dummy@mail.com",
                        password: "1234567890",
                        current_password: "12345678"
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Warning title="Rules">
                <ul className="list-disc pl-6">
                    <li className="mb-2">
                        At least one of <code className="font-mono text-sm text-slate-900 bg-slate-100 px-1 py-0.5 rounded">identifier</code> or <code className="font-mono text-sm text-slate-900 bg-slate-100 px-1 py-0.5 rounded">password</code>
                        must be provided.
                    </li>
                    <li className="mb-2">
                        <code className="font-mono text-sm text-slate-900 bg-slate-100 px-1 py-0.5 rounded">current_password</code> is mandatory for all update requests
                        and is used to verify the authenticity of the request.
                    </li>
                    <li className="mb-2">
                        Identifier uniqueness is enforced within the instructor tenant.
                    </li>
                    <li className="mb-2">
                        Password updates follow the same length constraints as signup
                        and login flows.
                    </li>
                </ul>
            </ApiDoc.Warning>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Response
            </h4>

            <ApiDoc.Body
                title="Update Response"
                language="json"
                code={JSON.stringify(
                    {
                        status: true,
                        results: true,
                        message: "Student account details updated !",
                        data: null,
                        error_code: null
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                If the update is successful, the new account details take effect
                immediately. Invalid credentials or failed validations will result in
                an authentication or validation error.
            </ApiDoc.Description>
        </ApiDoc.Root>

    )
}

export default StudentUpdateDetails