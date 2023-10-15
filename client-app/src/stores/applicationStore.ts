import { makeAutoObservable } from "mobx";
import { Pagination, PagingParams } from "../models/pagination";
import agent from "../app/api/agent";
import { Application } from "../models/application";
import { CarouselImageItem } from "../models/carouselImageItem";
import { PropertyPhoto } from "../models/propertyPhoto";

export default class ApplicationStore {
  applicationsRegistry = new Map<string, Application>();
  selectedApplication: Application | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams(1, 10);
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
      if (key === "dateFilter") {
        params.append(key, (value as Date).toDateString());
      } else {
        params.append(key, value);
      }
    });

    return params;
  }

  setPredicate = (predicate: Map<string, any>) => {
    this.predicate.clear();
    this.predicate = predicate;
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  setLoadingInitial = (initialLoading: boolean) => {
    this.loadingInitial = initialLoading;
  };

  setApplication = (application: Application) => {
    application.creationDate = application.creationDate;
    application.applicantName = application.applicant.displayName;
    this.applicationsRegistry.set(application.referenceNumber, application);
  };

  get applicationsByDate() {
    return Array.from(this.applicationsRegistry.values()).sort((a, b) => {
      if (a.creationDate && b.creationDate) {
        return a.creationDate.getTime() - b.creationDate.getTime();
      } else {
        return 0;
      }
    });
  }

  loadApplication = async (referenceNumber: string) => {
    this.setLoadingInitial(true);
    try {
      this.selectedApplication = await agent.Applications.get(referenceNumber);
      if (this.selectedApplication)
        this.loadCarouselImageItem(
          this.selectedApplication.property.propertyPhotos
        );
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
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

  loadApplications = async () => {
    this.setLoadingInitial(true);
    try {
      const result = await agent.Applications.list(this.axiosParams);

      this.applicationsRegistry.clear();

      result.data.forEach((application) => {
        this.setApplication(application);
      });

      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  createApplication = () => {};

  updateApplication = () => {};
}
