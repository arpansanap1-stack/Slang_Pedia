"use client";

import { useState } from "react";
import { X, Plus, Sparkles } from "lucide-react";

export default function AddTermModal({ isOpen, onClose, onTermAdded }) {
  const [formData, setFormData] = useState({
    term: "",
    expansion: "",
    meaning: "",
    tone: "casual",
    origin: "Texting",
    exA: "",
    exB: "",
    tags: "chat,gen-z"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      term: formData.term,
      expansion: formData.expansion,
      meaning: formData.meaning,
      tone: formData.tone,
      origin: formData.origin,
      tags: formData.tags.split(",").map((t) => t.trim()),
      examples: [
        ...(formData.exA ? [{ sender: "A", message: formData.exA }] : []),
        ...(formData.exB ? [{ sender: "B", message: formData.exB }] : [])
      ]
    };

    try {
      const res = await fetch("/api/terms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        onTermAdded(data.data);
        onClose();
        setFormData({
          term: "",
          expansion: "",
          meaning: "",
          tone: "casual",
          origin: "Texting",
          exA: "",
          exB: "",
          tags: "chat,gen-z"
        });
      } else {
        setError(data.error || "Couldn't save this term. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white neo-border rounded-chunky shadow-popLg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full neo-border"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-bubblePink text-white rounded-xl neo-border font-black text-lg">✏️</div>
          <h2 className="text-xl font-black text-chalkDark">Add New Slang / Term</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-black uppercase text-slate-600 block mb-1">Acronym / Word *</label>
              <input
                required
                type="text"
                placeholder="e.g. cooked"
                value={formData.term}
                onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                className="w-full p-2.5 neo-border rounded-xl text-sm font-bold bg-amber-50/20"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase text-slate-600 block mb-1">Full Expansion *</label>
              <input
                required
                type="text"
                placeholder="e.g. In trouble / Done for"
                value={formData.expansion}
                onChange={(e) => setFormData({ ...formData, expansion: e.target.value })}
                className="w-full p-2.5 neo-border rounded-xl text-sm font-bold bg-amber-50/20"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-slate-600 block mb-1">Meaning / Definition *</label>
            <textarea
              required
              rows={2}
              placeholder="Explain how people use it..."
              value={formData.meaning}
              onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
              className="w-full p-2.5 neo-border rounded-xl text-sm font-bold bg-amber-50/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-black uppercase text-slate-600 block mb-1">Tone Category</label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                className="w-full p-2.5 neo-border rounded-xl text-sm font-bold bg-white"
              >
                <option value="casual">Casual</option>
                <option value="sarcastic">Sarcastic</option>
                <option value="brainrot">Brainrot</option>
                <option value="hype">Hype</option>
                <option value="work-safe">Work Safe</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black uppercase text-slate-600 block mb-1">Tags (Comma Separated)</label>
              <input
                type="text"
                placeholder="chat, gaming, tiktok"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full p-2.5 neo-border rounded-xl text-sm font-bold"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 neo-border rounded-2xl space-y-2">
            <span className="text-[11px] font-black uppercase text-slate-500">Chat Bubble Examples (Optional)</span>
            <input
              type="text"
              placeholder="Person A: Bro did you finish the project?"
              value={formData.exA}
              onChange={(e) => setFormData({ ...formData, exA: e.target.value })}
              className="w-full p-2 neo-border rounded-lg text-xs font-bold"
            />
            <input
              type="text"
              placeholder="Person B: Nah we are cooked 😭"
              value={formData.exB}
              onChange={(e) => setFormData({ ...formData, exB: e.target.value })}
              className="w-full p-2 neo-border rounded-lg text-xs font-bold"
            />
          </div>

          {error && (
            <p className="text-xs font-bold text-rose-600 bg-rose-50 neo-border rounded-xl px-3 py-2">
              ⚠️ {error}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 neo-border rounded-full font-black text-xs hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="neo-btn bg-bubbleGreen font-black text-xs px-6 py-2 rounded-full shadow-pop flex items-center gap-1.5"
            >
              <Sparkles size={14} /> {loading ? "Publishing..." : "Submit to SlangPedia"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}