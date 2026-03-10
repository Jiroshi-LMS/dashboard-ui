import React from 'react';

interface ApiMethodBadgeProps {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string;
}

const methodColors: Record<string, string> = {
    GET: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/60',
    POST: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/60',
    PUT: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60',
    DELETE: 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60',
    PATCH: 'bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-200/60 dark:border-violet-800/60',
};

const ApiMethodBadge: React.FC<ApiMethodBadgeProps> = ({ method }) => {
    const upperMethod = method.toUpperCase();
    const colorClass = methodColors[upperMethod] || 'bg-muted text-muted-foreground border-border';

    return (
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border tracking-wider shadow-sm uppercase ${colorClass}`}>
            {upperMethod}
        </span>
    );
};

export default ApiMethodBadge;
