import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const ApiKeyUsage = () => {
    return (
        <div id="api-key-usage" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">API Key Usage</h2>

            <p className="text-slate-600 mb-4 leading-relaxed">
                All authenticated requests to the Jiroshi API must include a valid API key
                in the request headers. The API uses this key to identify the requesting
                account and to enforce access control rules.
            </p>

            <p className="text-slate-600 mb-6 leading-relaxed">
                API keys are passed using the <code className="font-mono">x-api-key</code>
                header. Requests missing this header or providing an invalid key will be
                rejected.
            </p>

            <ApiDoc.Body
                title="Authentication Header"
                code={`x-api-key: <YOUR_API_KEY>`}
                language="bash"
            />

            <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">
                Key Validation Rules
            </h3>

            <p className="text-slate-600 mb-4 leading-relaxed">
                The Jiroshi API performs strict validation on every API key provided with
                a request. A request will fail if any of the following conditions apply:
            </p>

            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
                <li>The API key is missing from the request headers.</li>
                <li>The API key is malformed, invalid, or does not exist.</li>
                <li>The API key has expired.</li>
                <li>
                    The API key type does not match the endpoint requirements
                    (for example, using a Secret Key where a Public Key is expected,
                    or vice versa).
                </li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                API Key Errors
            </h3>

            <p className="text-slate-600 mb-4 leading-relaxed">
                All errors related to API key authentication and validation use the
                standardized error code
                <code className="ml-1 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                    API_KEY_ERR
                </code>.
            </p>

            <p className="text-slate-600 mb-6 leading-relaxed">
                The HTTP status code and error message will vary depending on the failure
                scenario (for example, missing credentials, expired keys, or invalid key
                usage). Detailed information about response formats, error structures, and
                status codes is covered in a later section of this documentation.
            </p>

            {/* Placeholder: Add example error responses */}
            <ApiDoc.Body
                title="Sample Error Response"
                code={JSON.stringify({
                    status: false,
                    results: false,
                    message: "API key missing",
                    data: null,
                    error_code: "INVALID_TOKEN_ERR"
                }, null, 2)}
                language="json"
            />
            {/* Placeholder: Add retry behavior and best practices */}
            <section className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Retry Behavior & Best Practices
                </h3>

                <p className="text-slate-600 mb-3 leading-relaxed">
                    Requests that fail due to API key errors should not be retried automatically.
                    These errors indicate a client-side configuration issue that must be resolved
                    before the request can succeed.
                </p>

                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>Ensure the <code className="font-mono">x-api-key</code> header is present.</li>
                    <li>Verify that the correct API key type (<strong>pk</strong> or <strong>sk</strong>) is being used.</li>
                    <li>Confirm that the API key has not expired or been revoked.</li>
                    <li>Rotate the API key immediately if compromise is suspected.</li>
                </ul>

                <p className="text-slate-600 mt-4 leading-relaxed">
                    Retrying the same request with an invalid API key will always result in failure.
                </p>
            </section>


            {/* Placeholder: Add rate limiting interaction with API keys */}
            <section className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Rate Limiting & API Keys
                </h3>

                <p className="text-slate-600 mb-3 leading-relaxed">
                    API requests are rate-limited on a per-API-key basis to protect the platform
                    and ensure fair usage across accounts.
                </p>

                <ul className="list-disc pl-6 text-slate-600 space-y-2">
                    <li>Requests exceeding the allowed rate are rejected with an appropriate HTTP status code.</li>
                    <li>Exceeding a rate limit does not revoke or invalidate the API key.</li>
                    <li>Clients should implement exponential backoff before retrying requests.</li>
                    <li>Rate limits may vary based on API key type, endpoint category, and account configuration.</li>
                </ul>
            </section>



            <hr className="mt-12 border-slate-100" />
        </div>

    )
}

export default ApiKeyUsage