"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

export function SearchBar({ compact = false, suggestions = [] }: { compact?: boolean, suggestions?: string[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <form
      role="search"
      className={`relative w-full ${compact ? "max-w-none" : "max-w-2xl"}`}
      onSubmit={(event) => { event.preventDefault(); router.push(`/search?query=${encodeURIComponent(query.trim())}`); }}
    >
      <label htmlFor={compact ? "mobile-store-search" : "store-search"} className="sr-only">Search products</label>
      <InputGroup className="h-12 rounded-full border-brand/15 bg-surface-muted px-1.5 shadow-none focus-within:bg-white">
        <InputGroupInput id={compact ? "mobile-store-search" : "store-search"} value={query} onChange={(event) => setQuery(event.target.value)} list="product-search-suggestions" placeholder="What are you looking for?" className="h-11 pl-3 text-sm font-medium text-brand placeholder:text-ink-muted" />
        <InputGroupButton type="submit" size="icon-sm" className="size-9 rounded-full bg-brand text-white hover:bg-brand-strong" aria-label="Submit search"><Search className="size-4.5" /></InputGroupButton>
      </InputGroup>
      <datalist id="product-search-suggestions">
        {suggestions.map((suggestion) => <option value={suggestion} key={suggestion} />)}
      </datalist>
    </form>
  );
}
