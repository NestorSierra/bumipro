import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../stores/store";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ModalSize } from "../../../stores/modalStore";

export default observer(function ModalContainer() {
  const { modalStore } = useStore();
  const { modal } = modalStore;
  const { open, title, body } = modalStore.modal;
  const isLarge = modal.size === ModalSize.large;

  return (
    <Dialog
      open={open}
      onClose={modalStore.closeModal}
      maxWidth={isLarge ? "xl" : undefined}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent style={{ paddingTop: "10px" }}>{body}</DialogContent>
    </Dialog>
  );
});
