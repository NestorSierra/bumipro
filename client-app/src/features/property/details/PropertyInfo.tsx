import React from "react";
import { Property } from "../../../models/property";
import ImageCarousel from "../../../app/common/imageCarousel/ImageCarousel";
import { Chip, Typography } from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import currencyFormat from "../../../app/manager";
import { CarouselImageItem } from "../../../models/carouselImageItem";

interface Props {
  property: Property;
  carouselImageItems: CarouselImageItem[] | undefined;
}

export default function PropertyInfo({
  property,
  carouselImageItems: carouselImageItem,
}: Props) {
  return (
    <>
      <ImageCarousel items={carouselImageItem} height={400} />
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" marginBottom={2}>
          {property.address}
        </Typography>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <Chip icon={<BedIcon />} label={property.rooms ?? 0} />
          <Chip
            icon={<BathtubIcon />}
            label={property.bathrooms ?? 0}
            sx={{ marginLeft: "10px" }}
          />
          <Chip
            icon={<DirectionsCarIcon />}
            label={property.carsParking ?? 0}
            sx={{ marginLeft: "10px" }}
          />
        </div>
        <Typography display="block" marginBottom={2}>
          {property.description}
        </Typography>
        <Typography marginBottom={2}>
          <b>Area:</b>
          {property.area}
        </Typography>
        <Typography marginBottom={2}>
          <b>Price:</b>
          {property.price ? currencyFormat(property.price) : property.price}
        </Typography>
        <Typography>
          {property.country +
            " " +
            property.state +
            " " +
            property.city +
            " " +
            property.suburb +
            " " +
            property.postCode}
        </Typography>
      </div>
    </>
  );
}
