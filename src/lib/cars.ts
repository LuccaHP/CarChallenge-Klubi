import carsData from "@/data/cars.json";
import { Car } from "@/types/car";

const cars: Car[] = carsData;

export function getCars(): Car[] {
  return cars;
}

export function searchCars(query: string): Car[] {
  const q = query.toLowerCase().trim();
  if (!q) return cars;

  return cars.filter(
    (car) =>
      car.Name.toLowerCase().includes(q) ||
      car.Model.toLowerCase().includes(q) ||
      car.Location.toLowerCase().includes(q)
  );
}

export function filterCars(filters: {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
}): Car[] {
  let result = cars;

  if (filters.query) {
    const q = filters.query.toLowerCase().trim();
    result = result.filter(
      (car) =>
        car.Name.toLowerCase().includes(q) ||
        car.Model.toLowerCase().includes(q)
    );
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((car) => car.Price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((car) => car.Price <= filters.maxPrice!);
  }

  if (filters.location) {
    const loc = filters.location.toLowerCase().trim();
    result = result.filter((car) => car.Location.toLowerCase().includes(loc));
  }

  return result;
}

export function getLocations(): string[] {
  return [...new Set(cars.map((car) => car.Location))].sort();
}

const FILTER_MAX_PRICE = 200_000;

export function getPriceRange(): { min: number; max: number } {
  const prices = cars.map((car) => car.Price);
  return {
    min: Math.min(...prices),
    max: FILTER_MAX_PRICE,
  };
}

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
