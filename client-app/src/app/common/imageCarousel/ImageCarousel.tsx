import React from "react";
import Carousel from "react-material-ui-carousel";
import { CarouselImageItem } from "../../../models/carouselImageItem";
import { Paper, Typography } from "@mui/material";

interface Props {
  items: CarouselImageItem[] | undefined;
  height: number;
}

export default function ImageCarousel({ items, height }: Props) {
  if (!items || !items.length)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="/assets/without-image.jpg" width={300} />
      </div>
    );

  return (
    <div>
      <Carousel height={height}>
        {items?.map((item, i) => {
          return (
            <Paper key={i}>
              {item.title && (
                <Typography component="h3" fontWeight="bold">
                  {item.title}
                </Typography>
              )}
              {item.description && (
                <Typography component="h6" fontWeight="bold">
                  {item.description}
                </Typography>
              )}
              {item.imageUrl && (
                <img
                  alt={"Image" + i}
                  src={item.imageUrl}
                  style={{
                    width: "100%",
                    height: height + "px",
                    maxHeight: height + "px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
}
