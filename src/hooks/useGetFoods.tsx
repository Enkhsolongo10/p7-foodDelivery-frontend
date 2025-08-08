"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import type { Foods } from "@/constants/types";

export function useGetFoods(categoryId?: string) {
  const { getToken } = useAuth();
  const [foods, setFoods] = useState<Foods[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchFoods() {
    setIsLoading(true);
    setError(null);
    const token = await getToken();
    if (!token) {
      setError("No token");
      setIsLoading(false);
      return;
    }

    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/food`;
    if (categoryId && categoryId !== "all") {
      url += `/${categoryId}`;
    }

    try {
      const response = await fetch(url, {
        headers: { authentication: token },
      });

      if (!response.ok) throw new Error("Failed to fetch foods");

      const data = (await response.json()) as Foods[];
      setFoods(data);
    } catch (err) {
      setError((err as Error).message);
      setFoods([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFoods();
  }, [categoryId]);

  return { foods, isLoading, error, fetchFoods };
}