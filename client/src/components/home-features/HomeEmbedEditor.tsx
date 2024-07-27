"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import {
  Bold,
  Code2,
  Italic,
  Plus,
  Quote,
  ScanEye,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form } from "../ui/form";

import { IEmbed } from "@/lib/types/embed.interface";
import { cn } from "@/lib/utils";
import { EmbedEditorValidator } from "@/lib/validators/embed-editor-validator";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import GradiantEmbedDisplayContainer from "../guild-dashboard/embed-display/GradiantEmbedDisplayContainer";
import EmbedEditorFields from "../guild-dashboard/embed-edit-form/EmbedEditorFields";
import { Accordion } from "../ui/accordion";
import { Label } from "../ui/label";

export default function HomeEmbedEditor() {
  type Schema = z.infer<typeof EmbedEditorValidator>;

  const form = useForm<Schema>({});

  const fieldsArray = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const embedData = {
    title: "Ticket Created",
    description: "One Of our support staff will contact you ASAP.",
    footer: "Powered By MezoBot",
    fields: [],
  };

  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) => Math.round(latest));

  const displayTitle = useTransform(rounded, (latest) =>
    embedData.title.slice(0, latest)
  );
  const displayDescription = useTransform(rounded, (latest) =>
    embedData.description.slice(0, latest)
  );
  const displayFooter = useTransform(rounded, (latest) =>
    embedData.footer.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, embedData.description.length, {
      type: "tween",
      duration: 6,
      delay: 1,
      ease: "linear",
      repeatDelay: 2,
      repeat: Infinity,
    });

    // Returning a cleanup function to stop the animation when the component is unmounted.
    return controls.stop;
  }, [count, embedData.description.length]);

  return (
    <div className="ticket-editor text-xs grid md:grid-cols-4 gap-6">
      <Drawer>
        <div className="relative md:col-span-2">
          <Card
            className=" w-full h-full bg-transparent dark:shadow-sm
    shadow-none
              dark:[border-image:linear-gradient(to_bottom,#1e293b,50%,transparent)_1] 
    [border-image:linear-gradient(to_bottom,#e5e7eb,50%,transparent)_1] 
          "
          >
            <CardHeader>
              <CardTitle>
                <div className="text-base flex flex-row justify-between items-center">
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
                <form className="space-y-8">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Title</Label>
                    <p className="bg-background cursor-text p-3 h-10 rounded-md ring-offset-background border border-input">
                      <motion.span>{displayTitle}</motion.span>
                    </p>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="description">Description</Label>
                    <div className="flex flex-col">
                      <p className="flex text-gray-600 p-3 border-b-0 border border-input flex-wrap flex-row gap-x-5 gap-y-2 ">
                        <Bold
                          className="hover:bg-background transition-all cursor-pointer"
                          size={17}
                        />
                        <Italic className="cursor-pointer" size={17} />
                        <Underline className="cursor-pointer" size={17} />
                        <Strikethrough className="cursor-pointer" size={17} />
                        <Quote className="cursor-pointer" size={17} />
                        <Code2 className="cursor-pointer" size={17} />
                      </p>
                      <p className="bg-background cursor-text p-3 h-16 ring-offset-background border border-input">
                        <motion.span>{displayDescription}</motion.span>
                      </p>
                    </div>
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
                          <EmbedEditorFields fieldsArray={fieldsArray} />
                        </Accordion>
                        <div
                          className="flex flex-row-reverse"
                          aria-label="add field"
                        >
                          <Plus
                            className="text-white rounded-md h-7 p-1 w-7 bg-blue-600"
                            cursor={"pointer"}
                          />
                        </div>
                      </>
                    ) : (
                      <div
                        className="flex flex-row-reverse"
                        aria-label="add field"
                      >
                        <Plus
                          className="text-white rounded-md h-7 p-1 w-7 bg-blue-600"
                          cursor={"pointer"}
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="footer">Footer</Label>
                    <p className="bg-clip-text bg-gradient-to-b from-white from-50%  [border-image:linear-gradient(to_bottom,hsl(214.3,31.8%,91.4%),50%,transparent)_1] bg-background p-3 cursor-text h-10 rounded-md ring-offset-background border border-input">
                      <motion.span>{displayFooter}</motion.span>
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="absolute inset-y-0 left-0 w-full top-20 bg-gradient-to-t dark:from-background from-slate-50 to-transparent" />
        </div>
        <DrawerContent>
          <GradiantEmbedDisplayContainer
            embed={embedData}
            title={<motion.span>{displayTitle}</motion.span>}
            description={<motion.span>{displayDescription}</motion.span>}
            footer={<motion.span>{displayFooter}</motion.span>}
            fields={[]}
          />
        </DrawerContent>

        <div className="md:block hidden w-full relative col-span-2">
          <GradiantEmbedDisplayContainer
            embed={embedData}
            title={<motion.span>{displayTitle}</motion.span>}
            description={<motion.span>{displayDescription}</motion.span>}
            footer={<motion.span>{displayFooter}</motion.span>}
            fields={[]}
          />
          <div className="absolute inset-y-0 left-0 w-full top-20 bg-gradient-to-t dark:from-background from-slate-50 to-transparent" />
        </div>
      </Drawer>
    </div>
  );
}
