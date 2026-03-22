"use client";

import { useState, useEffect } from "react";

export type FinEventType = "income" | "expense" | "bill" | "deadline";

export interface FinEvent {
  id: string;
  title: string;
  type: FinEventType;
  amount?: number;
  startDate: string;
  endDate: string;
  note?: string;
}

interface FinEventModalProps {
  isOpen: boolean;
  editEvent?: FinEvent | null;
  prefillDate?: string;
  onClose: () => void;
  onSave: (event: Omit<FinEvent, "id"> & { id?: string }) => void;
  onDelete?: (id: string) => void;
}

const TYPE_OPTIONS: { value: FinEventType; label: string; icon: string; color: string }[] = [
  { value: "income",   label: "Income",   icon: "↑", color: "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30" },
  { value: "expense",  label: "Expense",  icon: "↓", color: "text-destructive bg-destructive/10 border-destructive/30" },
  { value: "bill",     label: "Bill Due", icon: "⚡", color: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/30" },
  { value: "deadline", label: "Deadline", icon: "◈", color: "text-primary bg-primary/10 border-primary/30" },
];

export default function DboardFinEventModal({
  isOpen, editEvent, prefillDate, onClose, onSave, onDelete,
}: FinEventModalProps) {
  const [title,     setTitle]    = useState("");
  const [type,      setType]     = useState<FinEventType>("expense");
  const [amount,    setAmount]   = useState("");
  const [startDate, setStart]    = useState("");
  const [endDate,   setEnd]      = useState("");
  const [note,      setNote]     = useState("");

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setType(editEvent.type);
      setAmount(editEvent.amount?.toString() ?? "");
      setStart(editEvent.startDate);
      setEnd(editEvent.endDate);
      setNote(editEvent.note ?? "");
    } else {
      setTitle(""); setType("expense"); setAmount("");
      setStart(prefillDate ?? ""); setEnd(prefillDate ?? ""); setNote("");
    }
  }, [editEvent, prefillDate, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim() || !startDate || !endDate) return;
    onSave({
      id: editEvent?.id,
      title: title.trim(),
      type,
      amount: amount ? parseFloat(amount) : undefined,
      startDate, endDate,
      note: note.trim() || undefined,
    });
    onClose();
  };

  const selected = TYPE_OPTIONS.find(o => o.value === type)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm">
      <div className="bg-card text-card-foreground w-full max-w-md rounded-2xl shadow-2xl border border-border overflow-hidden">

        {/* Header stripe */}
        <div className="px-6 pt-6 pb-5 border-b border-border flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${selected.color}`}>
                {selected.icon} {selected.label}
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground">
              {editEvent ? "Edit Entry" : "New Finance Entry"}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Track income, expenses, bills & freelance deadlines
            </p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition mt-1">
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Type selector */}
          <div className="grid grid-cols-4 gap-2">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setType(opt.value)}
                className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border text-xs font-medium transition
                  ${type === opt.value ? opt.color + " font-semibold" : "border-border bg-background text-muted-foreground hover:bg-muted"}`}
              >
                <span className="text-base leading-none">{opt.icon}</span>
                <span className="text-[10px]">{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={type === "income" ? "e.g. Client payment — Acme Co." : type === "expense" ? "e.g. Adobe CC subscription" : type === "bill" ? "e.g. Rent due" : "e.g. Project Alpha delivery"}
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
          </div>

          {/* Amount + Dates row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Amount ($)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-input bg-background pl-6 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">From</label>
              <input type="date" value={startDate} onChange={(e) => setStart(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-2.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">To</label>
              <input type="date" value={endDate} onChange={(e) => setEnd(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-2.5 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition" />
            </div>
          </div>

          {/* Note */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note..."
              rows={2}
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex justify-between items-center">
          <div className="flex gap-2">
            {editEvent && onDelete && (
              <button onClick={() => { onDelete(editEvent.id); onClose(); }}
                className="px-3.5 py-2 rounded-lg text-xs font-medium text-destructive border border-destructive/30 hover:bg-destructive/10 transition">
                Delete
              </button>
            )}
            <button onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-muted transition">
              Cancel
            </button>
          </div>
          <button onClick={handleSave}
            className="px-5 py-2 rounded-lg text-sm font-semibold transition"
            style={{ backgroundColor: "var(--button)", color: "#000" }}>
            {editEvent ? "Update" : "Save Entry"}
          </button>
        </div>
      </div>
    </div>
  );
}