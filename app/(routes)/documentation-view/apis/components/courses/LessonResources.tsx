import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const LessonResources = () => {
    return (
        <ApiDoc.Root id="lesson-resources">
            <ApiDoc.Header
                title="Lesson Extra Resources"
                method="GET"
                url="/courses/{courseUUID}/lessons/{lessonUUID}/resources/"
                authKeyType="public"
            />
            <ApiDoc.Description>
                Retrieves extra resources of a specific lesson like Files, Notes and Links.
            </ApiDoc.Description>

            <ApiDoc.Parameters
                title="Path Parameters"
                parameters={[
                    { name: 'courseUUID', type: 'string', required: true, description: 'The unique identifier of the course.' },
                    { name: 'lessonUUID', type: 'string', required: true, description: 'The unique identifier of the lesson.' },
                ]}
            />

            <ApiDoc.Description>
                <strong>Note: </strong>
                Student access token is required to access this API. And student must be
                enrolled in the course to access this API.
            </ApiDoc.Description>

            <ApiDoc.Parameters
                title="Supported selectable resource fields:"
                parameters={[
                    { name: 'notes', type: 'string', description: 'The notes of the lesson.' },
                    { name: 'related_links', type: 'string', description: 'The related links of the lesson.' },
                ]}
            />

            <ApiDoc.Parameters
                title="Supported selectable file fields:"
                parameters={[
                    { name: 'uuid', type: 'string', description: 'The unique identifier of the file.' },
                    { name: 'title', type: 'string', description: 'The title of the file.' },
                    { name: 'file_size', type: 'string', description: 'The file size (IN BYTES) of the file.' },
                    { name: 'file_type', type: 'string', description: 'The file type of the file.' },
                    { name: 'file_url', type: 'string', description: 'The file URL of the file.' },
                    { name: 'created_at', type: 'string', description: 'The creation date (IN UTC DATETIME FORMAT) of the file.' },
                ]}
            />

            <ApiDoc.SubHeader>
                Selections Usage Example
            </ApiDoc.SubHeader>

            <ApiDoc.Body
                title="Selections Usage Example"
                language="http"
                code={
                    `GET /courses/{courseUUID}/lessons/{lessonUUID}/resources/?selections=notes,related_links,title,file_size,file_url`
                }
            />

            <ApiDoc.Parameters
                title="Search Filter Query Params for File Resources:"
                parameters={[
                    { name: 'search', type: 'string', description: 'Searches for a match in lesson resource file titles or file_types.' },
                    { name: 'title', type: 'string', description: 'Search lesson resource files by title' },
                    { name: 'file_type', type: 'string', description: 'Search lesson resource files by file_type' }
                ]}
            />

            <h4 className="text-xs font-semibold text-slate-900 mt-6 mb-2">
                Search Filter Usage Example
            </h4>

            <ApiDoc.Body
                title="Usage Example"
                language="http"
                code={
                    `GET /courses/{courseUUID}/lessons/{lessonUUID}/resources/?search=ebook`
                }
            />

            <ApiDoc.Parameters
                title="Ordering Fields for File Resources:"
                parameters={[
                    { name: 'created_at', type: 'string', description: 'Orders file resources list by created_at.' },
                    { name: 'file_size', type: 'string', description: 'Orders file resources list by file_size.' }
                ]}
            />

            <h4 className="text-xs font-semibold text-slate-900 mt-6 mb-2">
                Ordering Usage Example
            </h4>

            <ApiDoc.Body
                title="Usage Example"
                language="http"
                code={
                    `GET /courses/{courseUUID}/lessons/{lessonUUID}/resources/?ordering=created_at`
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
                    { name: 'created_at_after', type: 'string', description: 'Filters the results to include only file resources created after the specified date (IN UTC DATETIME FORMAT).' },
                    { name: 'created_at_before', type: 'string', description: 'Filters the results to include only file resources created before the specified date (IN UTC DATETIME FORMAT).' }
                ]}
            />

            <h4 className="text-xs font-semibold text-slate-900 mt-6 mb-2">
                Date Range Filter Usage Example
            </h4>

            <ApiDoc.Body
                title="Date Range Filter Usage Example"
                language="http"
                code={
                    `GET /courses/{courseUUID}/lessons/{lessonUUID}/resources/?created_at_after=2023-01-01&created_at_before=2023-12-31`
                }
            />

            <ApiDoc.SubHeader>
                Pagination
            </ApiDoc.SubHeader>

            <ApiDoc.Description>
                Pagination is applied to the list of file resources.
                Pagination is supported and defaults to cursor-based pagination. Page-based
                pagination can be enabled explicitly using
                <code className="mx-1 font-mono text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                    pagination=page
                </code>in query params.
            </ApiDoc.Description>

            <ApiDoc.SubHeader>
                Response
            </ApiDoc.SubHeader>

            <ApiDoc.Response
                code={JSON.stringify({
                    "status": true,
                    "results": true,
                    "message": "Successfully Fetched",
                    "data": {
                        "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus nec ante feugiat finibus. Nullam nec metus nec ante feugiat finibus.",
                        "related_links": [
                            {
                                "url": "https://chatgpt.com/",
                                "title": "ChatGPT"
                            }
                        ],
                        "results": [
                            {
                                "uuid": "11111111-aaaa-2222-bbbb-333333333333",
                                "title": "Dummy ref material",
                                "file_size": 8130,
                                "file_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                "file_url": "<file_url>",
                                "created_at": "2025-10-31T19:11:27.180036Z"
                            },
                            {
                                "uuid": "11111111-cccc-2222-dddd-333333333333",
                                "title": "Dummy ref material 2",
                                "file_size": 6130,
                                "file_type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                "file_url": "<file_url>",
                                "created_at": "2025-10-31T19:11:27.180036Z"
                            }
                        ],
                        "pagination": {
                            "next": null,
                            "previous": null,
                            "next_cursor": null,
                            "previous_cursor": null
                        }
                    },
                    "error_code": null
                }, null, 2)}
            />
        </ApiDoc.Root>
    )
}

export default LessonResources