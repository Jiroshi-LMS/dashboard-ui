"use client";

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import Highlighter from './Highlighter';

interface ApiCodeBlockProps {
    code: string;
    language?: string;
    title?: string;
}

const ApiCodeBlock: React.FC<ApiCodeBlockProps> = ({ code, language = 'json', title }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="mt-4 rounded-xl overflow-hidden border border-slate-800 bg-[#0f172a] shadow-xl group">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    {title && (
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {title}
                        </span>
                    )}
                    {!title && (
                        <span className="text-xs font-medium text-slate-500 lowercase">
                            {language}
                        </span>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-slate-100 transition-all flex items-center gap-1.5"
                    title="Copy code"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[10px] font-medium text-emerald-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-medium">Copy</span>
                        </>
                    )}
                </button>
            </div>
            <div className="relative overflow-x-auto">
                <Highlighter code={code} language={language} />
            </div>
        </div>
    );
};

export default ApiCodeBlock;
