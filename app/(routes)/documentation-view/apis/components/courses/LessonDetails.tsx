import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const LessonDetails = () => {
    return (
        <ApiDoc.Root id="get-lesson">
            <ApiDoc.Header
                title="Get Lesson Details"
                method="GET"
                url="/courses/{courseUUID}/lessons/{lessonUUID}/"
                authKeyType="public"
            />
            <ApiDoc.Description>
                Retrieves detailed information about a specific lesson.
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
                title="Supported selectable fields:"
                parameters={[
                    { name: 'uuid', type: 'string', description: 'The unique identifier of the lesson.' },
                    { name: 'title', type: 'string', description: 'The title of the lesson.' },
                    { name: 'description', type: 'string', description: 'The description of the lesson.' },
                    { name: 'duration', type: 'string (Seconds)', description: 'The duration of the lesson IN SECONDS.' },
                    { name: 'video_url', type: 'string', description: 'The video URL of the lesson. (Video File)' },
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
                    `GET /courses/{courseUUID}/lessons/{lessonUUID}/?selections=uuid,title`
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
                        "duration": "15900.9667",
                        "video_url": "<video_url>",
                        "created_at": "2025-10-02T14:20:11.544767Z"
                    },
                    "error_code": null
                }, null, 2)}
            />
        </ApiDoc.Root>
    )
}

export default LessonDetails