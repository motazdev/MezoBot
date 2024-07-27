import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import guildService from "@/services/guild";
import { ClientUser } from "discord.js";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

const AddStaffMemberModal = async ({ guildId }: { guildId: string }) => {
  const getGuildMembers = await guildService.getGuildMembers({ guildId });
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          Add Staff Member <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-5">Guild Members</DialogTitle>
          <div>
            <div className="flex flex-col gap-y-4">
              <ScrollArea className="h-[500px] rounded-md border p-4">
                {getGuildMembers.data.map((user: ClientUser) => (
                  <div
                    className="flex-row flex justify-between items-center gap-4 p-3"
                    key={user.id}
                  >
                    <div className="flex flex-row items-center gap-4">
                      <div className="img w-10 h-10 relative">
                        <Image
                          src={`${user.displayAvatarURL}`}
                          alt="user-avatar"
                          fill
                          className="rounded-full"
                          sizes="100px"
                          priority
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMSP20FAAFIgJW0PRabQAAAABJRU5ErkJggg=="
                        />
                      </div>

                      {user.globalName}
                    </div>
                    {/* TODO */}
                    <Button disabled>Promote to staff</Button>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStaffMemberModal;
