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
        <div className="mt-10 overflow-hidden">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]"></span>
                {title}
            </h4>
            <div className="overflow-x-auto border border-slate-200/60 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white/50 backdrop-blur-sm">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50/80">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">Name</th>
                            <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">Type</th>
                            {parameters[0].required !== undefined && <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">Required</th>}
                            <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {parameters.map((param, index) => (
                            <tr key={index} className="hover:bg-teal-50/30 transition-colors group/row">
                                <td className="px-6 py-5 text-sm font-bold text-slate-900 font-mono tracking-tight">
                                    <span className="bg-slate-50 group-hover/row:bg-white px-2 py-1 rounded-md border border-slate-100 transition-colors">{param.name}</span>
                                </td>
                                <td className="px-6 py-5 text-xs text-slate-500 font-mono w-40">
                                    <span className="bg-teal-50/50 text-teal-700 px-2 py-1 rounded-md border border-teal-100/50 font-bold whitespace-nowrap">{param.type}</span>
                                </td>
                                {param.required !== undefined && <td className="px-6 py-5 text-xs">
                                    {param.required ? (
                                        <span className="text-rose-600 font-bold text-[10px] uppercase bg-rose-50 px-2 py-1 rounded-full border border-rose-100 shadow-sm">Required</span>
                                    ) : (
                                        <span className="text-slate-400 text-[10px] uppercase bg-slate-50 px-2 py-1 rounded-full border border-slate-100">Optional</span>
                                    )}
                                </td>}
                                <td className="px-6 py-5 text-sm text-slate-600 leading-relaxed font-light">{param.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApiParameterTable;
