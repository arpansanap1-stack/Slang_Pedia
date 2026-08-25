"use client";

import { useEffect, useState } from "react";
import Header from "@/componenets/Header";
import SlangCard from "@/componenets/SlangCard";
import SlangDecoder from "@/componenets/SlangDecoder";
import AddTermModal from "@/componenets/AddTermModal";
import { Search, Flame, Shuffle } from "lucide-react";

export default function Home() {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [activeTab, setActiveTab] = useState("dict");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchTerms();
  }, [selectedTag]);

  const fetchTerms = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = selectedTag === "all" ? "/api/terms" : `/api/terms?tag=${selectedTag}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setTerms(data.data);
      } else {
        setError(data.error || "Something went wrong loading terms.");
      }
    } catch (err) {
      console.error(err);
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredTerms = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.definitions?.[0]?.expansion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen pb-16 px-4">
      <Header
        onOpenAddModal={() => setIsAddModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="max-w-5xl mx-auto mt-4">
        {activeTab === "decoder" ? (
          <SlangDecoder />
        ) : (
          <>
            {/* Playful Hero Banner */}
            <section className="bg-bubbleYellow neo-border rounded-chunky p-6 sm:p-10 shadow-popLg mb-8 text-center relative overflow-hidden">
              <div className="absolute top-2 right-4 text-4xl opacity-40 rotate-12">💬</div>
              <div className="absolute bottom-2 left-4 text-4xl opacity-40 -rotate-12">🚀</div>
              
              <h2 className="text-3xl sm:text-5xl font-black text-chalkDark tracking-tight mb-3">
                Decipher the Internet, <br />
                <span className="text-bubblePink bg-white px-2 py-0.5 rounded-2xl neo-border inline-block rotate-1 shadow-pop">
                  One Word at a Time.
                </span>
              </h2>
              <p className="text-sm sm:text-base font-bold text-slate-700 max-w-xl mx-auto mb-6">
                The community-powered dictionary for texting acronyms, Gen-Z lingo, and chat slang.
              </p>

              {/* Search Bar Input */}
              <div className="max-w-xl mx-auto relative">
                <input
                  type="text"
                  placeholder="Search slang (e.g. ngl, cooked, fr, yap)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-4 neo-border rounded-full shadow-pop text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-bubblePurple"
                />
                <Search size={18} className="absolute left-4 top-4 text-slate-400" />
              </div>
            </section>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-black uppercase text-slate-400 mr-1 flex items-center gap-1">
                  <Flame size={14} className="text-amber-500" /> Filter:
                </span>
                {["all", "chat", "gen-z", "gaming", "tiktok"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`text-xs font-black px-3.5 py-1.5 rounded-full neo-border capitalize transition-all ${
                      selectedTag === tag
                        ? "bg-chalkDark text-white shadow-pop"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              <span className="text-xs font-black text-slate-500">
                {filteredTerms.length} terms logged
              </span>
            </div>

            {/* Grid of Slang Cards */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white neo-border rounded-chunky p-6 shadow-pop animate-pulse space-y-3"
                  >
                    <div className="h-6 w-2/3 bg-slate-200 rounded-full" />
                    <div className="h-3 w-full bg-slate-100 rounded-full" />
                    <div className="h-3 w-5/6 bg-slate-100 rounded-full" />
                    <div className="h-16 w-full bg-slate-100 rounded-2xl" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-white neo-border rounded-chunky p-12 text-center shadow-pop">
                <p className="text-lg font-black text-chalkDark mb-2">⚠️ Couldn't load the lexicon</p>
                <p className="text-xs font-bold text-slate-500 mb-4">{error}</p>
                <button
                  onClick={fetchTerms}
                  className="neo-btn bg-bubbleBlue font-black px-4 py-2 rounded-full shadow-pop text-xs"
                >
                  Try Again
                </button>
              </div>
            ) : filteredTerms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredTerms.map((term) => (
                  <SlangCard key={term._id} termData={term} />
                ))}
              </div>
            ) : (
              <div className="bg-white neo-border rounded-chunky p-12 text-center shadow-pop">
                <p className="text-lg font-black text-slate-700 mb-2">
                  {searchQuery ? `No slang found for "${searchQuery}"` : "No terms logged yet"}
                </p>
                <p className="text-xs font-bold text-slate-500 mb-4">Be the first legend to add it to the lexicon!</p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="neo-btn bg-bubbleGreen font-black px-4 py-2 rounded-full shadow-pop text-xs"
                >
                  + Add this Term
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AddTermModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onTermAdded={(newTerm) => setTerms([newTerm, ...terms])}
      />
    </main>
  );
}