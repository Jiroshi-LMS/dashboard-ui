import { ApiDoc } from '@/app/components/api-docs/ApiDoc'
import { Info } from 'lucide-react'
import React from 'react'

const Introduction = () => {
    return (
        <div id="introduction" className="mb-16 scroll-mt-32">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Introduction</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
                The Jiroshi API provides programmatic access to all data in your account. You can use the API to integrate Jiroshi with your existing workflows, build custom dashboards, or automate repetitive tasks.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-800 text-sm">
                <Info className="w-5 h-5 flex-shrink-0 text-blue-500" />
                <div>
                    <p className="font-semibold mb-1">Base URL</p>
                    <p>All API requests should be made to <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-900 font-mono">https://api.jiroshi.com/api/v1</code></p>
                </div>
            </div>
            <hr className="mt-12 border-slate-100" />
        </div>
    )
}

export default Introduction