"use client";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DrawerTrigger } from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { embedDefaultData } from "@/constants/embedConstants";
import { useEmbedStore } from "@/context/embed-editor";
import { IEmbed, IEmbedResponse } from "@/lib/types/embed.interface";
import { cn } from "@/lib/utils";
import { EmbedEditorValidator } from "@/lib/validators/embed-editor-validator";
import guildService from "@/services/guild";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Plus, ScanEye } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import ReactQuill from "react-quill";
import { toast } from "sonner";
import { z } from "zod";
import EmbedEditorFields from "./EmbedEditorFields";

export interface ITEmbedField {
  name: string;
  value: string;
  inline: boolean;
}
export interface ITEmbed {
  title: string;
  footer: string;
  description: string;
  fields: ITEmbedField[];
}

const EmbedEditorForm = ({
  guildId,
  data,
}: {
  guildId?: string;
  data?: IEmbed;
}) => {
  const {
    setOnTicketCreateEmbed,
    setEmbedData,
    data: embedData,
  } = useEmbedStore();
  const [formData, setFormData] = useState(data);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text directionw

    [{ color: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  type Schema = z.infer<typeof EmbedEditorValidator>;

  const [tabQuery, setTabQuery] = useQueryState(
    "tab",
    parseAsString.withDefault("on_ticket_create")
  );
  // Form Handling
  const form = useForm<Schema>({
    resolver: zodResolver(EmbedEditorValidator),
    defaultValues: formData || embedDefaultData[tabQuery],
  });
  const {
    formState: { isDirty },
  } = form;
  const formDataWatcher = useWatch({
    control: form.control,
    // defaultValue: formData || embedDefaultData[tabQuery],
  });

  const fieldsArray = useFieldArray({
    control: form.control,
    name: "fields",
  });

  useEffect(() => {
    embedData[tabQuery] = formDataWatcher as IEmbedResponse;
    // const translated_fields = embedData[tabQuery].fields.map((f) => {
    //   f.name = discord_translate_tags(f.name);
    //   f.value = discord_translate_tags(f.value);
    //   return f;
    // });
    // const ee = {
    //   ...embedData[tabQuery],
    //   title: discord_translate_tags(embedData[tabQuery].title),
    //   description: discord_translate_tags(embedData[tabQuery].description),
    //   footer: discord_translate_tags(embedData[tabQuery].footer),
    //   fields: translated_fields,
    // };
    setEmbedData(embedData);
  }, [embedData, tabQuery, formDataWatcher, setEmbedData]);
  // Form Utils

  const addNewField = () => {
    fieldsArray.append({
      name: "",
      value: "",
      inline: false,
    });
  };

  const { isError, mutate } = useMutation({
    mutationFn: (data: any) => guildService.createEmbed(data),
    onSuccess: (resp) => {
      toast.success(resp.data);
    },
    onError: (err) => {
      console.log("Error Updating Form", err);
    },
  });

  function onSubmit(values: z.infer<typeof EmbedEditorValidator>) {
    setFormData({
      description: values.description,
      fields: values.fields,
      footer: values.footer,
      title: values.title,
    });
    form.reset(form.getValues());
    mutate({
      guildId,
      embedTag: tabQuery,
      data: {
        ...values,
      },
    });
  }
  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center">
            <p>Embed Editor</p>
            <div className="md:hidden block">
              <DrawerTrigger>
                <Button asChild size={"icon"} variant={"outline"}>
                  <ScanEye />
                </Button>
              </DrawerTrigger>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FormProvider {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2 ">
                <p>Description</p>
                <ReactQuill
                  theme="snow"
                  modules={{ toolbar: toolbarOptions }}
                  style={{ height: "40%" }}
                  value={data?.description}
                />
              </div>
              <div
                className={cn(
                  "flex gap-2 ",
                  fieldsArray.fields.length
                    ? "flex-col"
                    : "flex-row justify-between items-center"
                )}
              >
                <p>Fields</p>
                {fieldsArray.fields.length ? (
                  <>
                    <Accordion type="single" collapsible>
                      <EmbedEditorFields
                        guildId={guildId}
                        fieldsArray={fieldsArray}
                      />
                    </Accordion>
                    <div
                      className="flex flex-row-reverse"
                      aria-label="add field"
                    >
                      <Plus
                        className="text-white rounded-md h-7 p-1 w-7 bg-blue-600"
                        cursor={"pointer"}
                        onClick={() => addNewField()}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-row-reverse" aria-label="add field">
                    <Plus
                      className="text-white rounded-md h-7 p-1 w-7 bg-blue-600"
                      cursor={"pointer"}
                      onClick={() => addNewField()}
                    />
                  </div>
                )}
              </div>
              <FormField
                control={form.control}
                name="footer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Footer</FormLabel>
                    <FormControl>
                      <Input placeholder="Embed Footer" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={!isDirty}>
                Save
              </Button>
            </form>
          </FormProvider>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EmbedEditorForm;
