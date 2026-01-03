import React from 'react';
import ApiMethodBadge from './ApiMethodBadge';
import ApiParameterTable, { ApiParameter } from './ApiParameterTable';
import ApiCodeBlock from './ApiCodeBlock';
import ApiDocHeaderClient from './ApiDocHeaderClient';
import { cn } from '@/lib/utils';
import { Lock, Globe, Info as InfoIcon, AlertTriangle, AlertCircle } from 'lucide-react';

// --- Types ---

interface ApiDocRootProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

interface ApiDocHeaderProps {
    title: string;
    method: string;
    url: string;
    authKeyType?: 'public' | 'secret' | 'none';
    className?: string;
}

interface ApiDocDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

interface ApiDocParametersProps {
    parameters: ApiParameter[];
    title?: string;
    className?: string;
}

interface ApiDocCodeProps {
    code: string;
    title?: string;
    language?: string;
    className?: string;
}

interface ApiDocCustomProps {
    children: React.ReactNode;
    className?: string;
}

interface ApiDocAlertProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

interface ApiDocSubHeaderProps {
    children: React.ReactNode;
    className?: string;
}

// --- Components ---

const Root: React.FC<ApiDocRootProps> = ({ id, children, className }) => {
    return (
        <div id={id} className={cn("mb-12 md:mb-20 scroll-mt-32 md:scroll-mt-40 group w-full max-w-full overflow-hidden", className)}>
            {children}
            <div className="mt-12 md:mt-16 h-px bg-slate-100" />
        </div>
    );
};

const Section: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    return (
        <div className={cn("my-12", className)}>
            {children}
        </div>
    );
};

const SubHeader: React.FC<ApiDocSubHeaderProps> = ({ children, className }) => {
    return (
        <div className={cn("flex items-center gap-3 mt-16 mb-6", className)}>
            <div className="h-4 w-1 bg-teal-500 rounded-full" />
            <h3 className="text-lg font-bold text-slate-800 tracking-tight">{children}</h3>
        </div>
    );
};

const OverviewHeader: React.FC<{ children: React.ReactNode, subTitle?: string, className?: string }> = ({ children, subTitle, className }) => {
    return (
        <div className={cn("flex items-center gap-3 md:gap-4 mb-6 md:mb-10 group/title w-full max-w-full overflow-hidden px-1", className)}>
            <div className="h-8 md:h-10 w-1.5 bg-teal-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.2)] shrink-0" />
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight group-hover/title:text-teal-600 transition-colors duration-300 break-words">
                {children} {subTitle && <span className="text-teal-500/40 ml-1">({subTitle})</span>}
            </h2>
        </div>
    );
};

const Header: React.FC<ApiDocHeaderProps> = ({ title, method, url, authKeyType = 'none', className }) => {
    return (
        <div className={cn("mb-8 w-full max-w-full overflow-hidden px-1", className)}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase group-hover:text-teal-600 transition-colors">{title}</h2>
                    <ApiMethodBadge method={method} />
                </div>

                {authKeyType !== 'none' && (
                    <div className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black tracking-widest border w-fit uppercase shadow-sm",
                        authKeyType === 'secret'
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-teal-50 text-teal-700 border-teal-200"
                    )}>
                        {authKeyType === 'secret' ? (
                            <Lock className="w-3 h-3" />
                        ) : (
                            <Globe className="w-3 h-3" />
                        )}
                        <span>{authKeyType} Key</span>
                    </div>
                )}
            </div>

            <ApiDocHeaderClient url={url} method={method} />
        </div>
    );
};

const Description: React.FC<ApiDocDescriptionProps> = ({ children, className }) => {
    return (
        <div className={cn("text-slate-600 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-3xl font-light break-words px-1", className)}>
            {children}
        </div>
    );
};

const Parameters: React.FC<ApiDocParametersProps> = ({ parameters, title, className }) => {
    return (
        <div className={cn("mb-12 w-full max-w-full overflow-hidden px-1", className)}>
            <ApiParameterTable parameters={parameters} title={title} />
        </div>
    );
};

const Body: React.FC<ApiDocCodeProps> = ({ code, title = "Request Body", language = "json", className }) => {
    return (
        <div className={cn("my-12", className)}>
            <div className="flex items-center gap-2 mb-3">
                <div className="h-4 w-1 bg-teal-500 rounded-full" />
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{title}</h4>
            </div>
            <ApiCodeBlock code={code} language={language} />
        </div>
    );
};

const Response: React.FC<ApiDocCodeProps> = ({ code, title = "Response", language = "json", className }) => {
    return (
        <div className={cn("my-12", className)}>
            <div className="flex items-center gap-2 mb-3">
                <div className="h-4 w-1 bg-teal-500 rounded-full" />
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">{title}</h4>
            </div>
            <ApiCodeBlock code={code} language={language} />
        </div>
    );
};

const Custom: React.FC<ApiDocCustomProps> = ({ children, className }) => {
    return (
        <div className={cn("my-10 w-full max-w-full overflow-hidden", className)}>
            {children}
        </div>
    );
};

const Info: React.FC<ApiDocAlertProps> = ({ children, title = "Information", className }) => {
    return (
        <div className={cn("bg-sky-50/40 border border-sky-100 rounded-xl p-5 flex gap-4 text-sky-800 my-10 shadow-sm", className)}>
            <div className="mt-0.5">
                <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
                    <InfoIcon className="w-4 h-4 text-sky-600" />
                </div>
            </div>
            <div>
                {title && <p className="font-black text-xs uppercase tracking-widest mb-2 text-sky-900">{title}</p>}
                <div className="text-sky-800/80 leading-relaxed text-sm font-medium">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Warning: React.FC<ApiDocAlertProps> = ({ children, title = "Warning", className }) => {
    return (
        <div className={cn("bg-amber-50/50 border border-amber-100 rounded-2xl p-6 flex gap-4 text-amber-800 my-8 shadow-sm backdrop-blur-sm", className)}>
            <div className="mt-1">
                <AlertCircle className="w-5 h-5 text-amber-500" />
            </div>
            <div>
                {title && <p className="font-bold mb-2 tracking-tight text-amber-900">{title}</p>}
                <div className="text-amber-800/80 leading-relaxed text-sm">
                    {children}
                </div>
            </div>
        </div>
    );
};

const Danger: React.FC<ApiDocAlertProps> = ({ children, title = "Danger", className }) => {
    return (
        <div className={cn("bg-rose-50/50 border border-rose-100 rounded-2xl p-6 flex gap-4 text-rose-800 my-8 shadow-sm backdrop-blur-sm", className)}>
            <div className="mt-1">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
            </div>
            <div>
                {title && <p className="font-bold mb-2 tracking-tight text-rose-900">{title}</p>}
                <div className="text-rose-800/80 leading-relaxed text-sm">
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- Export ---

export const ApiDoc = {
    Root,
    Header,
    Description,
    Parameters,
    Body,
    Response,
    Custom,
    Info,
    Warning,
    Danger,
    SubHeader,
    Section,
    OverviewHeader,
};
