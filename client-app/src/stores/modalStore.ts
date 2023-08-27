import { makeAutoObservable } from "mobx";

interface Modal {
  open: boolean;
  title: string;
  body: JSX.Element | null;
}

export default class ModalStore {
  modal: Modal = {
    open: false,
    title: "",
    body: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (title: string, content: JSX.Element) => {
    this.modal.open = true;
    this.modal.body = content;
    this.modal.title = title;
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
    this.modal.title = "";
  };
}
