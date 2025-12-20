"use client";

import Loader from "@/app/components/atoms/Loader";
import {
    BarChart3Icon,
    BookIcon,
    UsersIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { retrieveDashboardKPIService } from "../dashboardServices";
import { DashboardKPIServiceResponse } from "../dashboardTypes";

const DashboardKPI = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [KPIs, setKPIs] = useState<DashboardKPIServiceResponse | null>(null);

    const hasFetched = useRef(false);
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        setLoading(true);
        retrieveDashboardKPIService().then((resp) => {
            if (resp) {
                setKPIs(resp)
                console.log(resp)
            }
        }).finally(() => {
            setLoading(false)
        })
    }, []);


    if (isLoading) return <Loader className="h-[30vh]" />;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            {[
                {
                    title: 'Total Courses',
                    value: KPIs?.courses?.total || 0,
                    change: KPIs?.courses?.in_last_thirty_days || 0,
                    icon: <BookIcon className="text-indigo-500 w-5 h-5" />
                },
                {
                    title: 'Total Signups',
                    value: KPIs?.signups?.total || 0,
                    change: KPIs?.signups?.in_last_thirty_days || 0,
                    icon: <UsersIcon className="text-emerald-500 w-5 h-5" />
                },
                {
                    title: 'Total Enrollments',
                    value: KPIs?.enrollments?.total || 0,
                    change: KPIs?.enrollments?.in_last_thirty_days || 0,
                    icon: <BarChart3Icon className="text-teal-500 w-5 h-5" />
                }
            ].map((item, i) => (
                <Card
                    key={i}
                    className="border border-gray-200 shadow-sm hover:shadow-md transition-all rounded-xl"
                >
                    <CardContent className="p-5">
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-gray-700">{item.title}</p>
                            {item.icon}
                        </div>
                        <p className="text-3xl font-bold mt-2 text-gray-900">
                            {item.value}
                        </p>
                        {
                            item.change > 0 ? (
                                <p className="text-sm text-gray-500 mt-1">+{item.change} in last 30 days</p>
                            ) : null
                        }
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default DashboardKPI;
