import { Property } from "./property";
import { Applicant, ApplicantFormValues } from "./user";

export interface Application {
  appUserId: string;
  propertyId: string;
  applicant: Applicant;
  applicantName: string;
  propertyAddress: string;
  referenceNumber: string;
  property: Property;
  creationDate: Date | null;
  status: string;
}

export class ApplicationFormValues {
  appUserId: string = "";
  propertyId: string = "";
  applicant: ApplicantFormValues = new ApplicantFormValues();
  referenceNumber: string = "";
  property: Property = new Property();
  creationDate: Date | null = null;
  status: string = "";

  constructor(application?: ApplicationFormValues) {
    if (application) {
      this.appUserId = application.appUserId;
      this.propertyId = application.propertyId;
      this.applicant = new ApplicantFormValues();
      this.referenceNumber = application.referenceNumber;
      this.property = application.property;
      this.creationDate = application.creationDate;
      this.status = application.status;
    }
  }
}
