import { PropertyPhoto } from "./propertyPhoto";

export interface Property {
  id: string;
  address: string;
  rooms: number;
  bathrooms: number;
  carsParking: number;
  price: number;
  area: number;
  priceBySqm: number;
  description: string;
  country: string;
  state: string;
  city: string;
  suburb: string;
  postCode: string;
  creationDate: Date | null;
  status: string;
  imageUrl: string;
  propertyPhotos: PropertyPhoto[];
}

export class Property implements Property {
  constructor(init?: PropertyFormValues) {
    Object.assign(this, init);
  }
}

export class PropertyFormValues {
  id: string = "";
  address: string = "";
  rooms: number = 0;
  bathrooms: number = 0;
  carsParking: number = 0;
  price: number = 0;
  area: number = 0;
  priceBySqm: number = 0;
  description: string = "";
  country: string = "";
  state: string = "";
  city: string = "";
  suburb: string = "";
  postCode: string = "";
  creationDate: Date | null = null;
  status: string = "";
  imageUrl: string = "";
  propertyPhotos: PropertyPhoto[] = [];

  constructor(property?: PropertyFormValues) {
    if (property) {
      this.id = property.id;
      this.address = property.address;
      this.rooms = property.rooms;
      this.bathrooms = property.bathrooms;
      this.carsParking = property.carsParking;
      this.price = property.price;
      this.area = property.area;
      this.priceBySqm = property.priceBySqm;
      this.description = property.description;
      this.country = property.country;
      this.state = property.state;
      this.city = property.city;
      this.suburb = property.suburb;
      this.postCode = property.postCode;
      this.creationDate = property.creationDate;
      this.status = property.status;
      this.propertyPhotos = property.propertyPhotos;
      this.imageUrl = property.imageUrl;
    }
  }
}
