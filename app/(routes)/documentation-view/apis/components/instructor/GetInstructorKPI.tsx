import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const GetInstructorKPI = () => {
    return (
        <ApiDoc.Root id="get-instructor-kpis">
            <ApiDoc.Header
                title="Get Instructor KPIs"
                method="GET"
                url="/instructor/kpi/"
                authKeyType="public"
            />

            <ApiDoc.Description>
                Fetches key performance indicators (KPIs) for the authenticated instructor.
                This includes total counts and activity from the last 30 days for courses,
                signups, and enrollments.
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
                        message: "KPIs Fetched !",
                        data: {
                            courses: {
                                total: 3,
                                in_last_thirty_days: 0
                            },
                            signups: {
                                total: 4,
                                in_last_thirty_days: 4
                            },
                            enrollments: {
                                total: 4,
                                in_last_thirty_days: 4
                            }
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
                        <code>total</code> represents the all-time count for the metric.
                    </li>
                    <li>
                        <code>in_last_thirty_days</code> represents activity within the
                        last 30 days, calculated using UTC timestamps.
                    </li>
                </ul>
            </ApiDoc.Description>
        </ApiDoc.Root>


    )
}

export default GetInstructorKPI