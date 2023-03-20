import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export const PopupCreate = ({ open, onClose }: any) => {
  return (
    <Fragment>
      <Dialog open={open} handler={onClose}>
        <DialogHeader>Popup Create</DialogHeader>
        <DialogBody divider>Create!</DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={onClose} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={onClose}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};
