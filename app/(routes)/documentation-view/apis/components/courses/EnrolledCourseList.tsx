import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const EnrolledCourseList = () => {
    return (
        <ApiDoc.Root id="student-enrolled-courses">
            <ApiDoc.Header
                title="Student Enrolled Courses"
                method="GET"
                url="/courses/enrolled/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Retrieves a paginated list of courses that the student is enrolled in.
                This endpoint supports selections, searching, ordering, date
                range filtering, and pagination.
            </ApiDoc.Description>

            <ApiDoc.Description>
                <strong>Note: </strong>
                Student access token is required to access this API. And student must be
                enrolled in the course to access this API.
            </ApiDoc.Description>

            <ApiDoc.Parameters
                title="Supported selectable fields:"
                parameters={[
                    { name: 'uuid', type: 'string', description: 'The unique identifier of the course.' },
                    { name: 'title', type: 'string', description: 'The title of the course.' },
                    { name: 'description', type: 'string', description: 'The description of the course.' },
                    { name: 'thumbnail', type: 'string', description: 'The thumbnail URL of the course. (Image File)' },
                    { name: 'duration', type: 'string (Seconds)', description: 'The duration of the course IN SECONDS.' },
                    { name: 'course_created_at', type: 'string (UTC Date)', description: 'The creation date (IN UTC DATETIME FORMAT) of the course.' },
                    { name: 'enrolled_at', type: 'string (UTC Date)', description: 'The date (IN UTC DATETIME FORMAT) when the student enrolled in the course.' }
                ]}
            />

            <ApiDoc.SubHeader>
                Selections Usage Example
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Selections Usage Example"
                language="http"
                code={
                    `GET /courses/enrolled/?selections=uuid,title`
                }
            />

            <ApiDoc.Parameters
                title="Search Filter Query Params:"
                parameters={[
                    { name: 'search', type: 'string', description: 'Searches for a match in course titles or descriptions.' },
                    { name: 'title', type: 'string', description: 'Search courses by title' }
                ]}
            />

            <ApiDoc.SubHeader>
                Search Filter Usage Example
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Usage Example"
                language="http"
                code={
                    `GET /courses/enrolled/?search=python`
                }
            />

            <ApiDoc.Parameters
                title="Ordering Fields:"
                parameters={[
                    { name: 'course_created_at', type: 'string', description: 'Orders the results by course_created_at.' },
                    { name: 'duration', type: 'string', description: 'Orders the results by duration.' },
                    { name: 'enrolled_at', type: 'string', description: 'Orders the results by enrolled_at.' }
                ]}
            />

            <ApiDoc.SubHeader>
                Ordering Usage Example
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Usage Example"
                language="http"
                code={
                    `GET /courses/enrolled/?ordering=course_created_at`
                }
            />

            <ApiDoc.Info title='Ordering usage Tip'>
                <p>
                    Although already mentioned in 'Selections & Filters' section,
                    it is important to note that, if you want to order the results in descending order, prefix the field name with a minus sign (-).
                    <br /> <br />
                    For example, to order the results by created_at in descending order, use
                    <code className="mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">ordering=-created_at</code> .
                </p>
            </ApiDoc.Info>

            <ApiDoc.Description>
                <strong>Note:</strong>
                <p>The default ordering is <code className="mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">-enrolled_at</code>.</p>
            </ApiDoc.Description>

            <ApiDoc.Parameters
                title="Date Range Filters:"
                parameters={[
                    { name: 'created_at_after', type: 'string', description: 'Filters the results to include only courses created after the specified date (IN UTC DATETIME FORMAT).' },
                    { name: 'created_at_before', type: 'string', description: 'Filters the results to include only courses created before the specified date (IN UTC DATETIME FORMAT).' },
                    { name: 'enrolled_at_after', type: 'string', description: 'Filters the results to include only courses enrolled after the specified date (IN UTC DATETIME FORMAT).' },
                    { name: 'enrolled_at_before', type: 'string', description: 'Filters the results to include only courses enrolled before the specified date (IN UTC DATETIME FORMAT).' }
                ]}
            />

            <ApiDoc.SubHeader>
                Date Range Filter Usage Example
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Date Range Filter Usage Example"
                language="http"
                code={
                    `GET /courses/enrolled/?enrolled_at_after=2023-01-01&enrolled_at_before=2023-12-31`
                }
            />

            <ApiDoc.SubHeader>
                Pagination
            </ApiDoc.SubHeader>

            <ApiDoc.Description>
                Pagination is supported and defaults to cursor-based pagination. Page-based
                pagination can be enabled explicitly using
                <code className="mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                    pagination=page
                </code>in query params.
            </ApiDoc.Description>

            <ApiDoc.SubHeader>
                Response
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Course List Response"
                language="json"
                code={JSON.stringify(
                    {
                        status: true,
                        results: true,
                        message: "Successfully Fetched",
                        data: {
                            results: [
                                {
                                    uuid: "11111111-aaaa-bbbb-cccc-000000000001",
                                    title: "Introduction to Backend Systems",
                                    description: "Learn the fundamentals of backend development.",
                                    thumbnail: "<course_thumbnail>",
                                    duration: "12500.50",
                                    course_created_at: "2025-11-01T06:41:03.008653Z",
                                    enrolled_at: "2025-12-19T05:55:56.087766Z"
                                },
                                {
                                    uuid: "22222222-aaaa-bbbb-cccc-000000000002",
                                    title: "Advanced API Design",
                                    description: "Deep dive into scalable API architectures.",
                                    thumbnail: "<course_thumbnail>",
                                    duration: "42500.75",
                                    course_created_at: "2025-01-05T08:30:00Z",
                                    enrolled_at: "2025-12-20T05:55:56.087766Z"
                                }
                            ],
                            pagination: {
                                next: null,
                                previous: null,
                                next_cursor: null,
                                previous_cursor: null
                            }
                        },
                        error_code: null
                    },
                    null,
                    2
                )}
            />
        </ApiDoc.Root >
    )
}

export default EnrolledCourseList