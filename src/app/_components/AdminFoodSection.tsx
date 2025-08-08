"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useAuthFetch } from "./useFetchData";
import { AdminFoodCard } from "./AdminFoodCard";
import { Category } from "@/constants/types";

export function AdminFoodSection() {
  const { getToken } = useAuth();
  const { isLoading, data: categories } = useAuthFetch("food-category");
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {categories &&
        categories.map((category: Category) => (
          <div
            key={category?._id}
            className="p-5 flex justify-start rounded-lg bg-white mt-[24px] w-[1219px] flex-col items-start gap-3"
          >
            <div>
              <div className="text-lg font-semibold">{category?.categoryName}</div>
              <AdminFoodCard category={category} />
            </div>
          </div>
        ))}
    </div>
  );
}