"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
}

export function useAdminFetch<T = any>(path: string): FetchResult<T> {
  const { getToken } = useAuth();
  const { user } = useUser();

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = await getToken();

      if (token && user?.publicMetadata?.role === "admin") {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`,
            {
              method: "GET",
              headers: {
                authentication: token,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch admin data");
          }

          const jsonData = (await response.json()) as T;
          setData(jsonData);
        } catch (error) {
          console.error(error);
          setData(null);
        }
      } else {
        setData(null);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [path, user]);

  return { data, isLoading };
}

// import { useAuth } from "@clerk/nextjs";
// import { useEffect, useState } from "react";

// export function useAuthFetch(path: string) {
//   const { getToken } = useAuth();
//   const [data, setData] = useState([]);

//   async function getFetchData() {
//     const token = await getToken();
//     if (token) {
//       fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`, {
//         method: "GET",
//         headers: {
//           authentication: token,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => setData(data));
//     }
//   }
//   useEffect(() => {
//     getFetchData();
//   }, []);
//   return { isLoading: !data, data };
// };
