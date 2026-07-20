"use client";

import { useState, useEffect, useRef } from "react";
import { searchBrands } from "@/services/brands.service";
import { Check, ChevronsUpDown, Search } from "lucide-react";

export function BrandSelector({ defaultBrandId }: { defaultBrandId?: number | null }) {
  const [hasBrand, setHasBrand] = useState(defaultBrandId != null);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(defaultBrandId ?? null);
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: number; name: string }[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    if (!hasBrand) return;
    
    const timeoutId = setTimeout(async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }
      const brands = await searchBrands(query);
      setResults(brands);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, hasBrand]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden input to pass value to the parent form */}
      <input type="hidden" name="brand_id" value={hasBrand && selectedBrandId ? selectedBrandId : ""} />

      <label className="flex items-center gap-2 text-sm text-ink-muted">
        <input
          type="checkbox"
          className="size-4 rounded border-border text-brand focus:ring-brand"
          checked={hasBrand}
          onChange={(e) => {
            setHasBrand(e.target.checked);
            if (!e.target.checked) {
              setSelectedBrandId(null);
              setQuery("");
            }
          }}
        />
        Item has a brand
      </label>

      {hasBrand && (
        <div className="relative" ref={dropdownRef}>
          <div className="relative flex items-center">
            <Search className="absolute left-3 size-4 text-ink-muted" />
            <input
              type="text"
              className="field pl-9"
              placeholder="Search for a brand..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />
          </div>

          {isDropdownOpen && results.length > 0 && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-border bg-white p-1 shadow-lg">
              {results.map((brand) => (
                <button
                  key={brand.id}
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-soft/50"
                  onClick={() => {
                    setSelectedBrandId(brand.id);
                    setQuery(brand.name);
                    setIsDropdownOpen(false);
                  }}
                >
                  <span className="font-medium text-brand">{brand.name}</span>
                  {selectedBrandId === brand.id && <Check className="size-4 text-brand" />}
                </button>
              ))}
            </div>
          )}
          
          {isDropdownOpen && query.trim() !== "" && results.length === 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-xl border border-border bg-white px-3 py-4 text-center text-sm text-ink-muted shadow-lg">
              No brands found matching "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
