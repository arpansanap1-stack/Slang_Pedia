"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Copy, Check, Eraser } from "lucide-react";

const SLANG_MAP = {
  ngl: "not gonna lie",
  fr: "for real",
  tbh: "to be honest",
  rn: "right now",
  idk: "I don't know",
  delulu: "delusional",
  yap: "talk excessively",
  goat: "greatest of all time",
  ts: "this",
  w: "win",
  l: "loss",
  mid: "mediocre"
};

export default function SlangDecoder() {
  const [inputText, setInputText] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleDecode = () => {
    if (!inputText.trim()) return;
    const words = inputText.split(/(\s+|[.,!?;])/);
    const translated = words
      .map((word) => {
        const clean = word.toLowerCase();
        return SLANG_MAP[clean] ? `[${SLANG_MAP[clean]}]` : word;
      })
      .join("");
    setDecodedText(translated);
  };

  const handleClear = () => {
    setInputText("");
    setDecodedText("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!decodedText) return;
    try {
      await navigator.clipboard.writeText(decodedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleDecode();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white neo-border rounded-chunky p-6 sm:p-8 shadow-popLg">
      <div className="flex items-center gap-2 mb-4">
        <span className="p-2 bg-bubblePurple text-white rounded-xl neo-border text-xl">🔮</span>
        <div>
          <h2 className="text-2xl font-black text-chalkDark">Instant Slang Decoder</h2>
          <p className="text-xs font-bold text-slate-500">Paste confusing messages and translate them instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-black uppercase text-slate-500 mb-1">Incoming Message</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. ngl bro is totally delulu fr rn..."
            className="w-full h-40 p-4 neo-border rounded-2xl bg-amber-50/30 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-bubblePurple"
          />
          <p className="text-[11px] font-bold text-slate-400 mt-1">Tip: press ⌘/Ctrl + Enter to translate</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-black uppercase text-slate-500">Plain English Translation</label>
            {decodedText && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-black text-slate-500 hover:text-chalkDark transition-colors"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          <div className="w-full h-40 p-4 neo-border rounded-2xl bg-emerald-50/40 text-sm font-bold overflow-y-auto">
            {decodedText ? (
              <p className="text-chalkDark leading-relaxed">{decodedText}</p>
            ) : (
              <span className="text-slate-400 italic">Translated output will appear here...</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleClear}
          disabled={!inputText && !decodedText}
          className="neo-btn bg-white hover:bg-slate-50 text-chalkDark font-black px-4 py-2.5 rounded-full shadow-pop flex items-center gap-2 text-sm disabled:opacity-40"
        >
          <Eraser size={16} /> Clear
        </button>
        <button
          onClick={handleDecode}
          className="neo-btn bg-bubbleYellow hover:bg-yellow-400 text-chalkDark font-black px-6 py-2.5 rounded-full shadow-pop flex items-center gap-2 text-sm"
        >
          <Sparkles size={16} /> Translate Text <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}