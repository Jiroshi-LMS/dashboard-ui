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
    const [searchQuery, setSearchQuery] = useState('');

    // Flatten sections to find active one easily
    const flattenedSections = React.useMemo(() => {
        const flat: { id: string, title: string }[] = [];
        const traverse = (items: ApiSectionLink[]) => {
            items.forEach(item => {
                if (item.id) flat.push({ id: item.id, title: item.title });
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

    const filteredSections = React.useMemo(() => {
        if (!searchQuery) return sections;

        return sections.map(section => {
            const filteredItems = section.items?.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (section.title.toLowerCase().includes(searchQuery.toLowerCase()) || (filteredItems && filteredItems.length > 0)) {
                return { ...section, items: filteredItems };
            }
            return null;
        }).filter(Boolean) as ApiSectionLink[];
    }, [sections, searchQuery]);

    const renderItems = (items: ApiSectionLink[], level = 0) => {
        return (
            <ul className={cn("space-y-1", level === 0 && "border-l border-slate-100 ml-1")}>
                {items.map((section, index) => (
                    <li key={index}>
                        {section.id ? (
                            <Link
                                href={`#${section.id}`}
                                className={cn(
                                    "block text-sm transition-all duration-300 border-l-2 -ml-[2px] relative group",
                                    level === 0 ? "px-5 py-2.5" : "px-5 py-2 pl-8",
                                    activeSection === section.id
                                        ? "border-teal-500 text-teal-600 font-bold bg-teal-50/30"
                                        : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-200 hover:bg-slate-50/50"
                                )}
                                onClick={() => setActiveSection(section.id!)}
                            >
                                {section.title}
                                {activeSection === section.id && (
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                                )}
                            </Link>
                        ) : (
                            <div className={cn(
                                "text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 mt-10 pl-5",
                                level > 0 && "mt-5 text-[10px] text-slate-400/80"
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
        <nav className={cn("w-64 hidden lg:block flex-shrink-0 sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto pr-6 scrollbar-hide", className)}>
            <div className="mb-8 px-1">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                    Documentation
                </h3>
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search API..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400"
                    />
                    <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] text-slate-400 font-sans pointer-events-none group-focus-within:hidden">
                        /
                    </kbd>
                </div>
            </div>
            {renderItems(filteredSections)}
        </nav>
    );
};

export default ApiSidebar;
