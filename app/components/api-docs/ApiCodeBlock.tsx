import React from 'react';

interface ApiCodeBlockProps {
    code: string;
    language?: string;
    title?: string;
}

const ApiCodeBlock: React.FC<ApiCodeBlockProps> = ({ code, language = 'json', title }) => {
    return (
        <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            {title && (
                <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {title}
                </div>
            )}
            <div className="p-4 overflow-x-auto bg-[#1E293B] text-gray-100 text-sm font-mono">
                <pre>
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};

export default ApiCodeBlock;
