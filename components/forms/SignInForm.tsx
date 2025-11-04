"use client";
import React, { useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { signIn } from "@/actions";
import { Spinner } from "../ui/spinner";
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

const SignInForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);

    startTransition(async () => {
      const result = await signIn(data);
      // const { error } = result;

      if (result?.error) {
        console.log(result.error);
        toast({
          variant: "destructive",
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{result.error.message}</code>
            </pre>
          ),
        });
      } else {
        console.log("success");
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Successfully register</code>
            </pre>
          ),
        });
      }
    });
  }

  return (
    <section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-start">Email</FormLabel>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                />
                <FormMessage className="flex justify-start" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-start">Password</FormLabel>
                <Input
                  placeholder="********"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
                <FormMessage className="flex justify-start" />
              </FormItem>
            )}
          />

          <Button className="w-full flex items-center justify-center gap-1">
            Sign In {isPending && <Spinner />}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default SignInForm;
