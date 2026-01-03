"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Turtle, X } from 'lucide-react';

export interface ApiSectionLink {
    id?: string;
    title: string;
    items?: ApiSectionLink[];
}

interface ApiSidebarProps {
    sections: ApiSectionLink[];
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

const ApiSidebar: React.FC<ApiSidebarProps> = ({ sections, className, isOpen, onClose }) => {
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
                                onClick={() => {
                                    setActiveSection(section.id!);
                                    if (onClose) onClose();
                                }}
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
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[90] lg:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            <nav className={cn(
                "fixed inset-y-0 left-0 z-[100] w-72 bg-white border-r border-slate-200 transform md:transform-none md:static md:block md:w-64 flex-shrink-0 md:sticky md:top-3 md:h-[calc(100vh-2rem)] overflow-y-auto pr-6 md:pr-6 pl-6 md:pl-0 transition-all duration-300 ease-in-out custom-scrollbar",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                className
            )}>
                <header className="md:hidden py-6 mb-4 flex items-center justify-between">
                    <Link className="flex items-center gap-2" href="/instructor/dashboard">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                            <Turtle size={18} />
                        </div>
                        <span className="font-black text-slate-800 text-xl tracking-tight">Jiroshi Docs</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-slate-400 hover:text-slate-600 md:hidden bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={18} />
                    </button>
                </header>

                <header className="hidden md:block py-6">
                    <h3 className="text-md font-bold px-1 text-teal-600">
                        <Link className="flex items-center gap-2" href="/instructor/dashboard">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-500/10">
                                <Turtle size={14} />
                            </div>
                            <span className="font-black text-slate-900 tracking-tight">Jiroshi</span>
                        </Link>
                    </h3>
                </header>
                <div className="mb-8 px-1">
                    <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                        Documentation
                    </h3>
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-100 border-none rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white focus:shadow-inner transition-all placeholder:text-slate-400"
                        />
                        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[9px] text-slate-400 font-sans pointer-events-none group-focus-within:hidden md:block hidden shadow-sm">
                            /
                        </kbd>
                    </div>
                </div>
                {renderItems(filteredSections)}
            </nav>
        </>
    );
};

export default ApiSidebar;
