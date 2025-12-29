import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const ApiKeys = () => {
    return (
        <div id="api-keys" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">API Keys</h2>

            <p className="text-slate-600 mb-4 leading-relaxed">
                Jiroshi uses API keys to authenticate and authorize access to its REST API.
                API keys are scoped to your account and must be included with every request
                to protected endpoints.
            </p>

            <p className="text-slate-600 mb-6 leading-relaxed">
                You can create and manage API keys from the Jiroshi Dashboard. Each key
                pair consists of a <strong>Public Key (pk)</strong> and a
                <strong> Secret Key (sk)</strong>, each intended for different security
                contexts.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Creating an API Key
            </h3>

            <p className="text-slate-600 mb-4 leading-relaxed">
                To generate a new API key, navigate to the
                <strong> Manage API Keys</strong> section from the dashboard sidebar.
                On the Manage API Keys page:
            </p>

            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
                <li>Enter a meaningful name for the API key to identify its purpose.</li>
                <li>
                    Select an expiration period. Available options include
                    <strong> 1 week</strong>, <strong>1 month</strong>,
                    <strong> 1 year</strong>, or <strong>never</strong>.
                </li>
                <li>Generate the API key.</li>
            </ul>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-amber-900 text-sm mb-6">
                <p className="font-semibold mb-1">Important</p>
                <p>
                    The Public Key and Secret Key are displayed <strong>only once</strong>
                    at the time of creation. Make sure to copy and store them securely.
                    Lost keys cannot be recovered and must be regenerated.
                </p>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Public vs Secret Keys
            </h3>

            <p className="text-slate-600 mb-4 leading-relaxed">
                Jiroshi distinguishes between public and secret API keys to enforce
                proper security boundaries:
            </p>

            <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
                <li>
                    <strong>Public Key (pk)</strong> — Safe to use in client-side
                    applications such as web or mobile frontends. Required for all
                    public-facing API calls.

                    <ApiDoc.Body
                        title="Sample Public Key (pk)"
                        code={`pk~~12a3b456-1ab2-3c45-4d67-21f72ad886f3~~RK07B89pGD4J3-VypELpwDX4z1ZX0yF1R_0au6EZibU=`}
                        language="bash"
                    />
                </li>
                <li>
                    <strong>Secret Key (sk)</strong> — Must never be exposed on the
                    frontend. Intended strictly for secure server-to-server operations,
                    such as payment processing or privileged administrative actions.

                    <ApiDoc.Body
                        title="Sample Secret Key (sk)"
                        code={`sk~~12a3b456-1ab2-3c45-4d67-21f72ad886f3~~RK07B89pGD4J3-VypELpwDX4z1ZX0yF1R_0au6EZibU=`}
                        language="bash"
                    />
                </li>
            </ul>

            <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-red-900 text-sm mb-6">
                <p className="font-semibold mb-1">Security Warning</p>
                <p>
                    Do not store or transmit secret keys in frontend code, public
                    repositories, or client-side environments. Compromised secret keys
                    can lead to irreversible account-level damage.
                </p>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Current Usage
            </h3>

            <p className="text-slate-600 mb-6 leading-relaxed">
                At present, all documented API endpoints require only the use of the
                <strong> Public Key (pk)</strong>. While Secret Keys are not actively
                used in the current API surface, they are reserved for upcoming features
                and enhanced security-sensitive workflows.
            </p>

            <p className="text-slate-600 mb-6 leading-relaxed">
                Each API endpoint in this documentation is explicitly tagged to indicate
                whether it requires a <strong>pk</strong> or <strong>sk</strong>, allowing
                you to clearly distinguish frontend-safe and server-only operations.
            </p>

            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-amber-900 text-sm mb-6">
                <p className="font-semibold mb-1">Key Rotation Policy</p>
                <p>
                    Jiroshi does not enforce a key rotation policy. However, it is
                    recommended to rotate your API keys periodically to enhance security.
                </p>
            </div>

            {/* Placeholder: Add key revocation behavior and propagation delay */}
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Key Revocation Behavior
            </h3>

            <p className="text-slate-600 mb-6 leading-relaxed">
                API keys are revokable. When a key is revoked, it is no longer valid and
                cannot be used to access the API. This ensures that compromised keys are
                quickly rendered ineffective.
            </p>

            <p className="text-slate-600 mb-6 leading-relaxed">
                API keys can be revoked from the Jiroshi Dashboard by simply deleting a particular key.
                It also gets revoked on expiration.
            </p>

            <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-red-900 text-sm mb-6">
                <p className="font-semibold mb-1">API Abuse policy</p>
                <p>
                    If API abuse is suspected, Jiroshi reserves the right to revoke API keys
                    and take other measures to prevent abuse.
                </p>
            </div>

            <hr className="mt-12 border-slate-100" />
        </div>

    )
}

export default ApiKeys