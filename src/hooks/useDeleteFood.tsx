"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";

export function useDeleteFood() {
  const { getToken } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function deleteFood(id: string, onSuccess?: () => void) {
    setIsDeleting(true);
    setError(null);

    try {
      const token = await getToken();
      if (!token) {
        setError("No authentication token");
        setIsDeleting(false);
        return false;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/food/${id}`, {
        method: "DELETE",
        headers: {
          authentication: token,
        },
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || "Failed to delete food");
      }

      if (onSuccess) onSuccess();
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setIsDeleting(false);
    }
  }

  return { deleteFood, isDeleting, error };
}