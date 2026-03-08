"use client";

import { useCallback, useState } from "react";
import { getCars, filterCars, getLocations, getPriceRange } from "@/lib/cars";
import { Car } from "@/types/car";
import SearchFilters from "@/components/SearchFilters";
import CarGrid from "@/components/CarGrid";
import ChatButton from "@/components/Chatbot/ChatButton";
import ChatPopup from "@/components/Chatbot/ChatPopup";

const allCars = getCars();
const locations = getLocations();
const priceRange = getPriceRange();

export default function Home() {
  const [cars, setCars] = useState<Car[]>(allCars);
  const [chatOpen, setChatOpen] = useState(false);

  const handleFilter = useCallback(
    (filters: {
      query: string;
      minPrice: number;
      maxPrice: number;
      location: string;
    }) => {
      const result = filterCars({
        query: filters.query || undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        location: filters.location || undefined,
      });
      setCars(result);
    },
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="sticky top-0 z-30 border-b border-gray-200/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-lg">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">
                Lucca - AutoFind
              </h1>
              <p className="text-xs text-gray-500">Seu carro ideal</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="hidden sm:inline">
              {allCars.length} veículos disponíveis
            </span>
            <span className="inline-flex h-6 items-center rounded-full bg-emerald-50 px-2 text-xs font-medium text-emerald-700">
              {cars.length} encontrados
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-extrabold text-gray-900">
            Encontre seu próximo carro
          </h2>
          <p className="text-gray-500">
            Busque por nome, modelo ou localidade. Use o chat para perguntas
            mais complexas.
          </p>
        </div>

        <div className="mb-8">
          <SearchFilters
            locations={locations}
            priceRange={priceRange}
            onFilter={handleFilter}
          />
        </div>

        <CarGrid cars={cars} />
      </main>

      <ChatPopup open={chatOpen} onClose={() => setChatOpen(false)} />
      <ChatButton onClick={() => setChatOpen((prev) => !prev)} open={chatOpen} />
    </div>
  );
}
