import { Card, CardContent } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { TabOption } from "../../../models/tabOption";
import TabMenu from "../../../app/layout/TabMenu";
import PropertyForm from "./PropertyForm";
import { useParams } from "react-router-dom";
import PropertyPhotos from "./PropertyPhotos";
import { useStore } from "../../../stores/store";
import { PropertyFormValues } from "../../../models/property";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function PropertyPage() {
  const { id } = useParams<{ id: string }>();

  const { propertyStore } = useStore();
  const { loadProperty, loadingInitial } = propertyStore;
  const [property, setProperty] = useState<PropertyFormValues>(
    new PropertyFormValues()
  );
  const tabOptions: TabOption[] = [
    {
      title: "Information",
      index: 0,
      content: <PropertyForm id={id} property={property} />,
    },
  ];

  if (id) {
    tabOptions.push({
      title: "Property Photos",
      index: 1,
      content: <PropertyPhotos />,
    });
  }

  useEffect(() => {
    if (id) {
      loadProperty(id).then((property) => {
        var newProperty = property as PropertyFormValues;
        setProperty(newProperty);
      });
    }
  }, [id, loadProperty, setProperty]);

  if (loadingInitial)
    return <LoadingComponent content="Cargando detalles de la propiedad..." />;

  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <TabMenu tabOptions={tabOptions}></TabMenu>
      </CardContent>
    </Card>
  );
});
