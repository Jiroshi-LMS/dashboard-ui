"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ApiSectionLink {
    id?: string;
    title: string;
    items?: ApiSectionLink[];
}

interface ApiSidebarProps {
    sections: ApiSectionLink[];
    className?: string;
}

const ApiSidebar: React.FC<ApiSidebarProps> = ({ sections, className }) => {
    const [activeSection, setActiveSection] = useState<string>('');

    // Flatten sections to find active one easily
    const flattenedSections = React.useMemo(() => {
        const flat: { id: string }[] = [];
        const traverse = (items: ApiSectionLink[]) => {
            items.forEach(item => {
                if (item.id) flat.push({ id: item.id });
                if (item.items) traverse(item.items);
            });
        };
        traverse(sections);
        return flat;
    }, [sections]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;

            for (const section of flattenedSections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [flattenedSections]);

    const renderItems = (items: ApiSectionLink[], level = 0) => {
        return (
            <ul className={cn("space-y-0.5", level === 0 && "border-l border-slate-200")}>
                {items.map((section, index) => (
                    <li key={index}>
                        {section.id ? (
                            <Link
                                href={`#${section.id}`}
                                className={cn(
                                    "block text-sm transition-all duration-200 border-l -ml-px",
                                    level === 0 ? "px-3 py-2" : "px-3 py-1.5 pl-6",
                                    activeSection === section.id
                                        ? "border-primary text-primary font-medium bg-primary/5"
                                        : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                                )}
                                onClick={() => setActiveSection(section.id!)}
                            >
                                {section.title}
                            </Link>
                        ) : (
                            <div className={cn(
                                "text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2 mt-6 pl-3",
                                level > 0 && "mt-3"
                            )}>
                                {section.title}
                            </div>
                        )}
                        {section.items && renderItems(section.items, level + 1)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <nav className={cn("w-64 hidden lg:block flex-shrink-0 sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto pr-4", className)}>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4 pl-3">
                On this page
            </h3>
            {renderItems(sections)}
        </nav>
    );
};

export default ApiSidebar;
