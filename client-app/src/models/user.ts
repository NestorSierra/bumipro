export interface User {
  email: string;
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  about?: string;
  token: string;
  image?: string;
  mobile?: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  username?: string;
}

export class UserRegisterFormValues {
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  firstName: string = "";
  familyName: string = "";
  about: string = "";
  phone: string = "";
  mobile: string = "";
  userType: string = "";
  status: string = "";
  profesion: string = "";
  relationshipStatus: string = "";
  salaryPerYear: number = 0;
  country: string = "";
  isAdult: boolean = false;
  city: string = "";
  postcode: string = "";
  isIndigenous: boolean = false;
  indigenousType: number = 0;
  error: string = "";

  constructor(user?: UserRegisterFormValues) {
    if (user) {
      this.email = user.email;
      this.password = user.password;
      this.confirmPassword = user.confirmPassword;
      this.firstName = user.firstName;
      this.familyName = user.familyName;
      this.about = user.about;
      this.phone = user.phone;
      this.mobile = user.mobile;
      this.userType = user.userType;
      this.status = user.status;
      this.profesion = user.profesion;
      this.relationshipStatus = user.relationshipStatus;
      this.salaryPerYear = user.salaryPerYear;
      this.country = user.country;
      this.isAdult = user.isAdult;
      this.city = user.city;
      this.postcode = user.postcode;
      this.isIndigenous = user.isIndigenous;
      this.indigenousType = user.indigenousType;
      this.error = user.error;
    }
  }
}

export interface Profile {
  username: string;
  email: string;
  displayName: string;
  firstName: string;
  lastName: string;
  mobile?: string;
  image?: string;
  about?: string;
  photos?: Photo[];
}

export class Profile implements Profile {
  constructor(user: User) {
    this.username = user.username;
    this.email = user.email;
    this.displayName = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.about = user.about;
    this.mobile = user.mobile;
    this.image = user.image;
  }
}

export interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

export interface Applicant {
  id: string;
  displayName: string;
  about: string;
  email: string;
  phone: string;
  mobile: string;
  userType: string;
  status: string;
  profession: string;
  relationshipStatus: string;
  salaryPerYear: number;
  country: string;
  isAdult: boolean;
  city: string;
  postcode: string;
  isIndigenous: boolean;
  indigenousType: number | null;
  image: string;
}

export class ApplicantFormValues {
  id: string = "";
  displayName: string = "";
  about: string = "";
  email: string = "";
  phone: string = "";
  mobile: string = "";
  userType: string = "";
  status: string = "";
  profession: string = "";
  relationshipStatus: string = "";
  salaryPerYear: number = 0;
  country: string = "";
  isAdult: boolean = true;
  city: string = "";
  postcode: string = "";
  isIndigenous: boolean = false;
  indigenousType: number | null = null;
  image: string = "";

  constructor(applicant?: ApplicantFormValues) {
    if (applicant) {
      this.id = applicant.id;
      this.displayName = applicant.displayName;
      this.about = applicant.about;
      this.email = applicant.email;
      this.phone = applicant.phone;
      this.mobile = applicant.mobile;
      this.userType = applicant.userType;
      this.status = applicant.status;
      this.profession = applicant.profession;
      this.relationshipStatus = applicant.relationshipStatus;
      this.salaryPerYear = applicant.salaryPerYear;
      this.city = applicant.city;
      this.isIndigenous = applicant.isIndigenous;
      this.postcode = applicant.postcode;
      this.indigenousType = applicant.indigenousType;
      this.image = applicant.image;
    }
  }
}
