// app/_components/_admin-components/FoodList.tsx
import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard"; // adjust the path if needed
import { Food } from "@/constants/types";

export default function FoodList() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await fetch("http://localhost:8000/food");

        if (!res.ok) {
          throw new Error("Failed to fetch foods");
        }

        const data = await res.json();

        console.log("Fetched data:", data);

        // Adjust this depending on your actual API response
        // If data = { foods: [...] }, then use:
        // setFoods(data.foods);
        // If data = [...], use:
        setFoods(data);

      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchFoods();
  }, []);

  if (loading) {
    return <p>Loading foods...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}
