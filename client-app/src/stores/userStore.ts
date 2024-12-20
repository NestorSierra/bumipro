import { makeAutoObservable, runInAction } from "mobx";
import { User, UserRegisterFormValues, UserFormValues } from "../models/user";
import agent from "../app/api/agent";
import { store } from "./store";
import { router } from "../app/router/Route";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Accounts.login(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/dashboard");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  register = async (creds: UserRegisterFormValues) => {
    try {
      const user = await agent.Accounts.register(creds);
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      router.navigate("/dashboard");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setLoadingApp();
    store.commonStore.setToken(null);
    this.user = null;
    router.navigate("/");
    store.commonStore.setAppLoaded();
  };

  getUser = async () => {
    try {
      const user = await agent.Accounts.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  setImage = (image: string) => {
    if (this.user) this.user.image = image;
  };
}
