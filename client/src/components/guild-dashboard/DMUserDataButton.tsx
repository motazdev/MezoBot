"use client";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { getGuildUserById } from "@/app/utils/actions";

interface PageProps {
  userId: string;
  value: string;
  isDemo?: boolean;
}
const DMUserDataButton = ({ userId, value, isDemo }: PageProps) => {
  const session = useSession();
  const singleGuildUser = async (userId: string) => {
    const response = await getGuildUserById(userId);
    return response;
  };
  const date = new Date();

  const sendDM = async () => {
    const userData = await singleGuildUser(userId);

    if (userData) {
      const response = await fetch(
        `/api/guild-users/dm/${session.data?.user.id}`,
        {
          method: "POST",
          body: JSON.stringify({
            enforce_nonce: false,
            nonce: date.getMinutes().toString(),
            content: ` \`Username: ${userData.global_name}\`\n\`Id: ${userData.id}\` \n@: <@${userData.id}>`,
          }),
          headers: {
            last: date.getMinutes().toString(),
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Message Sent Successfully!");
      } else {
        toast.error(data.msg);
      }
    }
  };

  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      onClick={(e) => {
        e.preventDefault();
        if (!isDemo) {
          sendDM();
        }
      }}
    >
      {value}
    </Button>
  );
};

export default DMUserDataButton;
