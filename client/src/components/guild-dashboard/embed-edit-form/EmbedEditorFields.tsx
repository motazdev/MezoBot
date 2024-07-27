"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFieldArrayReturn, useFormContext } from "react-hook-form";
import InlineCheck from "./InlineCheck";
import RemoveField from "./RemoveField";

export type EmbedEditForm = {
  fields: {
    name: string;
    value: string;
    inline: boolean;
    order?: number;
    _id?: string;
  }[];
  title: string;
  description: string;
  footer: string;
};

interface PageProps {
  fieldsArray: UseFieldArrayReturn<EmbedEditForm>;
  guildId?: string;
}
type pos = "up" | "down";

const EmbedEditorFields = ({ guildId, fieldsArray }: PageProps) => {
  const { register, control } = useFormContext(); // retrieve all hook methods

  const swap = (index: number, pos: pos) => {
    if (pos == "down") {
      fieldsArray.swap(index, index + 1);
      fieldsArray.update(index, {
        ...fieldsArray.fields[index + 1],

        order: fieldsArray.fields[index].order,
      });
      fieldsArray.update(index + 1, {
        ...fieldsArray.fields[index],
        order: fieldsArray.fields[index + 1].order,
      });
    } else {
      fieldsArray.swap(index, index - 1);
      fieldsArray.update(index, {
        ...fieldsArray.fields[index - 1],
        order: fieldsArray.fields[index].order,
      });
      fieldsArray.update(index - 1, {
        ...fieldsArray.fields[index],
        order: fieldsArray.fields[index - 1].order,
      });
    }
  };
  return (
    <>
      <Accordion type="single" collapsible>
        {fieldsArray.fields?.length > 0 &&
          fieldsArray.fields?.map((field, index) => (
            <AccordionItem
              value={field.id}
              key={field.id}
              className={`hover:bg-black/20 transition-all px-2 orderIs${index}`}
            >
              <AccordionTrigger className="flex">
                <div className="flex justify-between w-full ml-2 items-center">
                  <div className="">
                    Field {index + 1} <span>{field.name}</span>{" "}
                  </div>
                  <div className="flex gap-3">
                    {index < fieldsArray.fields.length - 1 && (
                      <Button
                        asChild
                        className="bg-secondary p-2 text-primary"
                        size={"icon"}
                        onClick={() => swap(index, "down")}
                      >
                        <ChevronDown />
                      </Button>
                    )}
                    {index > 0 && (
                      <Button
                        asChild
                        className="bg-secondary p-2 text-primary"
                        size={"icon"}
                        onClick={() => swap(index, "up")}
                      >
                        <ChevronUp />
                      </Button>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-5 px-2">
                  <div className="grid gap-3">
                    <FormField
                      control={control}
                      name={`fields[${index}].name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Field Name" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={control}
                      name={`fields[${index}].value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Value</FormLabel>
                          <FormControl>
                            <Input placeholder="Field Value" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between flex-row">
                    <RemoveField
                      index={index}
                      guildId={guildId}
                      fieldsArray={fieldsArray}
                      fieldId={field._id!}
                    />

                    <InlineCheck
                      inline={field.inline}
                      index={index}
                      field={field}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </>
  );
};

export default EmbedEditorFields;
