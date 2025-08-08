"use client";
import { useEffect, useState } from "react";
import { FoodCardProps, Foods } from "@/constants/types";
import { AddFoodDialog } from "./AddFoodDialog";
import { useAuth } from "@clerk/nextjs";
import { useAddFood } from "@/hooks/useAddFood";
import { EditFoodDialog } from "./EditFoodDialog";

export function FoodCard({ category }: FoodCardProps) {
  const [foods, setFoods] = useState<Foods[]>([]);
  const { getToken } = useAuth();
  const { addFood } = useAddFood();

  async function fetchFoods() {
    const token = await getToken();
    if (!token) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${category._id}`, {
      headers: { authentication: token },
    });
    const data = await res.json();
    setFoods(data);
  }

  useEffect(() => {
    if (category?._id) fetchFoods();
  }, [category]);

  async function handleAdd(food: { foodName: string; price: string; ingredients: string; image: string }) {
    const createdFood = await addFood({ ...food, categoryId: category._id });
    if (createdFood) setFoods((prev) => [...prev, createdFood]);
  }

  return (
    <div className="flex flex-wrap gap-6 justify-center items-center">
      <AddFoodDialog categoryId={category._id} onAdd={handleAdd} />

      {foods.map((food) => (
        <div
          key={food._id}
          className="w-[270px] h-[241px] mt-3 rounded-[20px] border-2 border-[#E4E4E7] overflow-hidden shadow-md hover:shadow-lg transition-all relative"
        >
          <div className="w-[90%] h-[120px] rounded-lg overflow-hidden mt-[10px] ml-[13px]">
            <img src={food.image} alt={food.foodName} className="object-cover w-full h-full" />
          </div>
          <div className="p-4 h-[90px]">
            <div className="flex justify-between">
              <p className="text-md font-semibold text-[#EF4444] truncate">{food.foodName}</p>
              <p className="text-sm text-gray-500">${food.price}</p>
            </div>
            <p className="text-[12px] text-gray-600 line-clamp-2">{food.ingredients}</p>
          </div>
          <EditFoodDialog food={food} />
        </div>
      ))}
    </div>
  );
}
