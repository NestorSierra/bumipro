import { makeAutoObservable } from "mobx";

interface Modal {
  open: boolean;
  title: string;
  body: JSX.Element | null;
  size?: ModalSize;
}

export enum ModalSize {
  small,
  medium,
  large,
}

export default class ModalStore {
  modal: Modal = {
    open: false,
    title: "",
    body: null,
    size: ModalSize.small,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (title: string, content: JSX.Element, size?: ModalSize) => {
    this.modal.open = true;
    this.modal.body = content;
    this.modal.title = title;
    this.modal.size = size;
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
    this.modal.title = "";
  };
}
