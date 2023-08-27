import { createContext, useContext } from "react";
import PropertyStore from "./propertyStore";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import ApplicationStore from "./applicationStore";

interface Store {
  applicationStore: ApplicationStore;
  commonStore: CommonStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  propertyStore: PropertyStore;
  userStore: UserStore;
}

export const store: Store = {
  applicationStore: new ApplicationStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  propertyStore: new PropertyStore(),
  userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
