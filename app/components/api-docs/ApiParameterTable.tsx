import React from 'react';

export interface ApiParameter {
    name: string;
    type: string;
    required: boolean;
    description: string;
}

interface ApiParameterTableProps {
    parameters: ApiParameter[];
    title?: string;
}

const ApiParameterTable: React.FC<ApiParameterTableProps> = ({ parameters, title = "Parameters" }) => {
    if (!parameters || parameters.length === 0) return null;

    return (
        <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">{title}</h4>
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {parameters.map((param, index) => (
                            <tr key={index}>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 font-mono">{param.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-500 font-mono text-xs">{param.type}</td>
                                <td className="px-4 py-3 text-sm text-gray-500">
                                    {param.required ? (
                                        <span className="text-red-600 font-medium text-xs">Yes</span>
                                    ) : (
                                        <span className="text-gray-400 text-xs">No</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-500">{param.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApiParameterTable;
