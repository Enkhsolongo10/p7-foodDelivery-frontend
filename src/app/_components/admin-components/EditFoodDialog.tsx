"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/constants/types";
import { useAuth } from "@clerk/nextjs";
import { useAdminFetch } from "@/hooks/useAdminFetch";

type Props = {
  food: {
    _id: string;
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
    category: string;
  };
};

export function EditFoodDialog({ food }: Props) {
  const [newFoodName, setNewFoodName] = useState<string>(food.foodName);
  const [newFoodIngredients, setNewFoodIngredients] = useState<string>(
    food.ingredients
  );
  const [newCategory, setNewCategory] = useState<string>(food.category);
  const [newPrice, setNewPrice] = useState<number>(food.price);
  const [newImage, setNewImage] = useState<string>(food.image);

  const { getToken } = useAuth();
  const { isLoading, data: categories } = useAdminFetch("food-category");
  if (isLoading) return <div>Loading...</div>;

  async function deleteFoods() {
    const token = await getToken();
    if (!token) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${food._id}`,
      {
        method: "DELETE",
        headers: {
          authentication: token,
        },
      }
    );
    if (response.ok) {
    } else {
      ("error");
    }
  }

  async function editFoods() {
    const token = await getToken();
    if (!token) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${food._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authentication: token,
        },
        body: JSON.stringify({
          foodName: newFoodName,
          price: newPrice,
          ingredients: newFoodIngredients,
          category: newCategory,
          image: newImage,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
    } else {
      console.error("Failed to update the food item");
    }
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-delivery");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dpyjpkzqg/upload`,
          { method: "POST", body: data }
        );

        const dataJson = await response.json();
        console.log("Cloudinary Response:", dataJson);

        if (dataJson.secure_url) {
          setNewImage(dataJson.secure_url);
        } else {
          console.error("Image upload failed:", dataJson);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="absolute top-[80px] left-[200px] rounded-full bg-white text-[#EF4444] p-2 hover:bg-[#EF4444] hover:text-white"
          onClick={() => {
            setNewFoodName(food.foodName);
            setNewFoodIngredients(food.ingredients);
            setNewCategory(food.category);
            setNewPrice(food.price);
            setNewImage(food.image);
          }}
        >
          <Pencil />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Food</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <input
            defaultValue={newFoodName}
            onChange={(e) => setNewFoodName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Food Name"
          />
          <input
            defaultValue={newFoodIngredients}
            onChange={(e) => setNewFoodIngredients(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingredients"
          />
          <Select value={newCategory} onValueChange={setNewCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              {categories &&
                categories.map((category: Category) => (
                  <SelectItem value={category._id} key={category?._id}>
                    {category?.categoryName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <input
            defaultValue={newPrice}
            onChange={(e) => setNewPrice(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Price"
          />
          <div className="relative h-[140px]">
            {newImage && (
              <div className="w-full h-full rounded-lg overflow-hidden object-cover mb-2">
                <img src={newImage} alt="Preview" />
                <button
                  className="absolute top-[8px] left-[410px] rounded-full text-[#EF4444] p-2 w-[44px] h-[44px] z-20"
                  onClick={() => {
                    setNewImage("");
                  }}
                >
                  <img
                    src="/assets/BookingButton.svg"
                    alt="logo"
                    className="object-cover w-full h-full"
                  />
                </button>
              </div>
            )}
            <input
              type="file"
              onChange={(e) => handleUpload(e)}
              className="w-full h-[140px] p-2 border border-blue-300 border-dashed rounded-lg opacity-0 cursor-pointer absolute top-0 left-0 z-10"
            />
            {!newImage && (
              <div className="w-full h-[140px] bg-blue-100 p-2 border border-blue-400 border-dashed rounded-lg absolute top-0 left-0 z-0 flex flex-col items-center justify-center">
                <img
                  src="/assets/Import.svg"
                  alt="Preview"
                  className="w-10 h-10 object-cover rounded-full bg-white"
                />
                <p>Choose a file or drag & drop it here</p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                deleteFoods();
              }}
            >
              <Trash2 />
            </button>
          </DialogClose>
          <DialogClose
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
            onClick={async () => {
              await editFoods();
            }}
          >
            Save
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
