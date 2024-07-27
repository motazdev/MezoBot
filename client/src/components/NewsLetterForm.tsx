"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import newsLetterService from "@/services/newsletter";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import LoadingSpinner from "./LoadingSpinner";
import { Toaster } from "./ui/sonner";
const NewsLetterForm = () => {
  const formSchema = z.object({
    email: z.string().email(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isSuccess, setSuccess] = useState(false);
  const [isCreatePending, startCreateTransition] = useTransition();
  function onSubmit(values: z.infer<typeof formSchema>) {
    startCreateTransition(async () => {
      const resp = await newsLetterService.addUser({ email: values.email });
      if (resp.success) {
        setSuccess(true);
      } else {
        toast.error(resp.data);
      }
    });
  }
  return (
    <Form {...form}>
      <Toaster />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row space-x-2 "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSuccess}>
          {isCreatePending ? (
            <LoadingSpinner className="w-6 h-6" />
          ) : isSuccess ? (
            "Joined :)"
          ) : (
            "Join"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default NewsLetterForm;
