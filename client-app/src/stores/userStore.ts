import { makeAutoObservable, runInAction } from "mobx";
import { User, UserRegisterFormValues, UserFormValues } from "../models/user";
import agent from "../app/api/agent";
import { store } from "./store";
import { router } from "../app/router/Route";

export default class UserStore {
  user: User | null = null;
  refreshTokenTimeout?: NodeJS.Timeout;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Accounts.login(creds);
      this.startRefreshTokeTimeout(user);
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
      this.startRefreshTokeTimeout(user);
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
      this.startRefreshTokeTimeout(user);
      store.commonStore.setToken(user.token);
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

  refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
      const user = await agent.Accounts.refreshToken();
      runInAction(() => {
        this.user = user;
      });
      store.commonStore.setToken(user.token);
      this.startRefreshTokeTimeout(user);
    } catch (error) {}
  };

  private startRefreshTokeTimeout(user: User) {
    const jwtToken = JSON.parse(atob(user.token.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 30 * 100;
    this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);

    console.log({ refreshTime: this.refreshTokenTimeout });
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
