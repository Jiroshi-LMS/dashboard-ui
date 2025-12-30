import React from 'react';
import ApiMethodBadge from './ApiMethodBadge';
import ApiParameterTable, { ApiParameter } from './ApiParameterTable';
import ApiCodeBlock from './ApiCodeBlock';
import ApiDocHeaderClient from './ApiDocHeaderClient';
import { cn } from '@/lib/utils';
import { Lock, Globe } from 'lucide-react';

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

// --- Components ---

const Root: React.FC<ApiDocRootProps> = ({ id, children, className }) => {
    return (
        <div id={id} className={cn("mb-16 scroll-mt-32 group", className)}>
            {children}
            <hr className="mt-12 border-slate-100" />
        </div>
    );
};

const Header: React.FC<ApiDocHeaderProps> = ({ title, method, url, authKeyType = 'none', className }) => {
    return (
        <div className={cn("mb-8", className)}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
                    <ApiMethodBadge method={method} />
                </div>

                {authKeyType !== 'none' && (
                    <div className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide border w-fit uppercase",
                        authKeyType === 'secret'
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                    )}>
                        {authKeyType === 'secret' ? (
                            <Lock className="w-3 h-3" />
                        ) : (
                            <Globe className="w-3 h-3" />
                        )}
                        <span>{authKeyType} Key required</span>
                    </div>
                )}
            </div>

            <ApiDocHeaderClient url={url} method={method} />
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
