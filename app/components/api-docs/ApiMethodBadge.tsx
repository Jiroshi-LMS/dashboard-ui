import React from 'react';

interface ApiMethodBadgeProps {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string;
}

const methodColors: Record<string, string> = {
    GET: 'bg-blue-100 text-blue-800 border-blue-200',
    POST: 'bg-green-100 text-green-800 border-green-200',
    PUT: 'bg-orange-100 text-orange-800 border-orange-200',
    DELETE: 'bg-red-100 text-red-800 border-red-200',
    PATCH: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

const ApiMethodBadge: React.FC<ApiMethodBadgeProps> = ({ method }) => {
    const upperMethod = method.toUpperCase();
    const colorClass = methodColors[upperMethod] || 'bg-gray-100 text-gray-800 border-gray-200';

    return (
        <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${colorClass}`}>
            {upperMethod}
        </span>
    );
};

export default ApiMethodBadge;
