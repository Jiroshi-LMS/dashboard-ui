import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const CourseDetails = () => {
    return (
        <ApiDoc.Root id="get-course-details">
            <ApiDoc.Header
                title="Get Course Details"
                method="GET"
                url="/courses/{courseUUID}/"
                authKeyType="public"
            />
            <ApiDoc.Description>
                Retrieves detailed information about a specific course.
            </ApiDoc.Description>
            <ApiDoc.Parameters
                title="Path Parameters"
                parameters={[
                    { name: 'courseUUID', type: 'string', required: true, description: 'The unique identifier of the course.' },
                ]}
            />

            <ApiDoc.Warning title='Authenticated Student Use-Case (Important)'>
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
                    `GET /courses/{courseUUID}/?selections=uuid,title`
                }
            />

            <h4 className="text-md font-semibold text-slate-900 mt-6 mb-2">
                Response
            </h4>

            <ApiDoc.Response
                code={JSON.stringify({
                    "status": true,
                    "results": true,
                    "message": "Successfully fetched !",
                    "data": {
                        "uuid": "11111111-aaaa-2222-bbbb-333333333333",
                        "title": "Demo Course",
                        "description": "Dummy description",
                        "thumbnail": "<thumbnail_url>",
                        "duration": "15900.9667",
                        "created_at": "2025-10-02T14:20:11.544767Z",
                        "is_enrolled": false
                    },
                    "error_code": null
                }, null, 2)}
            />
        </ApiDoc.Root>
    )
}

export default CourseDetails