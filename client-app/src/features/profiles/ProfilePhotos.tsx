import { Box, Button, ButtonGroup, Card, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Photo, Profile } from "../../models/user";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useStore } from "../../stores/store";
import ImageUploadWidget from "../../app/common/imageUpload/ImageUploadWidget";

import { LoadingButton } from "@mui/lab";

interface Props {
  profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      loading,
      setMainPhoto,
      deletePhoto,
    },
  } = useStore();

  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState("");

  function handleSetMainPhoto(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  }

  function handlePhotoUpload(file: Blob) {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  }

  function handleDeleteImage(
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  }

  return (
    <Box>
      {isCurrentUser && (
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
      )}

      {addPhotoMode ? (
        <ImageUploadWidget
          uploadImage={handlePhotoUpload}
          loading={uploading}
        />
      ) : (
        <Grid container spacing={2}>
          {profile.photos?.map((photo) => (
            <Grid key={photo.id} item xs={12} sm={6} md={4} lg={3}>
              <Card key={photo.id}>
                <img src={photo.url} style={{ width: "100%" }} />
                {isCurrentUser && (
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
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
});
