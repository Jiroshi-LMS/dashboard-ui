import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const Pagination = () => {
    return (
        <div id="pagination" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Working with Pagination
            </h2>

            <p className="text-slate-600 mb-6 leading-relaxed">
                Pagination is applied to all listing APIs in Jiroshi. By default, the API
                uses <strong>cursor-based pagination</strong> to ensure faster response
                times and better performance on large datasets.
            </p>

            <div className="text-slate-600 mb-6 leading-relaxed">
                <p className="mb-4">
                    Tenants may override this behavior and use page-offset based pagination by
                    explicitly passing the query parameter <code className="ml-1 bg-slate-100 px-1.5 py-0.5 rounded font-mono">pagination:page</code>:
                </p>
                <ApiDoc.Body
                    title="Override Default Pagination to Page Offset Pagination"
                    language="bash"
                    code={`GET /api/v1/public/courses/?pagination=page`}
                />
                <p className="mt-4">
                    Cursor-based pagination can also be explicitly enforced using
                    <code className="ml-1 bg-slate-100 px-1.5 py-0.5 rounded font-mono">pagination=cursor</code>, although this
                    is the default behavior and does not need to be specified.
                </p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-amber-900 text-sm mb-8">
                <p className="font-semibold mb-1">Performance Note</p>
                <p>
                    Page-offset based pagination is considerably slower and less efficient
                    than cursor-based pagination, especially for large datasets. For optimal
                    performance, cursor-based pagination is strongly recommended.
                </p>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Cursor-Based Pagination Response
            </h3>

            <p className="text-slate-600 mb-4 leading-relaxed">
                When using cursor-based pagination, the response includes navigation URLs
                and encoded cursor values that can be used to fetch the next or previous
                set of results.
            </p>

            <ApiDoc.Body
                title="Cursor-Based Pagination Response"
                code={JSON.stringify({
                    "status": true,
                    "results": true,
                    "message": "Successfully Fetched",
                    "data": {
                        "results": [
                            {
                                "uuid": "723a743c-a012-40ee-bebc-dc24c48818bf",
                                "title": "Course Dummy v3",
                                "description": "Test Desc",
                                "thumbnail": "https://jiroshi-static-dev.s3.ap-south-1.amazonaws.com/course-thumbnail/...",
                                "duration": "15.9667",
                                "created_at": "2025-11-01T06:41:03.008653Z",
                                "is_enrolled": false
                            },
                            {
                                "uuid": "a9fb5567-a9ae-4980-add7-763c2aca0351",
                                "title": "Course Test V2",
                                "description": "",
                                "thumbnail": "<course_thumbnail>",
                                "duration": "148.3854",
                                "created_at": "2025-10-19T19:40:28.598591Z",
                                "is_enrolled": false
                            }
                        ],
                        "pagination": {
                            "next": "https://api.jiroshi.com/api/v1/public/courses/?cursor=...",
                            "previous": "https://api.jiroshi.com/api/v1/public/courses/?cursor=...",
                            "next_cursor": "cD0yMDI1LTEwLTE5KzE5JTNBNDAlM0EyOC41OTg1OTElMkIwMCUzQTAw",
                            "previous_cursor": "cj0xJnA9MjAyNS0xMC0xOSsxOSUzQTQwJTNBMjguNTk4NTkxJTJCMDAlM0EwMA=="
                        }
                    },
                    "error_code": null
                }, null, 2)
                }
                language='json'
            />

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-8">
                <li>
                    <strong>next</strong> — Fully constructed URL to fetch the next page
                    of results, if available.
                </li>
                <li>
                    <strong>previous</strong> — Fully constructed URL to fetch the previous
                    page of results, if available.
                </li>
                <li>
                    <strong>next_cursor</strong> — Encoded cursor value for fetching the
                    next set of results programmatically.
                </li>
                <li>
                    <strong>previous_cursor</strong> — Encoded cursor value for fetching
                    the previous set of results.
                </li>
            </ul>

            <p className="text-slate-600 leading-relaxed">
                Clients may either follow the provided pagination URLs directly or extract
                and reuse cursor values as query parameters in subsequent requests.
            </p>

            <div id="cursor-pagination-usage" className="mb-16 scroll-mt-32">
                <h3 className="text-md font-semibold text-slate-900 my-3">
                    Using Cursor Parameters
                </h3>

                <p className="text-slate-600 mb-6 leading-relaxed">
                    Cursor-based pagination uses encoded cursor values to determine the
                    starting point for the next or previous set of results. These cursor
                    values are returned in the
                    <code className="mx-1 font-mono">pagination</code> object of a paginated
                    response.
                </p>

                <p className="text-slate-600 mb-4 leading-relaxed">
                    To fetch the next or previous page, include the
                    <code className="mx-1 font-mono">cursor</code> query parameter in your
                    request using the corresponding cursor value.
                </p>

                <h5 className="text-sm font-semibold text-slate-900 mb-2">
                    Fetching the Next Page
                </h5>

                <ApiDoc.Body
                    title="Next Page Request"
                    language="bash"
                    code={`GET /api/v1/public/courses/?cursor=<NEXT_CURSOR_VALUE>`}
                />

                <p className="text-slate-600 mb-6 leading-relaxed">
                    The <code className="font-mono">next_cursor</code> value is used to retrieve
                    the next set of results relative to the current response. If
                    <code className="mx-1 font-mono">next_cursor</code> is
                    <code className="mx-1 font-mono">null</code>, no further pages are available.
                </p>

                <h5 className="text-sm font-semibold text-slate-900 mb-2">
                    Fetching the Previous Page
                </h5>

                <ApiDoc.Body
                    title="Previous Page Request"
                    language="bash"
                    code={`GET /api/v1/public/courses/?cursor=<PREVIOUS_CURSOR_VALUE>`}
                />

                <p className="text-slate-600 mb-6 leading-relaxed">
                    The <code className="font-mono">previous_cursor</code> value allows navigating
                    backward through the result set. If
                    <code className="mx-1 font-mono">previous_cursor</code> is
                    <code className="mx-1 font-mono">null</code>, the current page is the first
                    page.
                </p>

                <h5 className="text-sm font-semibold text-slate-900 mb-2">
                    Important Notes
                </h5>

                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>
                        Cursor values are opaque and should not be decoded or modified by
                        clients.
                    </li>
                    <li>
                        Cursor-based pagination guarantees consistent ordering even when
                        underlying data changes.
                    </li>
                    <li>
                        Mixing cursor-based and page-based pagination within the same request
                        flow is not supported.
                    </li>
                </ul>

                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-amber-900 text-sm mt-5 mb-8">
                    <p className="font-semibold mb-1">Cursor Based Pagination Limitations</p>
                    <p>
                        With cursor based pagination, <b>the number of results that can be
                            fetched in a single request is fixed to 20 items. </b>
                        If you need to fetch more results, you will need to make multiple requests.
                        <br /><br />
                        Also, <b>you won't have access to the count of total number of items </b> and related details
                        about the listing data.
                    </p>
                </div>
            </div>

            <div id="page-pagination" className="mb-16 scroll-mt-32">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Page-Based (Offset) Pagination
                </h3>

                <p className="text-slate-600 mb-6 leading-relaxed">
                    In addition to cursor-based pagination, Jiroshi APIs support traditional
                    page-offset based pagination. This pagination strategy must be explicitly
                    enabled by passing the
                    <code className="mx-1 font-mono">pagination=page</code> query parameter.
                </p>

                <p className="text-slate-600 mb-6 leading-relaxed">
                    Page-based pagination allows clients to request a specific page number and
                    control the number of items returned per page. This approach is useful for
                    simple navigation and UI-driven pagination but comes with performance
                    trade-offs.
                </p>

                <h4 className="text-md font-semibold text-slate-900 mb-2">
                    Enabling Page-Based Pagination
                </h4>

                <ApiDoc.Body
                    title="Page-Based Pagination Request"
                    language="bash"
                    code={`GET /api/v1/public/courses/?pagination=page&page=1&page_size=10`}
                />

                <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-8">
                    <li>
                        <strong>pagination</strong> — Must be set to
                        <code className="mx-1 font-mono">page</code> to enable page-based
                        pagination.
                    </li>
                    <li>
                        <strong>page</strong> — The page number to fetch.
                    </li>
                    <li>
                        <strong>page_size</strong> — Number of items to return per page <b>(Max allowed is 150)</b>.
                    </li>
                </ul>

                <h4 className="text-md font-semibold text-slate-900 mb-2">
                    Page-Based Pagination Response
                </h4>

                <ApiDoc.Body
                    title="Page-Based Pagination Response"
                    language="json"
                    code={JSON.stringify({
                        "status": true,
                        "results": true,
                        "message": "Successfully Fetched",
                        "data": {
                            "results": [
                                {
                                    "uuid": "723a743c-a012-40ee-bebc-dc24c48818bf",
                                    "title": "Course Dummy",
                                    "description": "Description",
                                    "thumbnail": "<thumbnail_url>",
                                    "duration": "1599.9667",
                                    "created_at": "2025-11-01T06:41:03.008653Z",
                                    "is_enrolled": false
                                }
                            ],
                            "pagination": {
                                "count": 21,
                                "total_pages": 3,
                                "current_page": 3,
                                "next": null,
                                "previous": "https://api.jiroshi.com/api/v1/public/courses/?page=2&page_size=10&pagination=page"
                            }
                        },
                        "error_code": null
                    })}
                />

                <h4 className="text-md font-semibold text-slate-900 mb-2">
                    Pagination Fields
                </h4>

                <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-8">
                    <li>
                        <strong>count</strong> — Total number of items available.
                    </li>
                    <li>
                        <strong>total_pages</strong> — Total number of pages based on the
                        current <code className="ml-1 bg-slate-100 px-1.5 py-0.5 rounded font-mono">page_size</code>.
                    </li>
                    <li>
                        <strong>current_page</strong> — The currently requested page number.
                    </li>
                    <li>
                        <strong>next</strong> — URL to fetch the next page, or
                        <code className="mx-1 font-mono">null</code> if no further pages exist.
                    </li>
                    <li>
                        <strong>previous</strong> — URL to fetch the previous page, or
                        <code className="mx-1 font-mono">null</code> if the current page is the
                        first page.
                    </li>
                </ul>

                <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-amber-900 text-sm mt-5 mb-8">
                    <p className="font-semibold mb-1">Page-Offset Based Pagination Limitations</p>
                    <ul className="list-disc pl-6 text-slate-600 space-y-2">
                        <li>
                            With page-offset based pagination, fetching data becomes slower as page numbers increase due to
                            database offset scans.
                        </li>
                        <li>
                            Results may become inconsistent if data changes between requests.
                        </li>
                        <li>
                            Not suitable for large datasets or high-frequency access patterns.
                        </li>
                    </ul>
                </div>

                <h4 className="text-md font-semibold text-slate-900 mb-2">
                    When to Use Page-Based Pagination
                </h4>

                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>
                        When building simple, UI-driven pagination controls.
                    </li>
                    <li>
                        When explicit page navigation is required.
                    </li>
                    <li>
                        When dataset size is small and performance is not critical.
                    </li>
                </ul>

                <p className="text-slate-600 mt-6 leading-relaxed">
                    For most production use cases, cursor-based pagination remains the
                    recommended and default approach in Jiroshi APIs.
                </p>
            </div>


            <hr className="mt-12 border-slate-100" />
        </div>

    )
}

export default Pagination