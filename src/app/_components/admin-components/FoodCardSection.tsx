"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Category } from "@/constants/types";
import { FoodCard } from "./FoodCard";
import { AddFoodDialog } from "./AddFoodDialog";

export function FoodCardSection() {
  const { getToken } = useAuth();
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    async function fetchCategories() {
      setIsLoading(true);
      const token = await getToken();
      if (!token) return;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food-category`,
        {
          headers: {
            "Content-Type": "application/json",
            authentication: token,
          },
        }
      );
      const data = await res.json();
      setCategories(data);
      setIsLoading(false);
    }

    fetchCategories();
  }, [getToken]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {categories &&
        categories.map((category: Category) => (
          <div
            key={category._id}
            className="pt-5 pb-6 px-8 flex rounded-lg bg-white mt-[24px] w-[1219px] flex-col items-start gap-3"
          >
            <div className="text-lg font-semibold">{category.categoryName}</div>
            <div className="flex gap-4">
              <AddFoodDialog category={category} />
              <FoodCard category={category} />
            </div>
          </div>
        ))}
    </div>
  );
}
