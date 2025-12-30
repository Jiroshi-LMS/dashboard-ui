"use client";

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ApiDocHeaderClientProps {
    url: string;
    method: string;
}

const ApiDocHeaderClient: React.FC<ApiDocHeaderClientProps> = ({ url, method }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="group relative flex items-center gap-0 w-full max-w-2xl bg-slate-50 border border-slate-200 rounded-lg p-0.5 pr-2 hover:border-slate-300 transition-all shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono px-3 py-2 flex-grow min-w-0">
                <span className="font-bold text-slate-400 select-none uppercase">{method}</span>
                <span className="text-slate-700 truncate">{url}</span>
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
                    title="Copy endpoint URL"
                >
                    {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                        <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="text-[10px] font-semibold">{copied ? "Copied" : "Copy"}</span>
                </button>
            </div>
        </div>
    );
};

export default ApiDocHeaderClient;
