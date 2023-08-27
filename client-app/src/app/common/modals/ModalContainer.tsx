import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../../stores/store";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export default observer(function ModalContainer() {
  const { modalStore } = useStore();
  return (
    <Dialog open={modalStore.modal.open} onClose={modalStore.closeModal}>
      <DialogTitle>{modalStore.modal.title}</DialogTitle>
      <DialogContent style={{ paddingTop: "10px" }}>
        {modalStore.modal.body}
      </DialogContent>
    </Dialog>
  );
});
