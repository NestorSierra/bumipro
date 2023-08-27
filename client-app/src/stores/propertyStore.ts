import { makeAutoObservable, runInAction } from "mobx";
import { Property, PropertyFormValues } from "../models/property";
import { Pagination } from "../models/pagination";
import { PagingParams } from "./../models/pagination";
import { v4 as uuid } from "uuid";
import agent from "../app/api/agent";
import { CarouselImageItem } from "./../models/carouselImageItem";
import { PropertyPhoto } from "../models/propertyPhoto";

export default class PropertyStore {
  myPropertiesRegistry = new Map<string, PropertyFormValues>();
  selectedProperty: Property | undefined;
  editMode = false;
  loading = false;
  uploading = false;
  loadingInitial = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("all", true);
  carouselImageItems: CarouselImageItem[] | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get axiosParams() {
    const params = new URLSearchParams();

    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());

    this.predicate.forEach((value, key) => {
      params.append(key, value);
    });

    return params;
  }

  get propertyByPrice() {
    return Array.from(this.myPropertiesRegistry.values()).sort((a, b) => {
      const nameA = a.price;
      const nameB = b.price;

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  }

  createProperty = async (property: PropertyFormValues) => {
    try {
      await agent.Properties.create(property);
      const newProperty = new Property(property);

      this.setProperty(newProperty);
      runInAction(() => {
        this.selectedProperty = newProperty;
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadProperty = async (id: string) => {
    let property = this.getProperty(id);
    if (property) {
      this.selectedProperty = property;
      this.setLoadingInitial(false);
      if (property.propertyPhotos.length > 0) {
        this.loadCarouselImageItem(property.propertyPhotos);
      }
      return property;
    } else {
      this.setLoadingInitial(true);
      try {
        property = await agent.Properties.details(id);
        this.setProperty(property);
        runInAction(() => {
          this.selectedProperty = property;
        });
        this.setLoadingInitial(false);
        return property;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  loadCarouselImageItem = (photoProperties: PropertyPhoto[]) => {
    this.carouselImageItems = [];
    photoProperties.forEach((element) => {
      this.carouselImageItems?.push({
        imageUrl: element.url,
        title: "",
        description: "",
      });
    });
  };

  loadProperties = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Properties.list(this.axiosParams);

      result.data.forEach((property) => {
        this.setProperty(property);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {}
  };

  setPredicate = (predicate: Map<string, string>) => {
    this.predicate.clear();
    this.predicate = predicate;
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  updateProperty = async (property: Property) => {
    try {
      await agent.Properties.update(property);
      runInAction(() => {
        if (property.id !== "") {
          let updateProperty = { ...this.getProperty(property.id), property };
          this.myPropertiesRegistry.set(property.id, property as Property);
          this.selectedProperty = updateProperty as Property;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  uploadPhoto = async (file: Blob) => {
    this.uploading = true;
    try {
      if (this.selectedProperty) {
        const response = await agent.Properties.uploadPhoto(
          this.selectedProperty.id,
          file
        );
        const photo = response.data;

        runInAction(async () => {
          this.uploading = false;
          if (this.carouselImageItems) {
            this.carouselImageItems.push({
              imageUrl: photo.url,
              title: "",
              description: "",
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => (this.uploading = false));
    }
  };

  deletePhoto = async (photo: PropertyPhoto) => {
    this.loading = true;
    try {
      if (this.selectedProperty) {
        await agent.Properties.deletePhoto(this.selectedProperty.id, photo.id);
        runInAction(() => {
          if (this.selectedProperty) {
            this.selectedProperty.propertyPhotos =
              this.selectedProperty.propertyPhotos?.filter(
                (p) => p.id !== photo.id
              );
            this.loading = false;
          }
        });
      }
    } catch (error) {
      runInAction(() => (this.loading = false));
    }
  };

  setMainPhoto = async (photo: PropertyPhoto) => {
    this.loading = true;
    if (this.selectedProperty) {
      try {
        await agent.Properties.setMainPhoto(this.selectedProperty.id, photo.id);
        this.selectedProperty.imageUrl = photo.url;
        runInAction(() => {
          if (this.selectedProperty && this.selectedProperty.propertyPhotos) {
            this.selectedProperty.propertyPhotos.find((p) => p.isMain)!.isMain =
              false;
            this.selectedProperty.propertyPhotos.find(
              (p) => p.id === photo.id
            )!.isMain = true;
            this.selectedProperty.imageUrl = photo.url;

            this.loading = false;
          }
        });
      } catch (error) {
        runInAction(() => {
          this.loading = false;
          console.log(error);
        });
      }
    }
  };

  private getProperty = (id: string) => {
    return this.myPropertiesRegistry.get(id);
  };

  private setProperty = (property: PropertyFormValues) => {
    this.myPropertiesRegistry.set(property.id, property);
  };
}
