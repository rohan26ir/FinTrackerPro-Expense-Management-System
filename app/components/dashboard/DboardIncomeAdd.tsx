"use client";

import { useState, useRef, useEffect } from "react";
import {
  DollarSign, Tag, Calendar, FileText, ArrowRight,
  CheckCircle2, X, Plus, Repeat2, Trash2, Sparkles,
  TrendingUp, Wallet, Clock, Layers, BadgePlus,
  ChevronDown, AlertCircle, Edit3, Briefcase, Laptop,
  TrendingUp as TrendingUpIcon, Building2, Home, Gift,
  RefreshCcw, Package, PlusCircle
} from "lucide-react";

// ─── Toast ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type = "success", onClose }: { message: string; type?: "success" | "error"; onClose: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-background border-emerald-200" : "bg-rose-50 border-rose-200";
  const textColor = type === "success" ? "text-foreground" : "text-rose-900";
  const iconColor = type === "success" ? "text-primery" : "text-rose-500";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl border border-border ${bgColor} backdrop-blur-sm`}
      style={{ minWidth: 280, animation: "slideIn 0.25s ease" }}
    >
      <div className={`p-1 rounded-full ${type === "success" ? "bg-secondery" : "bg-rose-100"}`}>
        {type === "success" ? <CheckCircle2 size={18} className={iconColor} /> : <AlertCircle size={18} className={iconColor} />}
      </div>
      <span className={`text-sm font-medium flex-1 ${textColor}`}>{message}</span>
      <button onClick={onClose} className={`${textColor} hover:opacity-70 transition-opacity`}>
        <X size={14} />
      </button>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ─── Constants ────────────────────────────────────────────────────────────────
const DEFAULT_CATEGORIES = [
  { id: "1", name: "Salary", icon: "Briefcase", color: "#818CF8" },
  { id: "2", name: "Freelance", icon: "Laptop", color: "#F472B6" },
  { id: "3", name: "Investment", icon: "TrendingUp", color: "#4ADE80" },
  { id: "4", name: "Business", icon: "Building2", color: "#FBBF24" },
  { id: "5", name: "Rental", icon: "Home", color: "#60A5FA" },
  { id: "6", name: "Gift", icon: "Gift", color: "#C084FC" },
  { id: "7", name: "Refund", icon: "RefreshCcw", color: "#F87171" },
  { id: "8", name: "Other", icon: "Package", color: "#9CA3AF" },
];

const ICON_OPTIONS = [
  { name: "Briefcase", component: Briefcase },
  { name: "Laptop", component: Laptop },
  { name: "TrendingUp", component: TrendingUpIcon },
  { name: "Building2", component: Building2 },
  { name: "Home", component: Home },
  { name: "Gift", component: Gift },
  { name: "RefreshCcw", component: RefreshCcw },
  { name: "Package", component: Package },
  { name: "DollarSign", component: DollarSign },
  { name: "Calendar", component: Calendar },
  { name: "Clock", component: Clock },
  { name: "Wallet", component: Wallet },
];

const RECURRENCE_OPTIONS = [
  { value: "None", label: "One time" },
  { value: "Daily", label: "Every day" },
  { value: "Weekly", label: "Every week" },
  { value: "Monthly", label: "Every month" },
  { value: "Yearly", label: "Every year" },
];

const CURRENCIES = [
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];

const today = () => new Date().toISOString().split("T")[0];

// Icon renderer component
const IconRenderer = ({ iconName, size = 16, className = "" }: { iconName: string; size?: number; className?: string }) => {
  const iconMap: { [key: string]: any } = {
    Briefcase, Laptop, TrendingUp: TrendingUpIcon, Building2, Home, Gift,
    RefreshCcw, Package, DollarSign, Calendar, Clock, Wallet, X, Plus
  };
  
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent size={size} className={className} /> : null;
};

// ─── Component ────────────────────────────────────────────────────────────────
const DboardIncomeAdd = () => {
  const [form, setForm] = useState({
    amount: "",
    currency: "BDT",
    category: "",
    date: today(),
    recurrence: "None",
    note: "",
    tags: [] as string[],
  });

  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [newCatInput, setNewCatInput] = useState({ name: "", icon: "Briefcase", color: "#98E667" });
  const [focused, setFocused] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "advanced">("basic");
  
  const categoryRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const set = (field: string, value: unknown) =>
    setForm((p) => ({ ...p, [field]: value }));

  // Add custom category
  const addCustomCategory = () => {
    const trimmed = newCatInput.name.trim();
    if (!trimmed || categories.some(c => c.name === trimmed)) return;
    
    const newCategory = {
      id: Date.now().toString(),
      name: trimmed,
      icon: newCatInput.icon,
      color: newCatInput.color
    };
    
    setCategories((p) => [...p, newCategory]);
    set("category", trimmed);
    setNewCatInput({ name: "", icon: "Briefcase", color: "#98E667" });
    setCategoryOpen(false);
    
    setToast({ message: "Category added successfully! 🎉", type: "success" });
  };

  // Remove custom category (only non-default ones)
  const removeCategory = (catId: string, catName: string) => {
    if (DEFAULT_CATEGORIES.some(c => c.name === catName)) return;
    setCategories((p) => p.filter((c) => c.id !== catId));
    if (form.category === catName) set("category", "");
  };

  // Tags
  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (!trimmed || form.tags.includes(trimmed) || form.tags.length >= 5) return;
    set("tags", [...form.tags, trimmed]);
    setTagInput("");
  };
  const removeTag = (t: string) => set("tags", form.tags.filter((x) => x !== t));

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      submittedAt: new Date().toISOString(),
      categoryDetails: categories.find(c => c.name === form.category),
    };
    
    console.log("Income Submitted:", payload);
    setToast({ message: "Income added successfully! 🎉", type: "success" });
    
    setForm({
      amount: "", currency: "USD", category: "", date: today(),
      recurrence: "None", note: "", tags: [],
    });
    setSubmitting(false);
  };

  const isValid = form.amount.trim() && parseFloat(form.amount) > 0 && form.category && form.date;

  const selectedCurrency = CURRENCIES.find(c => c.code === form.currency);

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className=" bg-background">
        <div className="w-full max-w-400 mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Header */}
          <div className="mb-6 ">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-button/10">
                <Wallet size={20} className="text-foreground" />
              </div>
              <h1 className="heading-3 text-foreground">Add Income</h1>
            </div>
            <p className="paragraph-small text-muted-foreground flex items-center gap-1">
              <Sparkles size={14} className="text-foreground" />
              Record a new income entry
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-5 p-1 bg-secondary rounded-xl w-fit border border-border">
            <button
              onClick={() => setActiveTab("basic")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5
                ${activeTab === "basic" 
                  ? "bg-card text-foreground shadow-sm border border-border" 
                  : "text-muted-foreground hover:text-foreground"}`}
            >
              <Layers size={14} />
              Basic
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5
                ${activeTab === "advanced" 
                  ? "bg-card text-foreground shadow-sm border border-border" 
                  : "text-muted-foreground hover:text-foreground"}`}
            >
              <Edit3 size={14} />
              Advanced
            </button>
          </div>

          {/* Main Card */}
          <div className="relative ">
            <div className="relative bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              
              {/* Card header */}
              <div className="px-6 py-3 border-b border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-foreground" />
                    <span className="caption font-medium text-muted-foreground">New transaction • Income</span>
                  </div>
                  <span className="caption text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    {today()}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">

                {/* Basic Info Section */}
                <div className={`space-y-5 transition-all duration-300 ${activeTab === "basic" ? "block" : "hidden"}`}>
                  
                  {/* Amount with currency selector */}
                  <div>
                    <label className="flex items-center gap-1 caption font-semibold text-muted-foreground mb-1.5">
                      <DollarSign size={12} /> Amount <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <span className="text-base font-medium text-muted-foreground">{selectedCurrency?.symbol}</span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={form.amount}
                        onChange={(e) => set("amount", e.target.value)}
                        onFocus={() => setFocused("amount")}
                        onBlur={() => setFocused(null)}
                        required
                        className="w-full pl-8 pr-24 py-3 bg-secondary border border-border rounded-lg 
                                 text-base font-bold text-foreground placeholder:text-muted-foreground/40
                                 focus:border-button focus:ring-1 focus:ring-button/20 
                                 transition-all duration-200 outline-none"
                      />
                      <select
                        value={form.currency}
                        onChange={(e) => set("currency", e.target.value)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 
                                 bg-card border border-border rounded-md text-xs
                                 text-foreground cursor-pointer hover:border-button 
                                 transition-colors outline-none"
                      >
                        {CURRENCIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category selector - Cute & Compact */}
                  <div ref={categoryRef}>
                    <label className="flex items-center gap-1 caption font-semibold text-muted-foreground mb-1.5">
                      <Tag size={12} /> Category <span className="text-destructive">*</span>
                    </label>
                    
                    <div className="grid grid-cols-4 gap-1.5">
                      {categories.slice(0, 7).map((cat) => (
                        <div key={cat.id} className="relative">
                          <button
                            type="button"
                            onClick={() => { set("category", cat.name); setCategoryOpen(false); }}
                            className={`relative w-full p-2 rounded-lg border transition-all duration-200
                              ${form.category === cat.name 
                                ? 'border-button bg-button/10' 
                                : 'border-border hover:border-button/50 hover:bg-secondary'}`}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <div className="p-1.5 rounded-md" style={{ backgroundColor: `${cat.color}15` }}>
                                <IconRenderer iconName={cat.icon} size={14} className="text-foreground" />
                              </div>
                              <span className={`text-[10px] font-medium ${form.category === cat.name ? 'text-button' : 'text-muted-foreground'}`}>
                                {cat.name}
                              </span>
                            </div>
                          </button>
                          
                          {form.category === cat.name && (
                            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-button rounded-full flex items-center justify-center">
                              <CheckCircle2 size={8} className="text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Add custom button */}
                      <button
                        type="button"
                        onClick={() => setCategoryOpen(true)}
                        className="p-2 rounded-lg border border-dashed border-border 
                                 hover:border-button hover:bg-secondary transition-all duration-200
                                 flex flex-col items-center gap-1"
                      >
                        <BadgePlus size={16} className="text-muted-foreground" />
                        <span className="text-[10px] font-medium text-muted-foreground">Custom</span>
                      </button>
                    </div>

                    {/* Custom category dropdown - Compact & Cute */}
                    {categoryOpen && (
                      <div className="absolute z-30 -mt-24 w-full md:w-80 bg-card border border-border rounded-xl shadow-lg p-3 right-0 ">
                        <h4 className="text-xs font-semibold text-foreground mb-2">Create custom category</h4>
                        
                        <div className="space-y-3">
                          {/* Category name */}
                          <div>
                            <label className="block text-[10px] font-medium text-muted-foreground mb-1">Name</label>
                            <input
                              type="text"
                              placeholder="e.g., Bonus, Dividend..."
                              value={newCatInput.name}
                              onChange={(e) => setNewCatInput(p => ({ ...p, name: e.target.value }))}
                              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg 
                                       text-xs text-foreground placeholder:text-muted-foreground/40
                                       focus:border-button focus:ring-1 focus:ring-button/20 
                                       transition-all outline-none"
                              autoFocus
                            />
                          </div>
                          
                          {/* Icon selector - Compact grid */}
                          <div>
                            <label className="block text-[10px] font-medium text-muted-foreground mb-1">Icon</label>
                            <div className="grid grid-cols-6 gap-1">
                              {ICON_OPTIONS.map((icon) => (
                                <button
                                  key={icon.name}
                                  type="button"
                                  onClick={() => setNewCatInput(p => ({ ...p, icon: icon.name }))}
                                  className={`p-1.5 rounded-md border transition-all
                                    ${newCatInput.icon === icon.name 
                                      ? 'border-button bg-button/10' 
                                      : 'border-border hover:border-button/50'}`}
                                >
                                  <IconRenderer iconName={icon.name} size={14} className="text-foreground" />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Color picker - Compact */}
                          <div>
                            <label className="block text-[10px] font-medium text-muted-foreground mb-1">Color</label>
                            <input
                              type="color"
                              value={newCatInput.color}
                              onChange={(e) => setNewCatInput(p => ({ ...p, color: e.target.value }))}
                              className="w-full h-8 rounded-lg cursor-pointer border border-border"
                            />
                          </div>
                          
                          {/* Action buttons */}
                          <div className="flex gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setCategoryOpen(false)}
                              className="flex-1 py-2 border border-border text-muted-foreground text-xs font-medium rounded-lg
                                       hover:bg-secondary transition-all"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={addCustomCategory}
                              disabled={!newCatInput.name.trim()}
                              className="flex-1 py-2 bg-button text-primary-foreground text-xs font-medium rounded-lg
                                       hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed
                                       transition-all duration-200 flex items-center justify-center gap-1"
                            >
                              <PlusCircle size={12} />
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Date and recurrence */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="flex items-center gap-1 caption font-semibold text-muted-foreground mb-1.5">
                        <Calendar size={12} /> Date <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="date"
                          value={form.date}
                          onChange={(e) => set("date", e.target.value)}
                          onFocus={() => setFocused("date")}
                          onBlur={() => setFocused(null)}
                          required
                          className="w-full pl-8 pr-3 py-2.5 bg-secondary border border-border rounded-lg
                                   text-xs text-foreground focus:border-button focus:ring-1 focus:ring-button/20
                                   transition-all duration-200 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-1 caption font-semibold text-muted-foreground mb-1.5">
                        <RefreshCcw size={12} /> Recurrence
                      </label>
                      <div className="relative">
                        <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <select
                          value={form.recurrence}
                          onChange={(e) => set("recurrence", e.target.value)}
                          className="w-full pl-8 pr-6 py-2.5 bg-secondary border border-border rounded-lg
                                   text-xs text-foreground appearance-none cursor-pointer
                                   focus:border-button focus:ring-1 focus:ring-button/20
                                   transition-all duration-200 outline-none"
                        >
                          {RECURRENCE_OPTIONS.map((r) => (
                            <option key={r.value} value={r.value}>{r.label}</option>
                          ))}
                        </select>
                        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Section */}
                <div className={`space-y-5 transition-all duration-300 ${activeTab === "advanced" ? "block" : "hidden"}`}>
                  
                  {/* Notes */}
                  <div>
                    <label className="flex items-center gap-1 caption font-semibold text-muted-foreground mb-1.5">
                      <FileText size={12} /> Notes
                    </label>
                    <textarea
                      value={form.note}
                      onChange={(e) => set("note", e.target.value)}
                      placeholder="Add any additional notes..."
                      rows={3}
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-lg
                               text-xs text-foreground placeholder:text-muted-foreground/40
                               focus:border-button focus:ring-1 focus:ring-button/20
                               transition-all duration-200 outline-none resize-none"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="flex items-center gap-1 caption font-semibold text-muted-foreground mb-1.5">
                      <Tag size={12} /> Tags <span className="text-[10px] font-normal text-muted-foreground">(max 5)</span>
                    </label>
                    
                    <div className="bg-secondary border border-border rounded-lg p-2 focus-within:border-button focus-within:ring-1 focus-within:ring-button/20 transition-all">
                      <div className="flex flex-wrap gap-1 mb-1">
                        {form.tags.map((tag) => (
                          <span
                            key={tag}
                            className="flex items-center gap-0.5 px-2 py-0.5 bg-button/20 text-foreground text-[10px] font-medium rounded-full"
                          >
                            #{tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-0.5 hover:opacity-70"
                            >
                              <X size={10} />
                            </button>
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          placeholder={form.tags.length === 0 ? "Add tags (press Enter)..." : "Add more..."}
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                          disabled={form.tags.length >= 5}
                          className="flex-1 bg-transparent outline-none text-xs text-foreground placeholder:text-muted-foreground/40"
                        />
                        {tagInput && (
                          <button
                            type="button"
                            onClick={addTag}
                            className="px-2 py-0.5 bg-button/20 text-button text-[10px] font-medium rounded
                                     hover:bg-button/30 transition-colors"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Required fields hint */}
                <div className="mt-4 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <AlertCircle size={10} />
                  <span>Fields marked with <span className="text-destructive">*</span> are required</span>
                </div>

                {/* Action buttons */}
                <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setForm({
                      amount: "", currency: "USD", category: "", date: today(),
                      recurrence: "None", note: "", tags: [],
                    })}
                    className="px-4 py-2 text-xs font-medium text-muted-foreground rounded-lg
                             hover:bg-secondary hover:text-foreground 
                             transition-all duration-200 flex items-center gap-1"
                  >
                    <X size={12} />
                    Clear
                  </button>

                  <button
                    type="submit"
                    disabled={!isValid || submitting}
                    className="group relative px-5 py-2.5 bg-button text-foreground text-xs font-bold rounded-lg
                             hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200 active:scale-95
                             flex items-center gap-2 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Add Income</span>
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DboardIncomeAdd;