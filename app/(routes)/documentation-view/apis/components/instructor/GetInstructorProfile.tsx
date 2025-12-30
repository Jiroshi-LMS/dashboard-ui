import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const GetInstructorProfile = () => {
    return (
        <ApiDoc.Root id="get-instructor-profile">
            <ApiDoc.Header
                title="Get Instructor Profile"
                method="GET"
                url="/instructor/profile/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Retrieves the profile details of the authenticated instructor.
                This endpoint returns basic account information along with the
                associated instructor profile metadata.
            </ApiDoc.Description>

            <ApiDoc.Description>
                <strong>Selections:</strong> Not supported<br />
                <strong>Filters:</strong> Not supported
            </ApiDoc.Description>

            <ApiDoc.Body
                title="Response"
                language="json"
                code={JSON.stringify(
                    {
                        status: true,
                        results: true,
                        message: "Instructor Profile Fetched !",
                        data: {
                            instructor: {
                                username: "demo.instructor",
                                email: "demo.instructor@mail.com",
                                country_code: "+91", // or null
                                display_name: "Demo Instructor",
                                phone_number: "1234567890" // or null
                            },
                            profile: {
                                bio: "The bio for a test instructor.", // or null
                                location: "Sector 1, State, Country", // or null
                                profile_picture: "<profile_picture>" // or null
                            }
                        },
                        error_code: null
                    },
                    null,
                    2
                )}
            />

            <ApiDoc.Description>
                <strong>Fields that can be null:</strong>
                <ul>
                    <li><code>country_code</code></li>
                    <li><code>phone_number</code></li>
                    <li><code>bio</code></li>
                    <li><code>location</code></li>
                    <li><code>profile_picture</code></li>
                </ul>
            </ApiDoc.Description>

        </ApiDoc.Root>

    )
}

export default GetInstructorProfile