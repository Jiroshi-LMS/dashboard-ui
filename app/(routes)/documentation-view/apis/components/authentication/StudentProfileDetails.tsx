import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const StudentProfileDetails = () => {
    return (
        <ApiDoc.Root id="student-profile-details">
            <ApiDoc.Header
                title="Get Student Profile"
                method="GET"
                url="/students/profile/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Retrieves basic profile information for the authenticated student.
                This endpoint requires a valid student access token.
            </ApiDoc.Description>

            <ApiDoc.Description>
                At present, the student profile contains minimal data. As the platform
                evolves, additional profile attributes will be added to this response
                without changing the endpoint contract.
            </ApiDoc.Description>

            <ApiDoc.Description>
                <strong>Selections:</strong> Not supported<br />
                <strong>Filters:</strong> Not supported
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Authentication Requirements
            </h4>

            <ApiDoc.Description>
                A valid <strong>student access token</strong> must be provided in the
                request headers. Requests with expired or invalid tokens will fail.
            </ApiDoc.Description>

            <ApiDoc.SubHeader>
                Response
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Student Profile Response"
                language="json"
                code={JSON.stringify(
                    {
                        status: true,
                        results: true,
                        message: "Student Profile Fetched !",
                        data: {
                            uuid: "<student_uuid>",
                            identifier: "<student_identifier>"
                        },
                        error_code: null
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                <strong>Notes:</strong>
                <ul>
                    <li>
                        This endpoint can be used to verify whether a student is currently
                        authenticated.
                    </li>
                    <li>
                        If the access token is expired or invalid, the request will fail,
                        indicating that re-authentication or token refresh is required.
                    </li>
                    <li>
                        Additional student profile fields will be added in future
                        versions without breaking existing clients.
                    </li>
                </ul>
            </ApiDoc.Description>
        </ApiDoc.Root>

    )
}

export default StudentProfileDetails