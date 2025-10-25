import { DateRangePicker } from "@/app/components/atoms/DateRangePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { localDateToUTC, utcToLocalDate } from "@/lib/utils";
import { FilterIcon } from "lucide-react";
import React, { SetStateAction } from "react";

type LessonListFilterProps = {
  lessonFilters: StandardFilters;
  setLessonFilters: React.Dispatch<SetStateAction<StandardFilters>>;
  setSearch: React.Dispatch<SetStateAction<string>>;
  handleFilterChange: (filter_key: string, filter_value: string | null) => void;
};

const LessonListFilters = ({
  lessonFilters,
  setLessonFilters,
  setSearch,
  handleFilterChange,
}: LessonListFilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
          >
            <FilterIcon className="h-4 w-4" />
            Filters
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          className=" z-30 w-80 bg-white border border-gray-200 rounded-md p-4 shadow-sm my-1"
        >
          <div className="flex flex-col gap-5">
            {/* Date Range */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">Date Range</p>
              <DateRangePicker
                onChange={(range) => {
                  if (!range) {
                    handleFilterChange("created_at_after", null);
                    handleFilterChange("created_at_before", null);
                    return;
                  }

                  if (range.from)
                    handleFilterChange(
                      "created_at_after",
                      localDateToUTC(range.from)
                    );
                  if (range.to)
                    handleFilterChange(
                      "created_at_before",
                      localDateToUTC(range.to)
                    );
                }}
                value={{
                  from: lessonFilters?.filters?.created_at_after
                    ? utcToLocalDate(lessonFilters.filters.created_at_after)
                    : undefined,
                  to: lessonFilters?.filters?.created_at_before
                    ? utcToLocalDate(lessonFilters.filters.created_at_before)
                    : undefined,
                }}
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">Status</p>
              <Select
                onValueChange={(statusValue: string) => {
                  if (statusValue === "all") handleFilterChange("status", null);
                  else handleFilterChange("status", statusValue);
                }}
                defaultValue="all"
                value={lessonFilters?.filters?.status || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full text-sm border-gray-300 hover:bg-gray-100"
                onClick={() => {
                  setLessonFilters({
                    filters: {},
                    ordering: null,
                    search: null,
                    page: 1,
                    page_size: 15,
                  });
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Search Input */}
      <div className="relative">
        <Input
          type="search"
          name="search"
          placeholder="Search by course name"
          className="pl-9 w-64 border-gray-300"
          onChange={(e) => setSearch(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default LessonListFilters;
