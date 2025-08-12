import { useState } from "react";
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

type Props = {
  food: {
    _id: string;
    foodName: string;
    price: number;
    image: string;
    ingredients: string;
    category: string;
  };
  onClose?: () => void;  // Dialog хаагдах үед эцэгт мэдэгдэх боломж
};

export function EditFoodDialog({ food, onClose }: Props) {
  const [open, setOpen] = useState(false);
  const [newFoodName, setNewFoodName] = useState(food.foodName);
  const [newFoodIngredients, setNewFoodIngredients] = useState(food.ingredients);
  const [newCategory, setNewCategory] = useState(food.category);
  const [newPrice, setNewPrice] = useState(food.price);
  const [newImage, setNewImage] = useState(food.image);

  // Таны categories-г авах кодыг энд нэмнэ үү

  function resetState() {
    setNewFoodName(food.foodName);
    setNewFoodIngredients(food.ingredients);
    setNewCategory(food.category);
    setNewPrice(food.price);
    setNewImage(food.image);
  }

  async function deleteFoods() {
    // устгах API дуудах код
    // амжилттай бол:
    setOpen(false);
    onClose?.();
  }

  async function editFoods() {
    // засах API дуудах код
    // амжилттай бол:
    setOpen(false);
    onClose?.();
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
        <button className="..." aria-label="Edit food">
          <Pencil />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Food</DialogTitle>
          <DialogDescription>Click save when you're done.</DialogDescription>
        </DialogHeader>
        <input
          value={newFoodName}
          onChange={(e) => setNewFoodName(e.target.value)}
          placeholder="Food Name"
          className="..."
        />
        {/* Бусад input-уудыг value/onChange тохируулна */}
        {/* ... */}
        <DialogFooter>
          <button onClick={deleteFoods} className="bg-red-500 text-white px-4 py-2 rounded">
            <Trash2 />
          </button>
          <button onClick={editFoods} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}