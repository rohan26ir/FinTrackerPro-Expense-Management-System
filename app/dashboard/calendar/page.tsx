"use client";

import DboardFinEventModal, { FinEvent } from "@/app/components/dashboard/DboardCalendarEventModal";
import DboardFinCalendarGrid from "@/app/components/dashboard/DboardCalendarGrid";
import { useState, useMemo } from "react";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const INITIAL_EVENTS: FinEvent[] = [
  { id: "1",  title: "Freelance — Web Design",   type: "income",   amount: 1800, startDate: "2026-03-05", endDate: "2026-03-05" },
  { id: "2",  title: "Adobe CC",                 type: "expense",  amount: 54,   startDate: "2026-03-07", endDate: "2026-03-07" },
  { id: "3",  title: "Rent Due",                 type: "bill",     amount: 1200, startDate: "2026-03-10", endDate: "2026-03-10" },
  { id: "4",  title: "Client — Mobile App",      type: "income",   amount: 3200, startDate: "2026-03-12", endDate: "2026-03-14" },
  { id: "5",  title: "Electricity Bill",         type: "bill",     amount: 110,  startDate: "2026-03-15", endDate: "2026-03-15" },
  { id: "6",  title: "Project Bravo Delivery",   type: "deadline",            startDate: "2026-03-18", endDate: "2026-03-18" },
  { id: "7",  title: "Groceries",                type: "expense",  amount: 210,  startDate: "2026-03-20", endDate: "2026-03-20" },
  { id: "8",  title: "Figma Pro",                type: "expense",  amount: 15,   startDate: "2026-03-22", endDate: "2026-03-22" },
  { id: "9",  title: "Freelance — SEO Audit",    type: "income",   amount: 650,  startDate: "2026-03-25", endDate: "2026-03-25" },
  { id: "10", title: "Internet Bill",            type: "bill",     amount: 60,   startDate: "2026-03-28", endDate: "2026-03-28" },
];

const LEGEND = [
  { type: "income",   label: "Income",   dot: "bg-[#22c55e]" },
  { type: "expense",  label: "Expense",  dot: "bg-destructive" },
  { type: "bill",     label: "Bill",     dot: "bg-[#f59e0b]" },
  { type: "deadline", label: "Deadline", dot: "bg-primary" },
] as const;

export default function DailyFinCalendarPage() {
  const now = new Date();
  const [year,  setYear]  = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [events, setEvents] = useState<FinEvent[]>(INITIAL_EVENTS);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editEvent,  setEditEvent]  = useState<FinEvent | null>(null);
  const [prefill,    setPrefill]    = useState("");

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const monthEvents = useMemo(() => {
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    return events.filter(e => e.startDate.startsWith(prefix) || e.endDate.startsWith(prefix));
  }, [events, year, month]);

  const stats = useMemo(() => ({
    income:  monthEvents.filter(e => e.type === "income" ).reduce((s, e) => s + (e.amount ?? 0), 0),
    expense: monthEvents.filter(e => e.type === "expense").reduce((s, e) => s + (e.amount ?? 0), 0),
    bills:   monthEvents.filter(e => e.type === "bill"   ).reduce((s, e) => s + (e.amount ?? 0), 0),
  }), [monthEvents]);

  const openAdd  = (dateStr: string) => { setEditEvent(null); setPrefill(dateStr); setModalOpen(true); };
  const openEdit = (ev: FinEvent)    => { setEditEvent(ev);   setModalOpen(true); };

  const handleSave = (data: Omit<FinEvent, "id"> & { id?: string }) => {
    if (data.id) {
      setEvents(prev => prev.map(e => e.id === data.id ? { ...e, ...data, id: e.id } : e));
    } else {
      setEvents(prev => [...prev, { ...data, id: Date.now().toString() }]);
    }
  };

  const handleDelete = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  const net = stats.income - stats.expense - stats.bills;

  return (
    <div className="max-w-400 w-full mx-auto space-y-4 p-4">

      {/* Month summary strip */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Income",   value: stats.income,  color: "text-[#16a34a]", bg: "bg-[#22c55e]/10",    border: "border-[#22c55e]/20" },
          { label: "Expenses", value: stats.expense, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
          { label: "Bills",    value: stats.bills,   color: "text-[#d97706]",  bg: "bg-[#f59e0b]/10",   border: "border-[#f59e0b]/20" },
          { label: "Net",      value: net,            color: net >= 0 ? "text-[#16a34a]" : "text-destructive", bg: "bg-secondary", border: "border-border" },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className={`rounded-xl border ${border} ${bg} px-4 py-3`}>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-lg font-bold ${color}`}>
              {value >= 0 ? "" : "-"}${Math.abs(value).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Calendar card */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-5 py-4 border-b border-border">

          <div className="w-full">
            <h2 className="heading-2 font-bold text-foreground">
              {MONTH_NAMES[month]} {year}
            </h2>
            <p className="paragraph-large text-muted-foreground mt-0.5">
              {monthEvents.length} entr{monthEvents.length !== 1 ? "ies" : "y"} · DailyFinTracker
            </p>
          </div>

          <div className="w-full flex justify-between md:justify-end  items-center gap-2 mt-5 md:mt-auto">

            {/* 1st */}
            <div>
              <button
              onClick={() => { setYear(now.getFullYear()); setMonth(now.getMonth()); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-muted transition"
            >
              Today
            </button>
            </div>

            {/* 2nd */}
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button onClick={prevMonth} className="px-2.5 py-1.5 hover:bg-muted transition text-muted-foreground hover:text-foreground" aria-label="Previous">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <div className="w-px h-5 bg-border" />
              <button onClick={nextMonth} className="px-2.5 py-1.5 hover:bg-muted transition text-muted-foreground hover:text-foreground" aria-label="Next">
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
            {/* 3rd */}
            <div>
              <button
              onClick={() => openAdd("")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition text-foreground bg-button"
            >
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
              Add Entry
            </button>
            </div>

          </div>


        </div>

        {/* Grid */}
        <div className="flex flex-col min-h-auto md:min-h-[65lvh]" >
          <DboardFinCalendarGrid
            year={year}
            month={month}
            events={events}
            onDayClick={openAdd}
            onEventClick={openEdit}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 px-1">
        {LEGEND.map(({ label, dot }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${dot}`} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
        <span className="text-xs text-muted-foreground ml-auto">
          Click any day to add · Click event to edit
        </span>
      </div>

      {/* Modal */}
      <DboardFinEventModal
        isOpen={modalOpen}
        editEvent={editEvent}
        prefillDate={prefill}
        onClose={() => { setModalOpen(false); setEditEvent(null); }}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}