import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const EnrollToCourse = () => {
    return (
        <ApiDoc.Root id="enroll-to-course">
            <ApiDoc.Header
                title="Enroll Student to Course"
                method="POST"
                url="/courses/enroll/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Enrolls the authenticated student into a specified course, making the
                course content accessible to the student.
            </ApiDoc.Description>

            <ApiDoc.Description>
                The current enrollment flow is intentionally minimal and does not
                enforce advanced eligibility or payment checks. As the platform
                evolves and payment workflows are introduced, this endpoint will be
                extended with stricter validation and access controls.
                <br />
                <p>We'll eventually make the use of secret key (sk) mandatory for this endpoint.</p>
            </ApiDoc.Description>

            <ApiDoc.Description>
                <strong>Selections:</strong> Not supported<br />
                <strong>Filters:</strong> Not supported
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Authentication Requirements
            </h4>

            <ApiDoc.Description>
                <ul>
                    <li>
                        A valid <strong>student access token</strong> is required to
                        authenticate the student.
                    </li>
                    <li>
                        A valid <strong>instructor public API key (pk)</strong> must be
                        provided with the request.
                    </li>
                </ul>
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Request Body
            </h4>

            <ApiDoc.Body
                title="Enrollment Payload"
                language="json"
                code={JSON.stringify(
                    {
                        course_uuid: "aaaaaaaa-1111-bbbb-2222-cccccccccccc"
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                The <code className="mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">course_uuid</code> must reference an existing course under the
                instructor tenant.
            </ApiDoc.Description>

            <ApiDoc.SubHeader>
                Response
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Enrollment Response"
                language="json"
                code={JSON.stringify(
                    {
                        status: true,
                        results: true,
                        message: "Enrolled successfully !",
                        data: {
                            "enrollment_id": "bbbbbbbb-bbbb-bbbb-cccc-dddddddddddd"
                        },
                        error_code: null
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                Once enrolled, the student gains access to the course contents
                immediately.
            </ApiDoc.Description>

            <ApiDoc.Description>
                <strong>Note:</strong>
                <ul>
                    <li>
                        Re-enrolling an already enrolled student may result in an
                        <code className="mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">ALREADY_EXISTS_ERR</code>.
                    </li>
                    <li>
                        Enrollment logic will be extended in future versions to support
                        paid courses and additional validation rules.
                    </li>
                </ul>
            </ApiDoc.Description>

            <ApiDoc.Body
                title="Enrollment Error Response"
                language="json"
                code={JSON.stringify(
                    {
                        "status": false,
                        "results": false,
                        "message": "Student already enrolled !",
                        "data": null,
                        "error_code": "ALREADY_EXISTS_ERR"
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Info title="Real-World Business Workflow (Recommended for Now)">
                <p className="mb-3">
                    Until built-in payments are available, tenants can choose to keep
                    student signup and enrollment APIs private.
                </p>

                <p className="mb-3">
                    In this approach, the tenant first collects payment outside the platform
                    and then creates the student account and enrolls the student manually
                    using the API.
                </p>

                <p className="mb-3">
                    Students do not sign up or enroll on their own. Access is granted only
                    after the tenant confirms payment.
                </p>

                <p className="font-semibold mt-4 mb-1">
                    Why this is useful
                </p>

                <ul className="list-disc pl-6 space-y-1 mb-3">
                    <li>Ensures only paid students get access.</li>
                    <li>Gives full control to the tenant.</li>
                    <li>Works well for early launches and private batches.</li>
                </ul>

                <p className="font-semibold mt-4 mb-1">
                    Security note
                </p>

                <p className="mb-3">
                    Since public API keys can be misused, tenants should design access in a
                    way where enrolling without payment does not expose valuable content.
                </p>

                <p className="mb-3">
                    Common ways to do this include using one common course, enrolling paid
                    students into all courses, or keeping premium content behind additional
                    checks.
                </p>

                <p className="mt-4">
                    This setup keeps the platform usable and safe until stronger payment
                    checks are added.
                </p>

                <p className='mt-4 text-red-400'>
                    <strong>
                        Tenant himself/herself will be responsible for any payment security failures or
                        any misconducts by students.
                    </strong>
                </p>

            </ApiDoc.Info>

        </ApiDoc.Root>

    )
}

export default EnrollToCourse