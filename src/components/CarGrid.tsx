"use client";

import { Car } from "@/types/car";
import CarCard from "./CarCard";

interface CarGridProps {
  cars: Car[];
  loading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 animate-pulse">
      <div className="aspect-[16/10] bg-gray-200" />
      <div className="flex flex-col gap-3 p-5">Ï
        <div className="h-5 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="h-7 w-2/3 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function CarGrid({ cars, loading }: CarGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg
          className="mb-4 h-16 w-16 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-600">
          Nenhum carro encontrado
        </h3>
        <p className="mt-1 text-sm text-gray-400">
          Tente ajustar os filtros ou use o chat para pedir sugestões
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car, index) => (
        <CarCard key={`${car.Name}-${car.Location}-${index}`} car={car} />
      ))}
    </div>
  );
}
