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
        <div className="mt-10 w-full max-w-full overflow-hidden">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]"></div>
                {title}
            </h4>
            <div className="w-full max-w-full overflow-x-auto border border-slate-200/60 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm">
                <table className="min-w-full divide-y divide-slate-100 table-fixed md:table-auto">
                    <thead className="bg-slate-50/50">
                        <tr>
                            <th scope="col" className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/4">Name</th>
                            <th scope="col" className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest w-1/4">Type</th>
                            {parameters[0].required !== undefined && <th scope="col" className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Required</th>}
                            <th scope="col" className="px-5 py-3 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {parameters.map((param, index) => (
                            <tr key={index} className="hover:bg-slate-50 transition-colors group/row">
                                <td className="px-5 py-4 text-xs font-bold text-slate-900 font-mono tracking-tight break-all md:break-normal">
                                    <span className="text-teal-600 font-black">{param.name}</span>
                                </td>
                                <td className="px-5 py-4 text-[11px] text-slate-500 font-mono">
                                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200/50 whitespace-nowrap">{param.type}</span>
                                </td>
                                {param.required !== undefined && <td className="px-5 py-4 text-xs">
                                    {param.required ? (
                                        <span className="text-rose-600 font-black text-[9px] uppercase">Yes</span>
                                    ) : (
                                        <span className="text-slate-400 font-medium text-[9px] uppercase">No</span>
                                    )}
                                </td>}
                                <td className="px-5 py-4 text-[13px] text-slate-500 leading-relaxed font-medium break-words leading-relaxed">{param.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApiParameterTable;
