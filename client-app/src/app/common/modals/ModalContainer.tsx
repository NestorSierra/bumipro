import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../stores/store";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ModalSize } from "../../../stores/modalStore";

export default observer(function ModalContainer() {
  const { modalStore } = useStore();
  const { modal } = modalStore;

  if (modal.size === ModalSize.large) {
    return (
      <Dialog open={modalStore.modal.open} onClose={modalStore.closeModal}>
        <DialogTitle>{modalStore.modal.title}</DialogTitle>
        <DialogContent style={{ paddingTop: "10px" }}>
          {modalStore.modal.body}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={modalStore.modal.open} onClose={modalStore.closeModal}>
      <DialogTitle>{modalStore.modal.title}</DialogTitle>
      <DialogContent style={{ paddingTop: "10px" }}>
        {modalStore.modal.body}
      </DialogContent>
    </Dialog>
  );
});
