import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useStore } from "../../../stores/store";
import { PropertyFormValues } from "../../../models/property";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { observer } from "mobx-react-lite";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { v4 as uuid } from "uuid";
import { LoadingButton } from "@mui/lab";

interface Props {
  id: string | undefined;
  property: PropertyFormValues;
}

export default observer(function PropertyForm({ id, property }: Props) {
  const { propertyStore } = useStore();
  const { createProperty, updateProperty } = propertyStore;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    price: Yup.number()
      .required("The price is required")
      .moreThan(1, "The price must be greater than 0"),
    rooms: Yup.number()
      .required("You must provide number of bedrooms")
      .moreThan(0, "The number of rooms must be greater than 0"),
  });

  function handleFormSubmit(property: PropertyFormValues) {
    if (!property.id) {
      property.id = uuid();
      property.creationDate = new Date();
      createProperty(property).then(() =>
        navigate(`/properties/${property.id}`)
      );
    } else {
      updateProperty(property).then(() =>
        navigate(`/properties/${property.id}`)
      );
    }
  }

  return (
    <div>
      <Typography variant="h4" fontWeight="bold" marginBottom={3}>
        {id ? "Edit Property" : "Create Property"}
      </Typography>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={property}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput label="Address" name="address" />
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <MyTextInput
                  type="number"
                  label="Bedrooms"
                  name="rooms"
                  icon={BedIcon}
                />
              </Grid>
              <Grid item xs={4}>
                <MyTextInput
                  type="number"
                  label="Bathrooms"
                  name="bathrooms"
                  icon={BathtubIcon}
                />
              </Grid>
              <Grid item xs={4}>
                <MyTextInput
                  type="number"
                  label="Cars parking"
                  name="carsParking"
                  icon={DirectionsCarIcon}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <MyTextInput label="Price" name="price" />
              </Grid>
              <Grid item xs={6}>
                <MyTextInput type="number" label="Area" name="area" />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <MyTextInput
                  type="number"
                  label="Price by sqmts"
                  name="priceBySqm"
                />
              </Grid>
              <Grid item xs={6}>
                <MyTextInput label="Country" name="country" />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <MyTextInput label="State" name="state" />
              </Grid>
              <Grid item xs={6}>
                <MyTextInput label="City" name="city" />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <MyTextInput label="Suburb" name="suburb" />
              </Grid>
              <Grid item xs={6}>
                <MyTextInput label="Postcode" name="postCode" />
              </Grid>
            </Grid>
            <MyTextArea name="description" label="Description" rows={3} />

            <ButtonGroup fullWidth>
              <LoadingButton
                type="submit"
                disabled={isSubmitting || !dirty || !isValid}
                color="primary"
                variant="contained"
                startIcon={<EditIcon />}
                loading={isSubmitting}
              >
                Save
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
          </Form>
        )}
      </Formik>
    </div>
  );
});
