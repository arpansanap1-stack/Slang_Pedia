"use client";

import { Sparkles, PlusCircle, MessageSquareQuote } from "lucide-react";

export default function Header({ onOpenAddModal, activeTab, setActiveTab }) {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 bg-bubbleYellow neo-border rounded-2xl shadow-pop flex items-center justify-center -rotate-3 text-2xl font-black">
          ⚡
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-chalkDark flex items-center gap-1.5">
            SlangPedia
            <span className="text-xs px-2 py-0.5 bg-bubblePink text-white rounded-full neo-border shadow-pop font-bold">
              v1.0
            </span>
          </h1>
          <p className="text-xs font-bold text-slate-600">The Internet Chat Decoder</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex bg-white neo-border rounded-full p-1 shadow-pop">
          <button
            onClick={() => setActiveTab("dict")}
            className={`px-4 py-1.5 rounded-full text-sm font-black transition-all ${
              activeTab === "dict" ? "bg-bubbleBlue text-chalkDark neo-border" : "text-slate-600 hover:text-chalkDark"
            }`}
          >
            Dictionary
          </button>
          <button
            onClick={() => setActiveTab("decoder")}
            className={`px-4 py-1.5 rounded-full text-sm font-black flex items-center gap-1 transition-all ${
              activeTab === "decoder" ? "bg-bubblePurple text-white neo-border" : "text-slate-600 hover:text-chalkDark"
            }`}
          >
            <MessageSquareQuote size={16} /> Decoder
          </button>
        </div>

        <button
          onClick={onOpenAddModal}
          className="neo-btn bg-bubbleGreen hover:bg-[#05e2c5] text-chalkDark font-black px-4 py-2 rounded-full shadow-pop flex items-center gap-1.5 text-sm"
        >
          <PlusCircle size={18} /> Add Word
        </button>
      </div>
    </header>
  );
}