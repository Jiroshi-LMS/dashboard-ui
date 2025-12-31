import React from 'react';

export interface ApiParameter {
    name: string;
    type: string;
    required?: boolean;
    description: string;
}

interface ApiParameterTableProps {
    parameters: ApiParameter[];
    title?: string;
}

const ApiParameterTable: React.FC<ApiParameterTableProps> = ({ parameters, title = "Parameters" }) => {
    if (!parameters || parameters.length === 0) return null;

    return (
        <div className="mt-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                {title}
            </h4>
            <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm bg-white">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50/50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                            {parameters[0].required !== undefined && <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Required</th>}
                            <th scope="col" className="px-4 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 italic-last-child">
                        {parameters.map((param, index) => (
                            <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-3.5 text-xs font-bold text-slate-900 font-mono tracking-tight">{param.name}</td>
                                <td className="px-4 py-3.5 text-xs text-slate-500 font-mono">
                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">{param.type}</span>
                                </td>
                                {param.required !== undefined && <td className="px-4 py-3.5 text-xs">
                                    {param.required ? (
                                        <span className="text-rose-600 font-bold text-[10px] uppercase bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100">Yes</span>
                                    ) : (
                                        <span className="text-slate-400 text-[10px] uppercase bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">No</span>
                                    )}
                                </td>}
                                <td className="px-4 py-3.5 text-xs text-slate-600 leading-relaxed font-body">{param.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApiParameterTable;
