"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import type { Foods } from "@/constants/types";

type UpdateFoodInput = {
  id: string;           
  foodName?: string;
  price?: string;
  ingredients?: string;
  categoryId?: string;
  image?: string;
};

export function useUpdateFood() {
  const { getToken } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateFood(updatedFood: UpdateFoodInput): Promise<Foods | null> {
    setIsUpdating(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) {
        setError("No token");
        setIsUpdating(false);
        return null;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${updatedFood.id}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authentication: token,
          },
          body: JSON.stringify({
            foodName: updatedFood.foodName,
            price: updatedFood.price,
            ingredients: updatedFood.ingredients,
            category: updatedFood.categoryId,
            image: updatedFood.image,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update food");

      const updatedData = (await response.json()) as Foods;
      return updatedData;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setIsUpdating(false);
    }
  }

  return { updateFood, isUpdating, error };
}