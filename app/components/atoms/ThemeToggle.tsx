"use client";

import { Sun, Moon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "../providers/ThemeProvider";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  compact?: boolean;
  iconOnly?: boolean;
};

export function ThemeToggle({ compact = false, iconOnly = false }: Readonly<ThemeToggleProps>) {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        {isDark
          ? <Moon className="h-4 w-4 text-sky-400" />
          : <Sun className="h-4 w-4 text-amber-500" />}
      </button>
    );
  }

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm cursor-pointer select-none",
        "hover:border-primary/60 hover:text-primary transition-colors",
        "dark:bg-slate-900/80 dark:border-slate-700 dark:text-slate-200"
      )}
    >
      <span className="flex items-center gap-1">
        <Sun className={cn("h-3 w-3", isDark ? "text-slate-400" : "text-amber-500")} />
        <Moon className={cn("h-3 w-3", isDark ? "text-sky-400" : "text-slate-400")} />
      </span>
      {!compact && <span>{isDark ? "Dark" : "Light"} mode</span>}
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="ml-1"
      />
    </label>
  );
}
