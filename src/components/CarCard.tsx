"use client";

import { Car } from "@/types/car";
import { formatPrice } from "@/lib/cars";
import Image from "next/image";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-lg hover:ring-gray-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <Image
          src={car.Image}
          alt={`${car.Name} ${car.Model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur-sm">
          {car.Model}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {car.Name}
        </h3>

        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          {car.Location}
        </div>

        <div className="mt-auto pt-3 border-t border-gray-100">
          <p className="text-2xl font-extrabold text-emerald-600">
            {formatPrice(car.Price)}
          </p>
        </div>
      </div>
    </div>
  );
}
