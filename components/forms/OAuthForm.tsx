"use client";
import React from "react";
import { Button } from "../ui/button";
import { IoLogoGithub } from "react-icons/io5";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/hooks/use-toast";

export async function signInWithOAuthGitHub() {
  const supabase = await createClient();
  const result = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
  return result;
}

const OAuthForm = () => {
  async function loginWithGithub() {
    console.log("login with GitHub");

    const result = await signInWithOAuthGitHub();
    const { error } = result;

    if (error?.message) {
      console.log(error.message);
      toast({
        variant: "destructive",
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      console.log("success");
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Successfully Login</code>
          </pre>
        ),
      });
    }
  }

  return (
    <Button className="w-full" onClick={loginWithGithub}>
      Login With Github
      <IoLogoGithub className="h-6 w-6 mx-3" />
    </Button>
  );
};

export default OAuthForm;
