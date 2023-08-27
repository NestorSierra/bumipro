import axios, { AxiosError, AxiosResponse } from "axios";
import { PaginatedResult } from "../../models/pagination";
import { toast } from "react-toastify";
import { store } from "../../stores/store";
import { router } from "../router/Route";
import { PropertyFormValues } from "./../../models/property";
import {
  Photo,
  Profile,
  User,
  UserFormValues,
  UserRegisterFormValues,
} from "../../models/user";
import { Application } from "../../models/application";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") await sleep(1000);

    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<any>>;
    }

    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("unathorised 200");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Properties = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<PropertyFormValues[]>>("/properties", { params })
      .then(responseBody),
  details: (id: string) =>
    requests.get<PropertyFormValues>(`/properties/${id}`),
  create: (property: PropertyFormValues) => {
    console.log(property);
    requests.post<void>("/properties/", property);
  },
  update: (property: PropertyFormValues) =>
    requests.put<void>(`/properties/${property.id}`, property),
  uploadPhoto: (id: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>(`properties/${id}/uploadPhoto`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deletePhoto: (id: string, photoId: string) =>
    requests.delete(`properties/${id}/removePhoto/${photoId}`),
  setMainPhoto: (id: string, photoId: string) =>
    requests.put(`properties/${id}/setMainPhoto/${photoId}`, {}),
  delete: (id: string) => requests.delete<void>(`properties/${id}`),
};

const Accounts = {
  current: () => requests.get<User>("/accounts"),
  login: (user: UserFormValues) => requests.post<User>("/accounts/login", user),
  register: (user: UserRegisterFormValues) =>
    requests.post<User>("/accounts/register", user),
};

const Applications = {
  get: (referenceNumber: string) =>
    requests.get<Application>(`/applications/${referenceNumber}`),
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Application[]>>("/applications", { params })
      .then(responseBody),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios.post<Photo>("photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id: string) => requests.put(`photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.delete(`photos/${id}`),
  update: (profile: Profile) => requests.put("/profiles/", profile),
};

const agent = {
  Properties,
  Accounts,
  Profiles,
  Applications,
};

export default agent;
