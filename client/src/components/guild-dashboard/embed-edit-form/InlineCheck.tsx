"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEmbedStore } from "@/context/embed-editor";
import { IEmbedField } from "@/lib/types/embed.interface";
import { useFormContext } from "react-hook-form";

const InlineCheck = ({
  inline,
  field,
  index,
}: {
  inline: boolean;
  field: IEmbedField;
  index: number;
}) => {
  const { data } = useEmbedStore();
  const { register, control } = useFormContext(); // retrieve all hook methods

  return (
    <FormField
      control={control}
      name={`fields[${index}].inline`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inline"
                onCheckedChange={field.onChange}
                checked={field.value}
              />

              <label
                htmlFor="inline"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Inline
              </label>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
    // <div className="flex items-center space-x-2">
    //   <Checkbox
    //     id="inline"
    //     onCheckedChange={(checked: boolean) => onInlineCheck(checked)}
    //     checked={field.inline}
    //   />

    //   <label
    //     htmlFor="inline"
    //     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //   >
    //     Inline
    //   </label>
    // </div>
  );
};

export default InlineCheck;
