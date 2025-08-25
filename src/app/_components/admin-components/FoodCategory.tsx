"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { IoAddSharp } from "react-icons/io5";
import { Category } from "@/constants/types";

type FoodCategoryProps = {
  onCategoryClick: (categoryName: string) => void;
};

export function FoodCategory({ onCategoryClick }: FoodCategoryProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [value, setValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/food-category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchData();
  }, []);

  const addCategory = async (value: string) => {
    try {
      await fetch("http://localhost:8000/food-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: value }),
      });
      setValue("");

      const updated = await fetch("http://localhost:8000/food-category");
      const data = await updated.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <div className="bg-white pt-5 pb-6 px-8 w-[1219px] rounded-xl flex flex-col justify-center items-start gap-3">
      <p className="text-lg font-semibold h-[28px]">Dishes Category</p>
      <div className="text-sm font-medium flex flex-wrap gap-3">
        {categories.map((category) => (
          <Badge
            key={category._id}
            className="hover:bg-red-600 px-3 text-black hover:border-black hover:text-whi h-[36px] rounded-full bg-white border-[1px] border-[#E4E4E7] cursor-pointer"
            onClick={() => onCategoryClick(category.categoryName)}
          >
            {category.categoryName}
          </Badge>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-red-600 w-[36px] h-[36px] text-white rounded-full items-center justify-center flex text-2xl">
              <IoAddSharp />
            </button>
          </DialogTrigger>

          <DialogContent className="w-[460px] h-[272px] p-8 rounded-xl">
            <DialogTitle className="font-semibold text-xl">
              Add new category
            </DialogTitle>

            <DialogTitle className="mb-1 text-[16px]">Category name</DialogTitle>
            <input
              className="text-sm -mt-10 h-[38px] p-1 border border-1 border-[#E4E4E7] rounded-md hover:border hover:border-black"
              type="text"
              placeholder="Type category name..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="flex justify-end">
              <button
                onClick={() => addCategory(value)}
                className="-mb-9 bg-black p-2 rounded-xl text-white w-[123px] h-[40px]"
              >
                Add category
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}