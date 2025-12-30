"use client";

import React from 'react';

interface HighlighterProps {
    code: string;
    language: string;
}

const Highlighter: React.FC<HighlighterProps> = ({ code, language }) => {
    const highlightJSON = (jsonString: string): React.ReactNode => {
        try {
            const parsed = JSON.parse(jsonString);
            return <pre className="!bg-transparent !m-0 !p-5 !text-sm overflow-x-auto font-mono">{renderJSON(parsed, 0)}</pre>;
        } catch {
            return <pre className="!bg-transparent !m-0 !p-5 !text-sm overflow-x-auto text-slate-300 font-mono">{jsonString}</pre>;
        }
    };

    const renderJSON = (obj: unknown, indent: number): React.ReactNode => {
        if (obj === null) return <span className="text-violet-400">null</span>;
        if (typeof obj === 'boolean') return <span className="text-violet-400">{obj.toString()}</span>;
        if (typeof obj === 'number') return <span className="text-cyan-400">{obj}</span>;
        if (typeof obj === 'string') return <span className="text-green-400">&quot;{obj}&quot;</span>;

        if (Array.isArray(obj)) {
            if (obj.length === 0) return <span className="text-slate-400">[]</span>;
            return (
                <span>
                    <span className="text-slate-400">[</span>
                    <span className="text-slate-500">{'\n'}</span>
                    {obj.map((item, i) => (
                        <span key={i}>
                            <span className="text-slate-600">{'  '.repeat(indent + 1)}</span>
                            {renderJSON(item, indent + 1)}
                            {i < obj.length - 1 && <span className="text-slate-400">,</span>}
                            <span className="text-slate-500">{'\n'}</span>
                        </span>
                    ))}
                    <span className="text-slate-600">{'  '.repeat(indent)}</span>
                    <span className="text-slate-400">]</span>
                </span>
            );
        }

        if (typeof obj !== 'object' || obj === null) {
            return <span className="text-slate-300">{String(obj)}</span>;
        }

        const entries = Object.entries(obj);
        if (entries.length === 0) return <span className="text-slate-400">{'{}'}</span>;

        return (
            <span>
                <span className="text-slate-400">{'{'}</span>
                <span className="text-slate-500">{'\n'}</span>
                {entries.map(([key, value], i) => (
                    <span key={key}>
                        <span className="text-slate-600">{'  '.repeat(indent + 1)}</span>
                        <span className="text-blue-400">&quot;{key}&quot;</span>
                        <span className="text-slate-400">: </span>
                        {renderJSON(value, indent + 1)}
                        {i < entries.length - 1 && <span className="text-slate-400">,</span>}
                        <span className="text-slate-500">{'\n'}</span>
                    </span>
                ))}
                <span className="text-slate-600">{'  '.repeat(indent)}</span>
                <span className="text-slate-400">{'}'}</span>
            </span>
        );
    };

    if (language === 'json') {
        return <>{highlightJSON(code)}</>;
    }

    // For non-JSON, just show plain text with nice styling
    return (
        <pre className="!bg-transparent !m-0 !p-5 !text-sm overflow-x-auto text-slate-300 font-mono whitespace-pre">
            {code}
        </pre>
    );
};

export default Highlighter;
