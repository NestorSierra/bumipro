import { Property } from "./property";
import { Applicant } from "./user";

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
