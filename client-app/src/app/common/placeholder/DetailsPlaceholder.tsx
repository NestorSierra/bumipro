import { Card, CardContent, Skeleton, Typography } from "@mui/material";
import React from "react";

interface Props {
  titles?: number;
  subtitles?: number;
  descriptionRows?: number;
  hasImage: boolean;
  content?: string;
}

export default function DetailsPlaceholder({
  titles,
  subtitles,
  descriptionRows,
  hasImage,
  content,
}: Props) {
  const titlePlacholders = titles
    ? Array.from({ length: titles }, (_, i) => i)
    : [];

  const subTitlePlacholders = subtitles
    ? Array.from({ length: subtitles }, (_, i) => i)
    : [];

  const descriptionPlacholders = descriptionRows
    ? Array.from({ length: descriptionRows }, (_, i) => i)
    : [];

  return (
    <>
      <Typography textAlign="center" width="100%" style={{ color: "#a5a5a5" }}>
        {content}
      </Typography>
      <Card style={{ width: "100%" }}>
        <CardContent style={{ padding: "0px" }}>
          {hasImage && (
            <Skeleton
              sx={{ height: 200 }}
              animation="wave"
              variant="rectangular"
              width="100%"
            />
          )}
          <div style={{ padding: "10px" }}>
            {titles &&
              titles > 0 &&
              titlePlacholders.map((title: number) => (
                <Skeleton
                  key={title}
                  animation="wave"
                  height={40}
                  width="70%"
                  sx={{ marginBottom: 1 }}
                />
              ))}

            {subtitles &&
              subtitles > 0 &&
              subTitlePlacholders.map((subtitle: number) => (
                <Skeleton
                  key={subtitle}
                  animation="wave"
                  height={30}
                  width="50%"
                />
              ))}

            {descriptionRows &&
              descriptionRows > 0 &&
              descriptionPlacholders.map((description: number) =>
                description === descriptionPlacholders.length ? (
                  <Skeleton
                    key={description}
                    animation="wave"
                    height={20}
                    width="20%"
                  />
                ) : description % 2 === 0 ? (
                  <Skeleton
                    key={description}
                    animation="wave"
                    height={20}
                    width="100%"
                  />
                ) : (
                  <Skeleton
                    key={description}
                    animation="wave"
                    height={20}
                    width="80%"
                  />
                )
              )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
