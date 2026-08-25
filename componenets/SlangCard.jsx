"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle, Sparkles } from "lucide-react";

const toneColors = {
  casual: "bg-bubbleBlue/30 text-teal-900 border-teal-600",
  sarcastic: "bg-bubblePink/30 text-pink-900 border-pink-600",
  "work-safe": "bg-emerald-100 text-emerald-900 border-emerald-600",
  brainrot: "bg-bubblePurple/30 text-purple-900 border-purple-600",
  hype: "bg-bubbleYellow/50 text-amber-900 border-amber-600"
};

export default function SlangCard({ termData, onVote }) {
  const [localTerm, setLocalTerm] = useState(termData);
  const def = localTerm.definitions?.[0] || {};

  const handleVote = async (delta) => {
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          termId: localTerm._id,
          definitionId: def._id,
          delta
        })
      });
      const data = await res.json();
      if (data.success) {
        setLocalTerm(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white neo-border rounded-chunky p-5 sm:p-6 shadow-popLg flex flex-col justify-between transition-transform hover:-translate-y-1">
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-3xl font-black text-chalkDark tracking-tight flex items-center gap-2">
              {localTerm.term}
              <span className="text-sm font-semibold text-slate-500 italic">
                ({def.expansion})
              </span>
            </h3>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full border-2 font-black uppercase ${
              toneColors[def.tone] || toneColors.casual
            }`}
          >
            {def.tone}
          </span>
        </div>

        {/* Meaning */}
        <p className="text-slate-800 font-medium text-base mb-4 leading-relaxed">
          {def.meaning}
        </p>

        {/* Chat Examples */}
        {def.examples && def.examples.length > 0 && (
          <div className="bg-[#F8F9FA] neo-border rounded-2xl p-3 mb-4 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <MessageCircle size={13} /> Chat Context
            </span>
            {def.examples.map((ex, i) => (
              <div
                key={i}
                className={`flex gap-2 text-xs font-semibold ${
                  ex.sender === "A" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`px-3 py-1.5 rounded-2xl neo-border max-w-[85%] ${
                    ex.sender === "A"
                      ? "bg-bubbleYellow rounded-tl-none"
                      : "bg-bubbleBlue text-chalkDark rounded-tr-none"
                  }`}
                >
                  <span className="font-black text-[10px] block opacity-60">
                    User {ex.sender}:
                  </span>
                  {ex.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-3 border-t-2 border-slate-100 mt-2">
        <div className="flex flex-wrap gap-1">
          {localTerm.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Upvote Pill */}
        <div className="flex items-center gap-1.5 bg-slate-50 neo-border rounded-full px-2 py-1 shadow-pop">
          <button
            onClick={() => handleVote(1)}
            className="p-1 hover:text-bubblePink transition-colors"
            title="Upvote"
          >
            <ThumbsUp size={15} />
          </button>
          <span className="text-xs font-black text-chalkDark min-w-[20px] text-center">
            {def.score ?? 0}
          </span>
          <button
            onClick={() => handleVote(-1)}
            className="p-1 hover:text-slate-500 transition-colors"
            title="Downvote"
          >
            <ThumbsDown size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}