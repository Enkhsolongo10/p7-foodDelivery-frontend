"use client";

import { useEffect, useState } from "react";
import { AddFoodDialog } from "./AddFoodDialog";
import { FoodCardProps } from "@/constants/types";
import { EditFoodDialog } from "./EditFoodDialog";


type Food = {
  _id: string;
  foodName: string;
  price: number;
  ingredients?: string;
  image?: string;
};

export function FoodCard({ category }: FoodCardProps) {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    if (!category || !category._id) return; // category бүрэн ирээгүй бол fetch хийхгүй

    const fetchFoods = async () => {
      try {
        const res = await fetch(`http://localhost:8000/food/${category._id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setFoods(data);
      } catch (error) {
        console.error("Failed to fetch foods", error);
      }
    };

    fetchFoods();
  }, [category]);

  return (
    <div className="mt-2 bg-white rounded-xl w-[1171px] flex gap-5 flex-wrap">
      <div className="flex flex-wrap gap-5">
        <AddFoodDialog category={category} />
        {foods.map((food) => (
          <div
            key={food._id}
            className="border rounded-2xl p-3 w-[270px] h-[241px] shadow-sm"
          >
            <div className="h-[120px] mb-3 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
              <img
                src={food.image}
                alt={food.foodName}
                className="object-cover w-full h-full"
              />
              {/* <EditFoodDialog food={food} /> */}
            </div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-red-500 font-semibold truncate">
                {food.foodName}
              </p>
              <p className="">${food.price}</p>
            </div>
            <p className="text-xs line-clamp-2">{food.ingredients}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
