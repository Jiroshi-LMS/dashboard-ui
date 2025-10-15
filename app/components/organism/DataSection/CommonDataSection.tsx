"use client";

import React from "react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Loader from "@/app/components/atoms/Loader";

interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
  align?: "left" | "center" | "right";
}

interface DataSectionProps<T> {
  title: string;
  data: T[] | null;
  columns: Column<T>[];
  emptyMessage?: string;
  loading?: boolean;
}

export const TabularDataList = <T,>({
  title,
  data,
  columns,
  emptyMessage = "Nothing to show.",
  loading = false,
}: DataSectionProps<T>) => {
  return (
    <section className="mt-5">
      <h2 className="section-title">{title}</h2>

      {loading || !data ? (
        <Loader className="h-[50vh]" />
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center h-[50vh]">
          <h1 className="text-red-400 font-bold text-2xl text-center">{emptyMessage}</h1>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, index) => (
                <TableHead key={index} className={col.align === "center" ? "text-center" : ""}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={col.align === "center" ? "text-center" : ""}
                  >
                    {col.render(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};
