"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { registerUser } from "@/actions";
import { toast } from "@/hooks/use-toast";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Spinner } from "../ui/spinner";

const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1, {
      message: "Password is required.",
    }),
    confirmPassword: z.string().min(1, {
      message: "Password is required.",
    }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password did not match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);

    startTransition(async () => {
      const result = await registerUser(data);
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
                <InputGroup>
                  <InputGroupInput
                    placeholder="********"
                    {...field}
                    type={hidePassword ? "password" : "text"}
                    onChange={field.onChange}
                  />
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setHidePassword(!hidePassword)}
                  >
                    {hidePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </InputGroupAddon>
                </InputGroup>

                <FormMessage className="flex justify-start" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-start">
                  Confirm Password
                </FormLabel>
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

          <Button className="w-full flex items-center gap-1 justify-center">
            Register {isPending && <Spinner />}{" "}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default RegisterForm;
