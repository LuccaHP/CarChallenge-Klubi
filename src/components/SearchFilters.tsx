"use client";

import { useCallback, useEffect, useState } from "react";

interface SearchFiltersProps {
  locations: string[];
  priceRange: { min: number; max: number };
  onFilter: (filters: {
    query: string;
    minPrice: number;
    maxPrice: number;
    location: string;
  }) => void;
}

export default function SearchFilters({
  locations,
  priceRange,
  onFilter,
}: SearchFiltersProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState(priceRange.max);

  const applyFilters = useCallback(() => {
    onFilter({
      query,
      minPrice: priceRange.min,
      maxPrice,
      location,
    });
  }, [query, maxPrice, location, priceRange.min, onFilter]);

  useEffect(() => {
    const timer = setTimeout(applyFilters, 300);
    return () => clearTimeout(timer);
  }, [applyFilters]);

  function formatCompact(value: number): string {
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return String(value);
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Buscar
        </label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex: BYD Dolphin, Civic..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      <div className="sm:w-48">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Localidade
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-3 pr-8 text-sm text-gray-900 outline-none transition-colors focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="">Todas</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:w-56">
        <label className="mb-1.5 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-gray-500">
          <span>Preço máximo</span>
          <span className="text-emerald-600 normal-case">
            R$ {formatCompact(maxPrice)}
          </span>
        </label>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          step={5000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-emerald-600"
        />
      </div>
    </div>
  );
}
