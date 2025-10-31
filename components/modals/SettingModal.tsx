import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { IoSettingsOutline } from "react-icons/io5";
import { readSetting } from "@/actions";
import SettingForm from "../forms/SettingForm";

export async function SettingModal() {
  const res = await readSetting();
  let entityId: string = "";
  let entityType: string = "";
  // let keys: string = "";
  // let useStrictDataTypes: string = "";
  if (res.data) {
    entityId = res.data.entityId;
    entityType = res.data.entityType;
    // keys = res.data.keys;
    // useStrictDataTypes = res.data.useStrictDataTypes;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="gap-1">
          <IoSettingsOutline className="text-2xl" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogTitle>Setting</DialogTitle>
          <DialogDescription>
            <p>
              Here you can adjust your telemetry settings to connect to
              ThingsBoard:
            </p>
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex gap-1">
                <h1>EntityType:</h1>
                <Badge>{entityType ? entityType : "NA"}</Badge>
              </div>
              <div className="flex gap-1">
                <h1>EntityId:</h1>
                <Badge>{entityId ? entityId : "NA"}</Badge>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <SettingForm />
        <DialogFooter>
          <DialogClose asChild className="w-full">
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SettingModal;
