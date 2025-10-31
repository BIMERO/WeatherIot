"use client";

import { createClient } from "@/lib/supabase/client";
import { unstable_noStore as noStore } from "next/cache";
import { useEffect, useState } from "react";

export async function readUserSession() {
  noStore();
  const supabase = await createClient();
  return supabase.auth.getSession();
}

export function useGetUser() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await readUserSession();
        setUserInfo(data);
      } catch (err) {
        setError(error);
        console.log("error", err);
      }
    };

    fetchData();
  }, []);

  return { userInfo, error };
}
