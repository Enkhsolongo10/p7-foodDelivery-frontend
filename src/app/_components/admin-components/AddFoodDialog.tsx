"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { FoodCardProps } from "@/constants/types";
import { IoAddSharp } from "react-icons/io5";
import { useState } from "react";
import { ImageUpload } from "./ImageUpload";

export function AddFoodDialog({
  category,
  onFoodAdded,
}: FoodCardProps & { onFoodAdded?: () => void }) {
  const [newFoodName, setNewFoodName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newIngredients, setNewIngredients] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const newErrors: { [key: string]: string } = {};

    if (!newFoodName.trim()) {
      newErrors.foodName = "Dish name is required.";
    } else if (!/^[a-zA-Z0-9\s\-]+$/.test(newFoodName)) {
      newErrors.foodName = "Dish name contains invalid characters.";
    }
    if (!newPrice.trim()) {
      newErrors.price = "Price is required.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(newPrice) || Number(newPrice) <= 0) {
      newErrors.price = "Price must be a positive number (max 2 decimals).";
    }
    if (newIngredients && !/^[a-zA-Z0-9\s,.\-()]+$/.test(newIngredients)) {
      newErrors.ingredients = "Ingredients contain invalid characters.";
    }
    if (
      newImageUrl &&
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(newImageUrl)
    ) {
      newErrors.image = "Image URL must be a valid image link.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function addFood() {
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodName: newFoodName,
          price: Number(newPrice),
          ingredients: newIngredients,
          category,
          image: newImageUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add food");
      }

      setNewFoodName("");
      setNewPrice("");
      setNewIngredients("");
      setNewImageUrl("");
      setErrors({});

      if (onFoodAdded) onFoodAdded();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="border-2 border-dashed border-red-600 rounded-2xl p-4 w-[270px] h-[241px] flex flex-col items-center justify-center cursor-pointer">
            <button className="bg-[#EF4444] w-[36px] h-[36px] bg-red-600 text-white rounded-full items-center justify-center flex text-2xl">
              <IoAddSharp />
            </button>
            <div className="mt-2 text-sm">
              <span>Add new Dish</span>
              <p className="flex justify-center">{category.categoryName}</p>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="w-[460px] p-8 rounded-xl">
          <DialogTitle className="text-xl font-semibold mb-4">
            Add new Dish to {category.categoryName}
          </DialogTitle>
          <div className="flex justify-between items-center">
            <div className="w-[184px]">
              <p className="text-[14px]">Food name</p>
              <input
                type="text"
                placeholder="Type food name..."
                value={newFoodName}
                onChange={(e) => setNewFoodName(e.target.value)}
                className={`w-full p-2 border rounded mb-1 text-[14px] ${
                  errors.foodName ? "border-red-600" : "border-gray-300"
                }`}
                disabled={loading}
              />
              {errors.foodName && (
                <p className="text-red-600 text-sm mb-2">{errors.foodName}</p>
              )}
            </div>
            <div className="w-[184px]">
              <p className="text-[14px]">Food price</p>
              <input
                type="number"
                placeholder="Enter price..."
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className={`w-full text-[14px] p-2 border rounded mb-1 ${
                  errors.price ? "border-red-600" : "border-gray-300"
                }`}
                disabled={loading}
              />
              {errors.price && (
                <p className="text-red-600 text-sm mb-2">{errors.price}</p>
              )}
            </div>
          </div>
          <div>
            <p className="text-[14px]">Ingredients</p>
            <textarea
              placeholder="List ingredients..."
              value={newIngredients}
              onChange={(e) => setNewIngredients(e.target.value)}
              className={`w-full p-2 border rounded mb-1 text-[14px] ${
                errors.ingredients ? "border-red-600" : "border-gray-300"
              }`}
              disabled={loading}
            />
            {errors.ingredients && (
              <p className="text-red-600 text-sm mb-2">{errors.ingredients}</p>
            )}
          </div>
          <div>
            <p className="text-[14px]">Food image</p>
            <ImageUpload onUpload={setNewImageUrl} />
          </div>

          <DialogFooter className="flex justify-end gap-3">
            <DialogClose asChild>
              <button className="bg-gray-300 px-4 py-2 rounded" disabled={loading}>
                Cancel
              </button>
            </DialogClose>
            <button
              onClick={addFood}
              className="bg-black text-white px-4 py-2 rounded cursor-pointer"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}