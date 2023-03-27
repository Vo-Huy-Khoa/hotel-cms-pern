import { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Props } from "react-apexcharts";

export const Popup = ({
  title = "Popup Create",
  open,
  onClose,
  desc,
  submit,
}: Props) => {
  const handleSubmit = () => {
    onClose();
    submit();
  };
  return (
    <Fragment>
      <Dialog open={open} handler={onClose}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody divider>{desc}</DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={onClose} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};
