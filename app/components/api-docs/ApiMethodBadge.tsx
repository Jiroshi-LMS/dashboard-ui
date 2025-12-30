import React from 'react';

interface ApiMethodBadgeProps {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string;
}

const methodColors: Record<string, string> = {
    GET: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    POST: 'bg-blue-50 text-blue-700 border-blue-200/60',
    PUT: 'bg-amber-50 text-amber-700 border-amber-200/60',
    DELETE: 'bg-rose-50 text-rose-700 border-rose-200/60',
    PATCH: 'bg-violet-50 text-violet-700 border-violet-200/60',
};

const ApiMethodBadge: React.FC<ApiMethodBadgeProps> = ({ method }) => {
    const upperMethod = method.toUpperCase();
    const colorClass = methodColors[upperMethod] || 'bg-slate-50 text-slate-700 border-slate-200/60';

    return (
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border tracking-wider shadow-sm uppercase ${colorClass}`}>
            {upperMethod}
        </span>
    );
};

export default ApiMethodBadge;
