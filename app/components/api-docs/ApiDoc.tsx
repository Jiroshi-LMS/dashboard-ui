import React from 'react';
import ApiMethodBadge from './ApiMethodBadge';
import ApiParameterTable, { ApiParameter } from './ApiParameterTable';
import ApiCodeBlock from './ApiCodeBlock';
import { cn } from '@/lib/utils';

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

// --- Components ---

const Root: React.FC<ApiDocRootProps> = ({ id, children, className }) => {
    return (
        <div id={id} className={cn("mb-16 scroll-mt-32 group", className)}>
            {children}
            <hr className="mt-12 border-slate-100" />
        </div>
    );
};

const Header: React.FC<ApiDocHeaderProps> = ({ title, method, url, className }) => {
    return (
        <div className={cn("mb-6", className)}>
            <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
                <ApiMethodBadge method={method} />
            </div>
            <div className="flex items-center gap-2 text-sm font-mono text-slate-600 bg-slate-50 px-3 py-2 rounded-md border border-slate-200 w-fit">
                <span className="font-bold text-slate-400 select-none">{method}</span>
                <span className="text-slate-700">{url}</span>
            </div>
        </div>
    );
};

const Description: React.FC<ApiDocDescriptionProps> = ({ children, className }) => {
    return (
        <div className={cn("text-slate-600 leading-relaxed mb-8 max-w-3xl", className)}>
            {children}
        </div>
    );
};

const Parameters: React.FC<ApiDocParametersProps> = ({ parameters, title, className }) => {
    return (
        <div className={cn("mb-8", className)}>
            <ApiParameterTable parameters={parameters} title={title} />
        </div>
    );
};

const Body: React.FC<ApiDocCodeProps> = ({ code, title = "Request Body", language = "json", className }) => {
    return (
        <div className={cn("mb-6", className)}>
            <ApiCodeBlock code={code} title={title} language={language} />
        </div>
    );
};

const Response: React.FC<ApiDocCodeProps> = ({ code, title = "Response", language = "json", className }) => {
    return (
        <div className={cn("mb-6", className)}>
            <ApiCodeBlock code={code} title={title} language={language} />
        </div>
    );
};

const Custom: React.FC<ApiDocCustomProps> = ({ children, className }) => {
    return (
        <div className={cn("my-6", className)}>
            {children}
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
};
