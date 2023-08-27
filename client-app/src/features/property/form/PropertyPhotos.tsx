import { Button, ButtonGroup, Card, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { PropertyPhoto } from "../../../models/propertyPhoto";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../../../stores/store";
import ImageUploadWidget from "../../../app/common/imageUpload/ImageUploadWidget";

export default observer(function PropertyPhotos() {
  const [target, setTarget] = useState("");
  const { propertyStore } = useStore();
  const {
    loading,
    uploading,
    uploadPhoto,
    setMainPhoto,
    deletePhoto,
    selectedProperty,
  } = propertyStore;
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  function handleSetMainPhoto(
    photo: PropertyPhoto,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleDeleteImage(
    photo: PropertyPhoto,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  if (!selectedProperty) return <div>There is not selected property</div>;

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color={addPhotoMode ? "error" : "primary"}
        startIcon={addPhotoMode ? <CloseIcon /> : <InsertPhotoIcon />}
        style={{ marginBottom: "30px" }}
        onClick={() => setAddPhotoMode(!addPhotoMode)}
      >
        {addPhotoMode ? "Cancel" : "Add Photo"}
      </Button>
      {addPhotoMode ? (
        <ImageUploadWidget
          uploadImage={handlePhotoUpload}
          loading={uploading}
        />
      ) : (
        <Grid container spacing={2}>
          {selectedProperty.propertyPhotos?.map((photo) => (
            <Grid key={photo.id} item xs={12} sm={6} md={4} lg={3}>
              <Card key={photo.id}>
                <img
                  alt="property photo"
                  src={photo.url}
                  style={{ width: "100%" }}
                />
                <ButtonGroup fullWidth={true}>
                  <LoadingButton
                    color="success"
                    variant="contained"
                    disabled={photo.isMain}
                    name={"main" + photo.id}
                    loading={target === "main" + photo.id && loading}
                    onClick={(e) => handleSetMainPhoto(photo, e)}
                  >
                    Set Main
                  </LoadingButton>
                  <LoadingButton
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    loading={target === photo.id && loading}
                    onClick={(e) => handleDeleteImage(photo, e)}
                    disabled={photo.isMain}
                    name={photo.id}
                  >
                    Delete
                  </LoadingButton>
                </ButtonGroup>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
});
