"use client";

import { X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Command as CommandPrimitive } from "cmdk";
import { APIRole } from "discord.js";

export function FancyMultiSelect({
  field,
  data,
}: {
  field: any;
  data: APIRole[];
}) {
  const selectedRoles =
    data.filter((r) => field?.value?.includes(r.id)) || null;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<APIRole[]>(selectedRoles);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((role: APIRole) => {
    setSelected((prev) => prev.filter((s) => s.name !== role.name));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );
  const selectables = data.filter((role) => !selected.includes(role));
  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((role) => {
            return (
              <Badge key={role.id} variant="secondary">
                {role.name}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(role);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => {
                    handleUnselect(role);

                    field.onChange([
                      ...selected
                        .filter((r) => r.id !== role.id)
                        .map((r) => r.id),
                    ]);
                  }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select Roles..."
            className=" flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute  mt-2 top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <ScrollArea className="h-52  rounded-md border">
                <CommandGroup className="h-full overflow-auto">
                  {selectables.map((role) => {
                    if (role.name !== "@everyone")
                      return (
                        <CommandItem
                          key={role.id}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onChange={field.onChange}
                          onSelect={(value) => {
                            setInputValue("");
                            setSelected((prev) => [...prev, role]);
                            field.onChange([
                              ...selected.map((r) => r.id),
                              role.id,
                            ]);
                          }}
                          className={"cursor-pointer"}
                        >
                          {role.name}
                        </CommandItem>
                      );
                  })}
                </CommandGroup>
              </ScrollArea>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
