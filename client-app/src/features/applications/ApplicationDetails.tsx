import { Card, CardContent, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import DetailsPlaceholder from "../../app/common/placeholder/DetailsPlaceholder";
import PropertyInfo from "../property/details/PropertyInfo";
import ApplicantInfo from "../applicant/details/ApplicantInfo";

export default observer(function ApplicationDetails() {
  const { referenceNumber } = useParams<{ referenceNumber: string }>();
  const { applicationStore } = useStore();
  const { loadApplication, selectedApplication, carouselImageItems } =
    applicationStore;

  useEffect(() => {
    if (referenceNumber) loadApplication(referenceNumber);
  }, [referenceNumber, loadApplication]);

  if (!selectedApplication)
    return (
      <>
        <Typography variant="h5" fontWeight="bold" marginBottom={3}>
          Application Details
        </Typography>
        <DetailsPlaceholder
          content=""
          hasImage={true}
          subtitles={1}
          titles={1}
          descriptionRows={4}
        />
        ;
      </>
    );

  return (
    <>
      <Typography variant="h5" fontWeight="bold" marginBottom={3}>
        Application Details
      </Typography>
      <Card style={{ width: "100%" }}>
        <CardContent>
          <PropertyInfo
            property={selectedApplication.property}
            carouselImageItems={carouselImageItems}
          />
          <Divider />
          <ApplicantInfo applicant={selectedApplication.applicant} />
        </CardContent>
      </Card>
    </>
  );
});
