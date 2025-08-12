"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Category } from "@/constants/types";
import { useAdminFetch } from "@/hooks/useAdminFetch";
import { FoodCard } from "./FoodCard";

export function FoodCardSection() {
  const { getToken } = useAuth();
  const { isLoading, data: categories } = useAdminFetch("food-category");
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {categories &&
        categories.map((category: Category) => (
          <div
            key={category?._id}
            className="pt-5 pb-6 px-8 flex rounded-lg bg-white mt-[24px] w-[1219px] flex-col items-start gap-3"
          >
            <div>
              <div className="text-lg font-semibold">{category?.categoryName}</div>
              <FoodCard category={category} />
            </div>
          </div>
        ))}
    </div>
  );
}