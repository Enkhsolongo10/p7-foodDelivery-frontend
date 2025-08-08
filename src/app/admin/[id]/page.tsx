"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { AdminEditFoodDialog } from "@/app/_components/AdminEditFoodDialog";
import { Foods } from "@/constants/types";
import { AdminFoodCategory } from "@/app/_components/AdminFoodCategory";
import AdminSidebar from "@/app/_components/AdminSideBar"; 

export default function CategoryPage() {
  const { getToken } = useAuth();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const query: string | null = searchParams.get("category");
  const [foods, setFoods] = useState<Foods[]>([]);

  useEffect(() => {
    async function fetchFoods() {
      const token = await getToken();
      if (!token) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            authentication: token,
          },
        }
      );
      const data = await response.json();
      setFoods(data);
    }
    if (query) fetchFoods();
  }, [query]);

  return (
    <AdminSidebar >
      <AdminFoodCategory />
      <div className="p-6 rounded-lg bg-white mt-[84px]">
        <h2 className="text-xl font-bold">Category dishes</h2>
        <Link href="/admin">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
            Back to Categories
          </button>
        </Link>
        <div className="flex flex-wrap justify-center gap-4 mt-4 mx-auto">
          {foods &&
            foods.map((food: Foods) => (
              <div
                className="w-[270px] h-[250px] rounded-lg border-2 border-[#E4E4E7] overflow-hidden shadow-md hover:shadow-lg transition-all relative"
                key={food?._id}
              >
                <div className="w-[90%] h-[120px] rounded-lg overflow-hidden mt-[10px] ml-[13px]">
                  <img
                    src={food?.image}
                    alt="food photo"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 h-[90px]">
                  <div className="flex justify-between">
                    <p className="text-md font-semibold text-[#EF4444] truncate">
                      {food?.foodName}
                    </p>
                    <p className="text-sm text-gray-500">${food?.price}</p>
                  </div>

                  <p className="text-[12px] text-gray-600 line-clamp-2">
                    {food?.ingredients}
                  </p>
                </div>
                <AdminEditFoodDialog food={food} />
              </div>
            ))}
        </div>
      </div>
    </AdminSidebar >
  );
}