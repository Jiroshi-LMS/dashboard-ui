import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const LessonList = () => {
    return (
        <ApiDoc.Root id="list-course-lessons">
            <ApiDoc.Header
                title="List Course Lessons"
                method="GET"
                url="/courses/{courseUUID}/lessons/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Retrieves a paginated list of available lessons under the given course
                for the tenant. This endpoint supports selections, searching, ordering, date
                range filtering, and pagination.
                <br /> <br />
                <strong>Note:</strong>
                <p>Access Token is <b>NOT</b> required to access this endpoint.</p>
            </ApiDoc.Description>

            <ApiDoc.Parameters
                title="Path Parameters"
                parameters={[
                    { name: 'courseUUID', type: 'string', required: true, description: 'The unique identifier of the course.' },
                ]}
            />

            <ApiDoc.Parameters
                title="Supported selectable fields:"
                parameters={[
                    { name: 'uuid', type: 'string', description: 'The unique identifier of the lesson.' },
                    { name: 'title', type: 'string', description: 'The title of the lesson.' },
                    { name: 'description', type: 'string', description: 'The description of the lesson.' },
                    { name: 'duration', type: 'string (Seconds)', description: 'The duration of the lesson IN SECONDS.' },
                    { name: 'created_at', type: 'string (UTC Date)', description: 'The creation date (IN UTC DATETIME FORMAT) of the lesson.' }
                ]}
            />

            <h4 className="text-xs font-semibold text-slate-900 mt-6 mb-2">
                Selections Usage Example
            </h4>

            <ApiDoc.Body
                title="Selections Usage Example"
                language="http"
                code={
                    `GET /courses/{courseUUID}/lessons/?selections=uuid,title`
                }
            />

            <ApiDoc.Parameters
                title="Search Filter Query Params:"
                parameters={[
                    { name: 'search', type: 'string', description: 'Searches for a match in lesson titles or descriptions.' },
                    { name: 'title', type: 'string', description: 'Search lessons by title' }
                ]}
            />

            <h4 className="text-xs font-semibold text-slate-900 mt-6 mb-2">
                Search Filter Usage Example
            </h4>

            <ApiDoc.Body
                title="Usage Example"
                language="http"
                code={
                    `GET /courses/{courseUUID}/lessons/?search=python`
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
                    `GET /courses/{courseUUID}/lessons/?ordering=created_at`
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
                    { name: 'created_at_after', type: 'string', description: 'Filters the results to include only lessons created after the specified date (IN UTC DATETIME FORMAT).' },
                    { name: 'created_at_before', type: 'string', description: 'Filters the results to include only lessons created before the specified date (IN UTC DATETIME FORMAT).' }
                ]}
            />

            <h4 className="text-xs font-semibold text-slate-900 mt-6 mb-2">
                Date Range Filter Usage Example
            </h4>

            <ApiDoc.Body
                title="Date Range Filter Usage Example"
                language="http"
                code={
                    `GET /courses/{courseUUID}/lessons/?created_at_after=2023-01-01&created_at_before=2023-12-31`
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
                title="Lesson List Response"
                language="json"
                code={JSON.stringify(
                    {
                        "status": true,
                        "results": true,
                        "message": "Successfully Fetched",
                        "data": {
                            "results": [
                                {
                                    "uuid": "11111111-1111-1111-1111-111111111111",
                                    "title": "Lesson 1",
                                    "description": "Description 1",
                                    "duration": "860.9667",
                                    "created_at": "2025-10-24T06:01:10.463300Z"
                                },
                                {
                                    "uuid": "22222222-2222-2222-2222-222222222222",
                                    "title": "Lesson 2",
                                    "description": "Description 2",
                                    "duration": "860.9667",
                                    "created_at": "2025-10-24T06:10:09.708923Z"
                                },
                                {
                                    "uuid": "33333333-3333-3333-3333-333333333333",
                                    "title": "Lesson 3",
                                    "description": "Description 3",
                                    "duration": "650.0000",
                                    "created_at": "2025-10-28T06:12:18.083998Z"
                                },
                                {
                                    "uuid": "44444444-4444-4444-4444-444444444444",
                                    "title": "Lesson 4",
                                    "description": "Description 4",
                                    "duration": "860.9667",
                                    "created_at": "2025-10-28T18:49:19.128782Z"
                                },
                                {
                                    "uuid": "55555555-5555-5555-5555-555555555555",
                                    "title": "Lesson 5",
                                    "description": "Description 5",
                                    "duration": "860.9667",
                                    "created_at": "2025-10-30T18:17:24.966641Z"
                                },
                                {
                                    "uuid": "66666666-6666-6666-6666-666666666666",
                                    "title": "Lesson 6",
                                    "description": "Description 6",
                                    "duration": "920.6873",
                                    "created_at": "2025-10-31T19:10:51.296300Z"
                                }
                            ],
                            "pagination": {
                                next: null,
                                previous: null,
                                next_cursor: null,
                                previous_cursor: null
                            }
                        },
                        "error_code": null
                    },
                    null,
                    2
                )}
            />
        </ApiDoc.Root>
    )
}

export default LessonList