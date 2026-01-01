import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import React from 'react'

const AuthIntro = () => {
    return (
        <div id="authentication-intro" className="mb-16 scroll-mt-32">
            <ApiDoc.OverviewHeader subTitle="Introduction">
                Student Authentication
            </ApiDoc.OverviewHeader>

            <p className="text-slate-600 mb-6 leading-relaxed">
                Jiroshi currently only supports standard JWT-based authentication mechanism
                for student authentication and session management. This flow is used for all
                student-facing actions such as sign-up, login, enrollment, and course
                access.
            </p>

            <p className="text-slate-600 mb-6 leading-relaxed">
                Upon successful authentication, a student is issued an
                <strong> access token</strong> and a <strong> refresh token</strong>.
                The access token is used to authenticate API requests, while the refresh
                token is used to obtain new access tokens when the current one expires.
            </p>

            <p className="text-slate-600 mb-6 leading-relaxed">
                All authentication APIs are accessed using the
                <strong> Public API Key (pk)</strong> of an instructor. When a student
                authenticates using an instructor’s public key, that student is
                permanently associated with the corresponding instructor tenant.
            </p>

            <p className="text-slate-600 mb-6 leading-relaxed">
                This tenant-based authentication model ensures strict isolation between
                instructors. Tokens issued under one instructor’s API key cannot be used
                to access resources belonging to another instructor.
            </p>

            <ApiDoc.Info title="Important">
                Student access and refresh tokens are always validated in the context
                of the instructor API key used during authentication. Cross-tenant
                token usage is not permitted.
            </ApiDoc.Info>

            {/* Placeholder: Add authentication flow diagram */}
            {/* Placeholder: Add token lifespan and rotation details */}
            {/* Placeholder: Add refresh token usage rules */}

            <hr className="mt-12 border-slate-100" />
        </div>

    )
}

export default AuthIntro