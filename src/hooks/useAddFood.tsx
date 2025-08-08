"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import type { Foods } from "@/constants/types";

type AddFoodInput = {
  foodName: string;
  price: string;
  ingredients: string;
  categoryId: string;
  image?: string;
};

export function useAddFood() {
  const { getToken } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addFood(newFood: AddFoodInput): Promise<Foods | null> {
    setIsAdding(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) {
        setError("No token");
        setIsAdding(false);
        return null;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authentication: token,
        },
        body: JSON.stringify({
          foodName: newFood.foodName,
          price: newFood.price,
          ingredients: newFood.ingredients,
          category: newFood.categoryId,
          image: newFood.image,
        }),
      });

      if (!response.ok) throw new Error("Failed to add food");

      const createdFood = (await response.json()) as Foods;
      return createdFood;
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setIsAdding(false);
    }
  }

  return { addFood, isAdding, error };
}