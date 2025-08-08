"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { ImageUpload } from "../common-components/ImageUpload";

type AddFoodDialogProps = {
  categoryId: string;
  categoryName?: string;      // categoryName нэмэв
  onAdd: (food: any) => void;
};

export function AddFoodDialog({ categoryId, categoryName, onAdd }: AddFoodDialogProps) {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");

  async function handleAdd() {
    if (!foodName || !price) return;
    onAdd({
      foodName,
      price,
      ingredients,
      category: categoryId,
      image,
    });
    setFoodName("");
    setPrice("");
    setIngredients("");
    setImage("");
  }

  return (
    <Dialog>
      <DialogTrigger className="w-[270px] h-[241px] justify-self-center rounded-[20px] mt-3 border-2 border-[#EF4444] border-dashed border-spacing-[10px]">
        <div className="justify-items-center">
          <div className="rounded-full bg-[#EF4444] text-[12px] text-background w-[40px] h-[40px] flex items-center justify-center mb-2">
            <Plus />
          </div>
          <h1 className="text-[14px]"> Add new Dish to</h1>
          <h2 className="text-[14px]">{categoryName}</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Add new Dish</DialogHeader>
        <div className="flex gap-6">
          <input
            placeholder="Type dish name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
          <input
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <ImageUpload onUpload={setImage} />
        <DialogFooter>
          <DialogClose
            className="bg-black text-white px-4 py-2 rounded ml-2"
            onClick={handleAdd}
          >
            Add
          </DialogClose>
          <DialogClose className="bg-gray-300 text-black px-4 py-2 rounded ml-2">
            Cancel
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
