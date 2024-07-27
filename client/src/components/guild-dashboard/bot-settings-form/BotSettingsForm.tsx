"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IGuild } from "@/DB/models/Guild";
import guildService from "@/services/guild";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIGuildCategoryChannel, APIRole } from "discord.js";
import { LoaderCircle } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FancyMultiSelect } from "./fancy-multi-select";
const formSchema = z.object({
  categoryId: z.string(),
  staff_roles: z
    .array(z.string())
    .min(1, { message: "You must have at least 1 role for the staff." }),
});

const BotSettingsForm = ({
  guildId,
  cateogires,
  roles,
  guildData,
}: {
  cateogires: APIGuildCategoryChannel[] | undefined;
  roles: APIRole[];
  guildId: string;
  guildData: IGuild;
}) => {
  const [isCreatePending, startCreateTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: guildData?.categoryId,
      staff_roles: guildData?.staff_roles,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    startCreateTransition(async () => {
      const resp = await guildService.updateGuildSettings({
        guildId,
        data: values,
      });
      if (resp.success) {
        toast.success(resp.data);
      } else {
        toast.error(resp.data);
      }
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Support Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize bg-transparent">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {cateogires?.map((categ) => {
                        return (
                          <SelectItem
                            key={categ.id}
                            value={categ.id}
                            className="capitalize"
                          >
                            {categ.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="staff_roles"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Support Staff Roles</FormLabel>
              <FancyMultiSelect field={field} data={roles} />
              <FormDescription>
                The roles you &apos;ll choose &apos;ll be from the staff memebrs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex mt-4">
          <Button disabled={isCreatePending}>
            {isCreatePending && (
              <LoaderCircle
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BotSettingsForm;
