import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const CourseCatalogueList = () => {
    return (
        <ApiDoc.Root id="list-course-catalogue">
            <ApiDoc.Header
                title="List Courses"
                method="GET"
                url="/courses/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Retrieves a paginated list of available courses under the instructor
                tenant. This endpoint supports selections, searching, ordering, date
                range filtering, and cursor-based pagination.
            </ApiDoc.Description>

            <ApiDoc.Warning title='Important Use-Case'>
                If a valid student access token is provided (from authorization header), the response also indicates
                whether the student is enrolled in each course or not via
                <code className="mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">is_enrolled</code> field.
                But if the student access token is expired or invalid, it will throw authentication error.
                <br /><br />
                Now, if the access token is not provided with the request, the
                <code className='mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded'>
                    is_enrolled
                </code>
                field will be set to
                <code className='mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded'>
                    false
                </code> for every course in the list.
            </ApiDoc.Warning>

            <ApiDoc.Parameters
                title="Supported selectable fields:"
                parameters={[
                    { name: 'uuid', type: 'string', description: 'The unique identifier of the course.' },
                    { name: 'title', type: 'string', description: 'The title of the course.' },
                    { name: 'description', type: 'string', description: 'The description of the course.' },
                    { name: 'thumbnail', type: 'string', description: 'The thumbnail URL of the course. (Image File)' },
                    { name: 'duration', type: 'string (Seconds)', description: 'The duration of the course IN SECONDS.' },
                    { name: 'created_at', type: 'string (UTC Date)', description: 'The creation date (IN UTC DATETIME FORMAT) of the course.' }
                ]}
            />

            <ApiDoc.Description>
                <strong>Note:</strong> The <code className="mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">is_enrolled</code> field is always included
                in the response and cannot be excluded via selections. Check Response.
            </ApiDoc.Description>

            <h4 className="text-xs font-semibold text-slate-900 mt-6 mb-2">
                Selections Usage Example
            </h4>

            <ApiDoc.Body
                title="Selections Usage Example"
                language="http"
                code={
                    `GET /courses/?selections=uuid,title`
                }
            />

            <ApiDoc.Parameters
                title="Search Filter Query Params:"
                parameters={[
                    { name: 'search', type: 'string', description: 'Searches for a match in course titles or descriptions.' },
                    { name: 'title', type: 'string', description: 'Search courses by title' }
                ]}
            />

            <h4 className="text-xs font-semibold text-slate-900 mt-6 mb-2">
                Search Filter Usage Example
            </h4>

            <ApiDoc.Body
                title="Usage Example"
                language="http"
                code={
                    `GET /courses/?search=python`
                }
            />

            <ApiDoc.Parameters
                title="Ordering Fields:"
                parameters={[
                    { name: 'created_at', type: 'string', description: 'Orders the results by created_at.' },
                    { name: 'duration', type: 'string', description: 'Orders the results by duration.' }
                ]}
            />

            <h4 className="text-xs font-semibold text-slate-900 mt-6 mb-2">
                Ordering Usage Example
            </h4>

            <ApiDoc.Body
                title="Usage Example"
                language="http"
                code={
                    `GET /courses/?ordering=created_at`
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
                <p>The default ordering is <code className="mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">-created_at</code>.</p>
            </ApiDoc.Description>

            <ApiDoc.Parameters
                title="Date Range Filters:"
                parameters={[
                    { name: 'created_at_after', type: 'string', description: 'Filters the results to include only courses created after the specified date.' },
                    { name: 'created_at_before', type: 'string', description: 'Filters the results to include only courses created before the specified date.' }
                ]}
            />

            <h4 className="text-xs font-semibold text-slate-900 mt-6 mb-2">
                Date Range Filter Usage Example
            </h4>

            <ApiDoc.Body
                title="Date Range Filter Usage Example"
                language="http"
                code={
                    `GET /courses/?created_at_after=2023-01-01&created_at_before=2023-12-31`
                }
            />

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Pagination
            </h4>

            <ApiDoc.Description>
                Pagination is supported and defaults to cursor-based pagination. Page-based
                pagination can be enabled explicitly using
                <code className="mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                    pagination=page
                </code>in query params.
            </ApiDoc.Description>

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Response
            </h4>

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
                                    created_at: "2025-01-10T10:00:00Z",
                                    is_enrolled: false
                                },
                                {
                                    uuid: "22222222-aaaa-bbbb-cccc-000000000002",
                                    title: "Advanced API Design",
                                    description: "Deep dive into scalable API architectures.",
                                    thumbnail: "<course_thumbnail>",
                                    duration: "42500.75",
                                    created_at: "2025-01-05T08:30:00Z",
                                    is_enrolled: true
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
        </ApiDoc.Root>

    )
}

export default CourseCatalogueList