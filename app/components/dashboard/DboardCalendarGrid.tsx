"use client";

import { FinEvent, FinEventType } from "./DboardCalendarEventModal";

const TYPE_STYLES: Record<FinEventType, { bar: string; pill: string; dot: string }> = {
  income:   { bar: "border-l-[#22c55e]",    pill: "bg-[#22c55e]/15 text-[#16a34a]",   dot: "bg-[#22c55e]" },
  expense:  { bar: "border-l-destructive",   pill: "bg-destructive/15 text-destructive", dot: "bg-destructive" },
  bill:     { bar: "border-l-[#f59e0b]",    pill: "bg-[#f59e0b]/15 text-[#d97706]",   dot: "bg-[#f59e0b]" },
  deadline: { bar: "border-l-primary",       pill: "bg-primary/10 text-primary",        dot: "bg-primary" },
};

const TYPE_ICON: Record<FinEventType, string> = {
  income: "↑", expense: "↓", bill: "⚡", deadline: "◈",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface DboardFinCalendarGridProps {
  year: number;
  month: number;
  events: FinEvent[];
  onDayClick: (dateStr: string) => void;
  onEventClick: (event: FinEvent) => void;
}

function getDatesInRange(start: string, end: string): Set<string> {
  const set = new Set<string>();
  const cur = new Date(start + "T00:00:00");
  const last = new Date(end + "T00:00:00");
  while (cur <= last) {
    set.add(cur.toISOString().split("T")[0]);
    cur.setDate(cur.getDate() + 1);
  }
  return set;
}

function getDaySummary(dayEvents: FinEvent[]) {
  const income  = dayEvents.filter(e => e.type === "income" ).reduce((s, e) => s + (e.amount ?? 0), 0);
  const expense = dayEvents.filter(e => e.type === "expense").reduce((s, e) => s + (e.amount ?? 0), 0);
  return { income, expense, net: income - expense };
}

export default function DboardFinCalendarGrid({
  year, month, events, onDayClick, onEventClick,
}: DboardFinCalendarGridProps) {
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today       = new Date().toISOString().split("T")[0];

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-border bg-muted/30">
        {DAYS.map((d) => (
          <div key={d} className="py-2.5 text-center paragraph font-bold text-foreground uppercase tracking-widest">
            {d}
          </div>
        ))}
      </div>

      {/* Grid cells */}
      <div
        className="grid grid-cols-7 flex-1"
        style={{ gridTemplateRows: `repeat(${cells.length / 7}, minmax(90px, 1fr))` }}
      >
        {cells.map((day, idx) => {
          const isLast  = (idx + 1) % 7 === 0;
          const dateStr = day
            ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            : null;
          const isToday   = dateStr === today;
          const dayEvents = day && dateStr
            ? events.filter(e => getDatesInRange(e.startDate, e.endDate).has(dateStr))
            : [];
          const summary   = getDaySummary(dayEvents);
          const hasFinance = summary.income > 0 || summary.expense > 0;

          return (
            <div
              key={idx}
              onClick={() => day && dateStr && onDayClick(dateStr)}
              className={`relative border-b border-r border-border flex flex-col transition
                ${isLast ? "border-r-0" : ""}
                ${day ? "cursor-pointer hover:bg-muted/40 group" : "bg-muted/10"}
              `}
            >
              {day && (
                <>
                  {/* Day number row */}
                  <div className="flex items-center justify-between px-1.5 pt-1.5 pb-0.5">
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-lg font-semibold transition
                        ${isToday ? "font-bold text-black" : "text-foreground group-hover:bg-secondary"}`}
                      style={isToday ? { backgroundColor: "var(--button)" } : {}}
                    >
                      {day}
                    </span>
                    {/* Net amount mini badge */}
                    {hasFinance && (
                      <span className={`text-[9px] font-bold px-1 rounded
                        ${summary.net >= 0 ? "text-[#16a34a]" : "text-destructive"}`}>
                        {summary.net >= 0 ? "+" : ""}${Math.abs(summary.net).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Events */}
                  <div className="flex flex-col gap-0.5 px-1 pb-1 overflow-hidden flex-1">
                    {dayEvents.slice(0, 3).map((ev) => {
                      const s = TYPE_STYLES[ev.type];
                      return (
                        <button
                          key={ev.id}
                          onClick={(e) => { e.stopPropagation(); onEventClick(ev); }}
                          className={`w-full text-left text-sm font-medium px-1.5 py-0.5 rounded border-l-2 truncate transition hover:opacity-75 ${s.pill} ${s.bar}`}
                        >
                          <span className="mr-0.5 opacity-70">{TYPE_ICON[ev.type]}</span>
                          {ev.amount ? `$${ev.amount.toLocaleString()} · ` : ""}{ev.title}
                        </button>
                      );
                    })}
                    {dayEvents.length > 3 && (
                      <span className="text-[9px] text-muted-foreground px-1 leading-none">
                        +{dayEvents.length - 3} more
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}