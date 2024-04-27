import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useStore } from "../../stores/store";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { Link, useParams } from "react-router-dom";
import { ApplicationFormValues } from "../../models/application";
import PropertyInfo from "../property/details/PropertyInfo";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ApplicantInfo from "../applicant/details/ApplicantInfo";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import MySelect, { MySelectValue } from "../../app/common/form/MySelect";
import { LoadingButton } from "@mui/lab";

export default observer(function ApplicationForm() {
  const { applicationStore, propertyStore, userStore } = useStore();
  const [application, setApplication] = useState<ApplicationFormValues>(
    new ApplicationFormValues()
  );
  const {
    selectedProperty: property,
    loadProperty,
    loadingInitial,
    carouselImageItems,
  } = propertyStore;

  const {
    getCurrentApplicant,
    currentApplicant,
    updateApplication,
    createApplication,
  } = applicationStore;

  const { id } = useParams<{ id: string }>();
  const { propertyId } = useParams<{ propertyId: string }>();
  const relationShipStatuses = [
    {
      label: "Single",
      value: "S",
    },
    {
      label: "Married",
      value: "M",
    },
  ];

  const indegenousOptions = [
    {
      label: "Yes",
      value: "true",
    },
    {
      label: "No",
      value: "false",
    },
  ];

  const validationSchema = Yup.object({
    applicant: Yup.object({
      profession: Yup.string().required("Property is required"),
      relationshipStatus: Yup.string().required("Relationship is required"),
      salaryPerYear: Yup.number()
        .typeError("Salary must be a valid number")
        .required("Salary is required")
        .min(1, "Salary is required"),
      indigenous: Yup.boolean().required("Select one option"),
    }),
  });

  useEffect(() => {
    if (propertyId) {
      loadProperty(propertyId);
    }
    getCurrentApplicant();
  }, [propertyId, loadProperty, getCurrentApplicant]);

  function handleFormSubmit(application: ApplicationFormValues) {
    if (!application.referenceNumber) {
      application.referenceNumber = uuid();
      application.creationDate = new Date();
      application.appUserId = currentApplicant?.id!;
      application.propertyId = propertyId!;
      createApplication(application);
    } else {
      updateApplication(application);
    }
  }

  if (loadingInitial || !property)
    return (
      <LoadingComponent content="Loading property details..."></LoadingComponent>
    );

  return (
    <div>
      <Typography variant="h4" fontWeight="bold" marginBottom={3}>
        {id ? "Edit Application" : "Create Application"}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" marginBottom={3}>
            Property Details
          </Typography>
          <PropertyInfo
            property={property}
            carouselImageItems={carouselImageItems}
          />
          {currentApplicant && (
            <>
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="applicant-details-content"
                  id="applicant-details-header"
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    style={{ color: "#5b5959" }}
                  >
                    Applicant Details.
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ApplicantInfo
                    applicant={currentApplicant}
                    editMode={true}
                  ></ApplicantInfo>
                </AccordionDetails>
              </Accordion>

              <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={application}
                onSubmit={(values) => handleFormSubmit(values)}
              >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                  <Form
                    className="ui form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <Accordion defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="applicant-extra-details-content"
                        id="applicant-extra-details-content"
                      >
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          style={{ color: "#5b5959" }}
                        >
                          Applicant Extra Details.
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={3}>
                          <Grid item xs={12}>
                            <MyTextInput
                              label="Profession"
                              name="applicant.profession"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <MyTextInput
                              type="number"
                              label="Salary per year"
                              name="applicant.salaryPerYear"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <MySelect
                              label="Relationship status"
                              name="applicant.relationshipStatus"
                              options={relationShipStatuses}
                              None="None"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <MySelect
                              label="Are you of Aboriginal and/or Torres Strait Islander origin?"
                              name="applicant.indigenous"
                              options={indegenousOptions}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <ButtonGroup fullWidth>
                              <LoadingButton
                                type="submit"
                                disabled={isSubmitting || !dirty || !isValid}
                                color="primary"
                                variant="contained"
                                startIcon={<EditIcon />}
                                loading={isSubmitting}
                              >
                                Apply
                              </LoadingButton>

                              <Button
                                component={Link}
                                to={`/properties/${property.id}`}
                                color="error"
                                variant="contained"
                                startIcon={<CancelIcon />}
                              >
                                Cancel
                              </Button>
                            </ButtonGroup>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
});
