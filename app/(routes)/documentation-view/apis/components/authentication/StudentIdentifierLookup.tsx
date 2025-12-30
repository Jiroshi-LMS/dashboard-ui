import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const StudentIdentifierLookup = () => {
    return (
        <ApiDoc.Root id="student-identifier-lookup">
            <ApiDoc.Header
                title="Student Identifier Lookup"
                method="POST"
                url="/students/lookup/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Checks whether a student identifier already exists under the authenticated
                instructor tenant.
            </ApiDoc.Description>

            <ApiDoc.Description>
                This is a lightweight helper endpoint intended for client-side validation
                and debounced availability checks. It does not authenticate a student
                or expose any student-specific data.
            </ApiDoc.Description>

            <ApiDoc.Description>
                <strong>Selections:</strong> Not supported<br />
                <strong>Filters:</strong> Not supported
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Request Body
            </h4>

            <ApiDoc.Body
                title="Lookup Payload"
                language="json"
                code={JSON.stringify(
                    {
                        identifier: "muteen@mail.com"
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                The <code>identifier</code> value must follow the same rules as used during
                signup and login. The lookup is scoped strictly to the current instructor
                tenant.
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Response
            </h4>

            <ApiDoc.Body
                title="Lookup Response"
                language="json"
                code={JSON.stringify(
                    {
                        status: true,
                        results: true,
                        message: "Status fetched",
                        data: {
                            student_exists: true
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
                        <code>student_exists</code> indicates whether the identifier is
                        already registered under the current instructor tenant.
                    </li>
                    <li>
                        This endpoint is suitable for debounced checks during signup
                        or account update flows.
                    </li>
                    <li>
                        The lookup does not reveal any additional information about
                        the student.
                    </li>
                </ul>
            </ApiDoc.Description>

            <ApiDoc.Description>
                Support for additional lookup attributes may be introduced in future
                versions of the API.
            </ApiDoc.Description>
        </ApiDoc.Root>

    )
}

export default StudentIdentifierLookup