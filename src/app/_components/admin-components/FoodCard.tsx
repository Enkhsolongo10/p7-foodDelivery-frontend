"use client";

import { useEffect, useState } from "react";
import { FoodCardProps } from "@/constants/types";
import { EditFoodDialog } from "./EditFoodDialog";
import { Pencil } from "lucide-react";
import { Food } from "@/constants/types";

export function FoodCard({ category }: FoodCardProps) {
  const [foods, setFoods] = useState<Food[]>([]);

  const fetchFoods = async () => {
    if (!category || !category._id) return;
    try {
      const res = await fetch(`http://localhost:8000/food/${category._id}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setFoods(data);
    } catch (error) {
      console.error("Failed to fetch foods", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, [category]);

  return (
    <div className="flex flex-wrap gap-4">
      {foods.map((food) => (
        <div
          key={food._id}
          className="relative border rounded-2xl p-3 w-[270px] h-[241px] shadow-sm group"
        >
          {/* Edit button */}
          <div className="absolute transition bg-white rounded-full right-4 top-[88px]">
            <EditFoodDialog food={food} onUpdated={fetchFoods} />
          </div>

          {/* Food image */}
          <div className="h-[120px] mb-3 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
            <img
              src={food.image}
              alt={food.foodName}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Food details */}
          <div className="flex justify-between items-center mb-1">
            <p className="text-red-600 font-semibold truncate">
              {food.foodName}
            </p>
            <p>${food.price}</p>
          </div>
          <p className="text-xs line-clamp-2">{food.ingredients}</p>
        </div>
      ))}
    </div>
  );
}
