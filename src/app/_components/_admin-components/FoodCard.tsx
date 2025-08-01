import { FoodCardProps } from "@/constants/types";

export default function FoodCard({ food }: FoodCardProps) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      {food.image && (
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      <h3 className="text-lg font-bold">{food.name}</h3>
      <p className="text-gray-600 mb-1">${food.price.toFixed(2)}</p>

      {food.ingredients && (
        <p className="text-sm text-gray-500">{food.ingredients}</p>
      )}
    </div>
  );
}
