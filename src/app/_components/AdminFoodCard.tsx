"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { AdminEditFoodDialog } from "./AdminEditFoodDialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useAuth } from "@clerk/nextjs";
import { FoodCardProps, Foods } from "@/constants/types";

export function AdminFoodCard({ category }: FoodCardProps) {
  const [foods, setFoods] = useState<Foods[]>([]);
  const [newFoodName, setNewFoodName] = useState("");
  const [newPrice, setPrice] = useState("");
  const [newIngredients, setNewIngredients] = useState("");
  const [newImage, setNewImage] = useState("");
  const { getToken } = useAuth();

  async function getFoods() {
    const token = await getToken();
    if (!token) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${category?._id}`,
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

  async function addFoods() {
    const token = await getToken();
    if (!token) return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/food`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authentication: token,
        },
        body: JSON.stringify({
          foodName: newFoodName,
          price: newPrice,
          ingredients: newIngredients,
          category: category._id,
          image: newImage,
        }),
      }
    );
    const data = await response.json();
    setFoods([...foods, data]);
  }

  useEffect(() => {
    getFoods();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-delivery");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dvedrysvm/upload`,
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
    <div className="flex gap-6 flex-wrap justify-center items-center">
      <Dialog>
        <DialogTrigger className="w-[270px] h-[241px] justify-self-center rounded-[20px] mt-3 border-2 border-[#EF4444] border-dashed border-spacing-[10px]">
          <div className="justify-items-center">
            <div className="rounded-full bg-[#EF4444] text-[12px] text-background w-[40px] h-[40px] flex items-center justify-center mb-2">
              <Plus />
            </div>
            <h1 className="text-[14px]"> Add new Dish to</h1>
            <h2 className="text-[14px]">{category?.categoryName}</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            Add new Dish to {category?.categoryName}
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex gap-6">
            <input
              type="text"
              placeholder="Type dish name"
              onChange={(e) => setNewFoodName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Enter price"
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="List ingredients..."
              onChange={(e) => setNewIngredients(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="relative h-[140px]">
            {newImage && (
              <div className="w-full h-full rounded-lg overflow-hidden object-cover mb-2">
                <img src={newImage} alt="Preview" />
                <button
                  className="absolute top-[10px] left-[410px] rounded-full text-[#EF4444] p-2 w-[44px] h-[44px] z-20"
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
          <DialogFooter>
            <DialogClose
              className="bg-black text-white px-4 py-2 rounded ml-2"
              onClick={() => {
                addFoods();
              }}
            >
              Add Dish
            </DialogClose>
            <DialogClose className="bg-gray-300 text-black px-4 py-2 rounded ml-2">
              Cancel
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {foods &&
        foods.map((food: Foods) => (
          <div
            className="w-[270px] h-[241px] mt-3 rounded-[20px] border-2 border-[#E4E4E7] overflow-hidden shadow-md hover:shadow-lg transition-all relative"
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
  );
}