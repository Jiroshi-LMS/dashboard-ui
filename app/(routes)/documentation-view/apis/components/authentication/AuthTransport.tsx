import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const AuthTransport = () => {
    return (
        <div id="authentication-transport" className="mb-16 scroll-mt-32">
            <ApiDoc.OverviewHeader>
                Authentication Transport & Client Detection
            </ApiDoc.OverviewHeader>

            <p className="text-slate-600 mb-6 leading-relaxed">
                Jiroshi adapts its authentication token handling based on the detected
                client environment to ensure maximum security while supporting multiple
                application types.
            </p>

            <ApiDoc.SubHeader>
                Browser-Based Clients
            </ApiDoc.SubHeader>

            <p className="text-slate-600 mb-6 leading-relaxed">
                When a request is identified as originating from a browser environment,
                refresh tokens are issued and stored exclusively via
                <strong> HTTP-only cookies</strong>. These cookies are inaccessible to
                browser-side JavaScript and are automatically included in subsequent
                refresh requests by the browser.
            </p>

            <p className="text-slate-600 mb-8 leading-relaxed">
                In this mode, refresh tokens are <strong>never exposed</strong> in API
                responses or request payloads, significantly reducing the risk of token
                theft via XSS or client-side compromise.
            </p>

            <ApiDoc.Info title="Cross-Origin Requests">
                For the browser to include these secure cookies in cross-origin API requests, you must set
                <code> credentials: 'include'</code> (Fetch API) or <code>withCredentials: true</code> (Axios) in your request configuration.
            </ApiDoc.Info>

            <ApiDoc.SubHeader>
                Non-Browser Clients
            </ApiDoc.SubHeader>

            <p className="text-slate-600 mb-6 leading-relaxed">
                For non-browser clients such as mobile applications, desktop clients,
                or backend services, refresh tokens are returned directly in the API
                response payload. Subsequent refresh requests must include the refresh
                token explicitly in the request body.
            </p>

            <p className="text-slate-600 mb-8 leading-relaxed">
                This mode is intended only for environments where secure storage of
                tokens is handled by the client platform itself.
            </p>

            <ApiDoc.SubHeader>
                Development Mode
            </ApiDoc.SubHeader>

            <p className="text-slate-600 mb-4 leading-relaxed">
                During local development, strict cookie policies (SameSite, Secure) can sometimes
                hinder testing on localhost. You can switch to a developer-friendly mode by
                setting the following header:
            </p>

            <ApiDoc.Body
                title="Force Development Mode"
                language="bash"
                code={`X-Client-Type: dev`}
            />

            <p className="text-slate-600 mb-8 leading-relaxed">
                <strong>Effect:</strong> In this mode, just like with non-browser clients,
                the refresh token is transported via the <strong>request and response payloads </strong>
                instead of cookies. This makes it easier to inspect and manage tokens manually
                during development.
            </p>

            <ApiDoc.SubHeader>
                Forcing API Mode
            </ApiDoc.SubHeader>

            <p className="text-slate-600 mb-4 leading-relaxed">
                In certain edge cases-such as React Native or Electron-based
                applications-the client may be incorrectly detected as a browser.
                In such scenarios, token handling can be explicitly forced to API mode
                by setting the following request header:
            </p>

            <ApiDoc.Body
                title="Force API Client Mode"
                language="bash"
                code={`X-Client-Type: non-browser`}
            />

            <ApiDoc.Warning title="Restricted Usage">
                Forcing API mode bypasses browser-level protections and exposes
                refresh tokens directly to the client. This option should be used
                only when absolutely necessary and only in trusted environments.
                Misuse may lead to token leakage, unauthorized access, or account
                compromise.
            </ApiDoc.Warning>

            <p className="text-slate-600 leading-relaxed">
                Jiroshi reserves the right to introduce additional validation,
                restrictions, or rate limits on forced API mode usage to prevent abuse.
            </p>

            <hr className="mt-12 border-slate-100" />
        </div>

    )
}

export default AuthTransport