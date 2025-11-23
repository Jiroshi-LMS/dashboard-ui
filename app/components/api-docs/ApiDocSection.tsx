import React from 'react';
import ApiMethodBadge from './ApiMethodBadge';
import ApiParameterTable, { ApiParameter } from './ApiParameterTable';
import ApiCodeBlock from './ApiCodeBlock';

interface ApiDocSectionProps {
    id: string;
    title: string;
    method: string;
    url: string;
    description: string;
    parameters?: ApiParameter[];
    requestBody?: string;
    response?: string;
}

const ApiDocSection: React.FC<ApiDocSectionProps> = ({
    id,
    title,
    method,
    url,
    description,
    parameters,
    requestBody,
    response,
}) => {
    return (
        <div id={id} className="mb-12 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <ApiMethodBadge method={method} />
            </div>

            <div className="bg-gray-50 p-3 rounded-md border border-gray-200 font-mono text-sm text-gray-700 mb-4 flex items-center">
                <span className="font-bold mr-2 select-none text-gray-400">{method}</span>
                <span>{url}</span>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
                {description}
            </p>

            {parameters && parameters.length > 0 && (
                <ApiParameterTable parameters={parameters} />
            )}

            {requestBody && (
                <ApiCodeBlock
                    title="Request Body"
                    code={requestBody}
                />
            )}

            {response && (
                <ApiCodeBlock
                    title="Response"
                    code={response}
                />
            )}

            <hr className="mt-12 border-gray-100" />
        </div>
    );
};

export default ApiDocSection;
