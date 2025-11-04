"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import axios, { AxiosResponse } from "axios";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

type ResponseData = {
  token: string;
  refreshToken: string;
};

type LoginResult = {
  token?: string;
  refreshToken?: string;
  error?: Error;
};

export async function registerUser(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const supabase = await createServerSupabaseClient();
  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  return result;
}

export async function signIn(data: { email: string; password: string }) {
  const supabase = await createServerSupabaseClient();
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  // return result;
  return {
    error: error ? { message: error.message } : null,
    user: authData?.user
      ? { id: authData.user.id, email: authData.user.email }
      : null,
  };
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/auth");
}

export async function readUserSession() {
  const supabase = await createServerSupabaseClient();
  return supabase.auth.getSession();
}

export async function createSettings(data: {
  entityType: string;
  entityId: string;
}) {
  const supabase = await createServerSupabaseClient();

  const result = await supabase
    .from("settings")
    .insert({
      entityType: data.entityType,
      entityId: data.entityId,
    })
    .single();
  revalidatePath("/");
  return result;
}

export async function readSetting() {
  noStore();
  const supabase = await createServerSupabaseClient();
  return await supabase
    .from("settings")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();
}

export async function loginTb(): Promise<LoginResult> {
  try {
    const username = process.env.TB_USERNAME;
    const password = process.env.TB_PASSWORD;

    if (!username || !password) {
      throw new Error(
        "The environment variables for the username and password are not defined."
      );
    }

    const responseLogin: AxiosResponse<ResponseData> = await axios.post(
      `/auth/login`,
      {
        username,
        password,
      }
    );

    const { token, refreshToken } = responseLogin.data;
    return { token, refreshToken };
  } catch (error) {
    return { error: error as Error };
  }
}
