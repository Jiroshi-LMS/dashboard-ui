import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const SelectionsAndFilters = () => {
    return (
        <div id="selections-and-filtering-options" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Selections & Filters
            </h2>

            <p className="text-slate-600 mb-6 leading-relaxed">
                Jiroshi APIs provide selection and filtering mechanisms to optimize data
                retrieval, reduce response payload size, and improve performance for
                data-intensive endpoints.
            </p>

            {/* ===================== Selections ===================== */}

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Selections
            </h3>

            <p className="text-slate-600 mb-4 leading-relaxed">
                Selections allow clients to explicitly specify which fields should be
                returned in the response. This is particularly useful for list and
                retrieve APIs where returning the full object is unnecessary.
            </p>

            <p className="text-slate-600 mb-4 leading-relaxed">
                For example, when displaying a list of lessons where only the
                <strong> title</strong> and <strong> description</strong> are required,
                selections can be used to fetch only those fields.
            </p>

            <ApiDoc.Body
                title="Selections Query Parameter"
                language="bash"
                code={`GET /courses/<course_id>/lessons/?selections=title,description`}
            />

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-8">
                <li>
                    Only fields included in <code className="font-mono">selections</code>
                    are returned in the response.
                </li>
                <li>
                    Selections are restricted to a predefined set of allowed fields per API.
                </li>
                <li>
                    Invalid or unsupported selection fields are silently ignored.
                </li>
                <li>
                    If no selections are provided, or all provided selections are invalid,
                    the API returns all allowed fields by default.
                </li>
            </ul>

            <p className="text-slate-600 mb-8 leading-relaxed">
                Not all APIs support selections. Wherever supported, the list of allowed
                selectable fields is documented explicitly for that endpoint.
            </p>

            {/* ===================== Filters ===================== */}

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Filters (Listing APIs Only)
            </h3>

            <p className="text-slate-600 mb-6 leading-relaxed">
                Listing APIs support a set of generic filters that allow clients to
                narrow down results based on search terms, ordering, and date ranges.
            </p>

            {/* ---------- Search ---------- */}

            <h4 className="text-md font-semibold text-slate-900 mb-2">
                Search
            </h4>

            <p className="text-slate-600 mb-4 leading-relaxed">
                To perform a generic search across all searchable fields, use the
                <code className="mx-1 font-mono">search</code> query parameter.
            </p>

            <ApiDoc.Body
                title="Generic Search"
                language="bash"
                code={`GET /courses/?search=backend`}
            />

            <p className="text-slate-600 mb-4 leading-relaxed">
                Field-specific searches can also be performed by using the field name
                directly as a query parameter.
            </p>

            <ApiDoc.Body
                title="Field-Specific Search"
                language="bash"
                code={`GET /courses/?title=django`}
            />

            <p className="text-slate-600 mb-8 leading-relaxed">
                Searchable fields vary by API and are documented individually for each
                endpoint.
            </p>

            {/* ---------- Ordering ---------- */}

            <h4 className="text-md font-semibold text-slate-900 mb-2">
                Ordering
            </h4>

            <p className="text-slate-600 mb-4 leading-relaxed">
                All listing APIs apply a default ordering of
                <code className="mx-1 font-mono">-created_at</code>
                (descending by creation time).
            </p>

            <p className="text-slate-600 mb-4 leading-relaxed">
                This behavior can be overridden using the
                <code className="mx-1 font-mono">ordering</code> query parameter.
            </p>

            <ApiDoc.Body
                title="Ordering Examples"
                language="bash"
                code={`# Ascending order by duration
GET /courses/?ordering=duration

# Descending order by duration
GET /courses/?ordering=-duration`}
            />

            {/* ---------- Date Range ---------- */}

            <h4 className="text-md font-semibold text-slate-900 mb-2">
                Date Range Filters
            </h4>

            <p className="text-slate-600 mb-4 leading-relaxed">
                Date range filtering follows a consistent naming convention for all
                supported date fields.
            </p>

            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-6">
                <li>
                    <code className="font-mono">&lt;field&gt;_after</code> — Filters records
                    after the specified date.
                </li>
                <li>
                    <code className="font-mono">&lt;field&gt;_before</code> — Filters records
                    before the specified date.
                </li>
            </ul>

            <ApiDoc.Body
                title="Date Range Filter Example"
                language="bash"
                code={`GET /courses/?created_at_after=2025-01-01T00:00:00Z&created_at_before=2025-01-31T23:59:59Z`}
            />

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-amber-800">
                            <strong>Important:</strong> All date values must be provided in UTC format.
                        </p>
                    </div>
                </div>
            </div>

            <hr className="mt-12 border-slate-100" />
        </div>

    )
}

export default SelectionsAndFilters