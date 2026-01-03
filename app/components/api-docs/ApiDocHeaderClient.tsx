"use client";

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        <div className="group relative flex items-center gap-0 w-full max-w-4xl bg-[#f8fafc] border border-slate-200 rounded-xl p-1 pr-2 hover:border-slate-300 transition-all shadow-sm">
            <div className="flex items-center gap-3 text-[11px] font-mono px-4 py-2 flex-grow min-w-0">
                <div className={cn(
                    "font-black select-none uppercase px-1.5 py-0.5 rounded text-[10px]",
                    method === 'GET' ? 'text-emerald-600 bg-emerald-50' :
                        method === 'POST' ? 'text-blue-600 bg-blue-50' :
                            method === 'PUT' ? 'text-amber-600 bg-amber-50' :
                                'text-rose-600 bg-rose-50'
                )}>
                    {method}
                </div>
                <span className="text-slate-600 font-bold truncate tracking-tight">{url}</span>
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-all"
                    title="Copy endpoint URL"
                >
                    {copied ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                        <Copy className="w-3 h-3" />
                    )}
                    <span className="text-[9px] font-black uppercase tracking-widest">{copied ? "Copied" : "Copy"}</span>
                </button>
            </div>
        </div>
    );
};

export default ApiDocHeaderClient;
