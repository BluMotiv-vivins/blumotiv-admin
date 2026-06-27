import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import { api } from "../../shared/api";
import { C, FONT, R, SHADOW } from "../../shared/tokens";

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  path: string;
}

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query || query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/v1/admin/search?q=${encodeURIComponent(query)}`);
        setResults(response.data.results || []);
        setIsOpen(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (item: SearchResult) => {
    setIsOpen(false);
    setQuery("");
    navigate(item.path);
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "400px" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "8px", 
        background: C.offWhite, padding: "8px 16px", borderRadius: R.full, 
        border: `1px solid ${C.border}`
      }}>
        {loading ? (
          <Loader2 size={18} color={C.slate} style={{ animation: "spin 1s linear infinite" }} />
        ) : (
          <Search size={18} color={C.slate} />
        )}
        <input 
          type="text" 
          placeholder="Global search (users, machines, leads, disputes)..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query.length >= 2) setIsOpen(true); }}
          style={{ 
            border: "none", background: "transparent", width: "100%", 
            color: C.navy, fontSize: "14px", fontFamily: FONT.base, outline: "none"
          }}
        />
      </div>

      {isOpen && (
        <div style={{
          position: "absolute", top: "45px", left: 0, width: "100%",
          background: C.white, borderRadius: R.md, boxShadow: SHADOW.cardHov,
          border: `1px solid ${C.border}`, zIndex: 100, maxHeight: "400px", overflowY: "auto",
          padding: "8px 0"
        }}>
          {results.length === 0 ? (
            <div style={{ padding: "16px", textAlign: "center", color: C.slate, fontSize: "14px" }}>
              No results found for "{query}"
            </div>
          ) : (
            results.map((res) => (
              <div 
                key={`${res.category}-${res.id}`}
                onClick={() => handleSelect(res)}
                style={{
                  padding: "12px 16px", borderBottom: `1px solid ${C.offWhite}`,
                  cursor: "pointer", transition: "background 0.2s",
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.offWhite)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div>
                  <div style={{ color: C.navy, fontWeight: 600, fontSize: "14px" }}>{res.title}</div>
                  <div style={{ color: C.slate, fontSize: "12px", marginTop: "2px" }}>{res.subtitle}</div>
                </div>
                <div style={{
                  background: C.navyLight, color: C.white, fontSize: "10px", 
                  fontWeight: 600, padding: "3px 8px", borderRadius: R.full, textTransform: "uppercase"
                }}>
                  {res.category}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
