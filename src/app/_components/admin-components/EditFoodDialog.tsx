"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import { Food } from "@/constants/types";

type Props = {
  food: Food;
  onUpdated?: () => void; // амжилттай үед эцэг component-оо сэргээх callback
};

export function EditFoodDialog({ food, onUpdated }: Props) {
  const [open, setOpen] = useState(false);

  const [newFoodName, setNewFoodName] = useState(food.foodName);
  const [newFoodIngredients, setNewFoodIngredients] = useState(food.ingredients);
  const [newCategory, setNewCategory] = useState(food.category);
  const [newPrice, setNewPrice] = useState(food.price);
  const [newImage, setNewImage] = useState(food.image);

  function resetState() {
    setNewFoodName(food.foodName);
    setNewFoodIngredients(food.ingredients);
    setNewCategory(food.category);
    setNewPrice(food.price);
    setNewImage(food.image);
  }

  async function deleteFoods() {
    try {
      const res = await fetch(`http://localhost:8000/food/${food._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete food");
      setOpen(false);
      onUpdated?.(); // refresh
    } catch (error) {
      console.error(error);
      alert("Failed to delete food");
    }
  }

  async function editFoods() {
    try {
      const res = await fetch(`http://localhost:8000/food/${food._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodName: newFoodName,
          ingredients: newFoodIngredients,
          category: newCategory,
          price: newPrice,
          image: newImage,
        }),
      });
      if (!res.ok) throw new Error("Failed to update food");
      setOpen(false);
      onUpdated?.(); // refresh
    } catch (error) {
      console.error(error);
      alert("Failed to update food");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) resetState();
      }}
    >
      <DialogTrigger asChild>
        <button
          className="p-2 text-gray-500 hover:text-red-600"
          aria-label="Edit food"
        >
          <Pencil />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Food</DialogTitle>
          <DialogDescription>Change the fields and click save.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-3">
          <input
            value={newFoodName}
            onChange={(e) => setNewFoodName(e.target.value)}
            placeholder="Food Name"
            className="border rounded p-2"
          />
          <input
            value={newFoodIngredients}
            onChange={(e) => setNewFoodIngredients(e.target.value)}
            placeholder="Ingredients"
            className="border rounded p-2"
          />
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category"
            className="border rounded p-2"
          />
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            placeholder="Price"
            className="border rounded p-2"
          />
          <input
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="Image URL"
            className="border rounded p-2"
          />
        </div>

        <DialogFooter className="mt-4 flex justify-between">
          <button
            onClick={deleteFoods}
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Trash2 size={16} /> Delete
          </button>
          <button
            onClick={editFoods}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
