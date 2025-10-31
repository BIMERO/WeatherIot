"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormLabel,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { toast } from "@/hooks/use-toast";
import { createSettings } from "@/actions";

const FormSchema = z.object({
  entityType: z.string().min(1, {
    message: "EntityType is required.",
  }),
  entityId: z.string().min(1, {
    message: "EntityId is required.",
  }),
  keys: z.string().min(1, {
    message: "Keys is required.",
  }),
  useStrictDataTypes: z.string().min(1, {
    message: "useStrictDataTypes is required.",
  }),
});

const SettingForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keys: "default-key",
      useStrictDataTypes: "false",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const result = await createSettings(data);
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
        console.log("succes");
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">Successfully Send</code>
            </pre>
          ),
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="entityType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">EntityType</FormLabel>
              <FormControl>
                <Input
                  className="border-blue-950"
                  placeholder="DEVICE"
                  {...field}
                  type="text"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormDescription>
                A string value representing the entity type. For example,
                &apos;DEVICE&apos;
              </FormDescription>
              <FormMessage className="flex justify-start" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="entityId"
          render={({ field }) => (
            <FormItem>
              <label className="block">EntityId</label>
              <FormControl>
                <Input
                  className="border-blue-950"
                  placeholder="784f394c-42b6-435a-983c-b7beff2784f9"
                  {...field}
                  type="text"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormDescription>
                A string value representing the entity id. For example,
                &apos;784f394c-42b6-435a-983c-b7beff2784f9&apos;
              </FormDescription>
              <FormMessage className="flex justify-start" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2"
        >
          Update
          {isPending && <Spinner color="black" />}
        </Button>
      </form>
    </Form>
  );
};

export default SettingForm;

// "use client";
// import { startTransition, useTransition } from "react";
// import { Icons } from "../icons";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { createSetting } from "@/actions";
// import { toast } from "../ui/use-toast";
// import * as z from "zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { cn } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";

// const FormSchema = z.object({
//   entityType: z.string({
//     required_error: "entityType is required",
//     invalid_type_error: "entityType must be a string",
//   }),
//   entityId: z.string({
//     required_error: "entityId is required",
//     invalid_type_error: "entityId must be a string",
//   }),
//   keys: z.string({
//     invalid_type_error: "keys must be a string",
//   }),
//   useStrictDataTypes: z.string({
//     invalid_type_error: "keys must be a string",
//   }),
// });

// export const SettingForm = () => {
//   const [isPending, startTransition] = useTransition();

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       keys: "",
//       useStrictDataTypes: "false",
//     },
//   });

//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     startTransition(async () => {
//       const result = await createSetting(data);
//       const { error } = result;

//       if (error?.message) {
//         console.log(error.message);
//         toast({
//           variant: "destructive",
//           title: "You submitted the following values:",
//           description: (
//             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//               <code className="text-white">{error.message}</code>
//             </pre>
//           ),
//         });
//       } else {
//         console.log("succes");
//         toast({
//           title: "You submitted the following values:",
//           description: (
//             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//               <code className="text-white">Successfully Send</code>
//             </pre>
//           ),
//         });
//       }
//     });
//   }
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="w-full space-y-6 px-3 md:px-0"
//       >
//         <FormField
//           control={form.control}
//           name="entityType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="flex justify-start">EntityType*</FormLabel>
//               <FormControl>
//                 <Input
//                   className="border-blue-950"
//                   placeholder="DEVICE"
//                   {...field}
//                   type="string"
//                   onChange={field.onChange}
//                 />
//               </FormControl>
//               <FormDescription>
//                 A string value representing the entity type. For example,
//                 'DEVICE'
//               </FormDescription>
//               <FormMessage className="flex justify-start" />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="entityId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="flex justify-start">EntityId*</FormLabel>
//               <FormControl>
//                 <Input
//                   className="border-blue-950"
//                   placeholder="784f394c-42b6-435a-983c-b7beff2784f9"
//                   {...field}
//                   type="string"
//                   onChange={field.onChange}
//                 />
//               </FormControl>
//               <FormDescription>
//                 A string value representing the entity id. For example,
//                 '784f394c-42b6-435a-983c-b7beff2784f9'
//               </FormDescription>
//               <FormMessage className="flex justify-start" />
//             </FormItem>
//           )}
//         />
//         <Button type="submit" className="w-full flex gap-2">
//           Edit
//           <Icons.spinner
//             className={cn("animate-spin", { hidden: !isPending })}
//           />
//         </Button>
//       </form>
//     </Form>
//   );
// };
