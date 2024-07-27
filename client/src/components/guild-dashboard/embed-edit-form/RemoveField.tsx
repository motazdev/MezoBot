import { Button } from "@/components/ui/button";
import guildService from "@/services/guild";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { UseFieldArrayReturn } from "react-hook-form";
import { toast } from "sonner";
import { ConfirmDeleteAlert } from "../alert-dialog/ConfirmDeleteAlert";
import { EmbedEditForm } from "./EmbedEditorFields";

const RemoveField = ({
  index,
  fieldsArray,
  guildId,
  fieldId,
}: {
  index: number;
  fieldsArray: UseFieldArrayReturn<EmbedEditForm>;
  guildId?: string;
  fieldId: string;
}) => {
  const { isError, mutate } = useMutation({
    mutationFn: () =>
      guildService.deleteEmbedField({
        guildId: guildId || "",
        embedTag: "on_ticket_create",
        fieldId,
      }),
    onSuccess: () => toast.success("Field Deleted."),
  });

  const deleteField = (i: number) => {
    fieldsArray.remove(i);
    if (guildId) {
      mutate();
    }
  };

  return (
    <ConfirmDeleteAlert
      onConfirm={() => deleteField(index)}
      button={
        <Button size={"icon"}>
          <Trash />
        </Button>
      }
    />
  );
};

export default RemoveField;
